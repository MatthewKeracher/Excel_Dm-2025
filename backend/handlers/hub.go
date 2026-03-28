package handlers

import (
	"log"
	"sync"

	"github.com/gorilla/websocket"
)

type hub struct {
	mu        sync.RWMutex
	campaigns map[string]map[*wsClient]bool
}

var globalHub = &hub{
	campaigns: make(map[string]map[*wsClient]bool),
}

type wsClient struct {
	conn        *websocket.Conn
	campaignKey string
	clientID    string
	send        chan []byte
}

func (h *hub) register(client *wsClient) {
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.campaigns[client.campaignKey] == nil {
		h.campaigns[client.campaignKey] = make(map[*wsClient]bool)
	}
	h.campaigns[client.campaignKey][client] = true
}

func (h *hub) unregister(client *wsClient) {
	h.mu.Lock()
	defer h.mu.Unlock()
	if clients, ok := h.campaigns[client.campaignKey]; ok {
		if _, exists := clients[client]; exists {
			delete(clients, client)
			close(client.send)
			if len(clients) == 0 {
				delete(h.campaigns, client.campaignKey)
			}
		}
	}
}

// clientCount returns the number of connected clients for a campaign key.
func (h *hub) clientCount(campaignKey string) int {
	h.mu.RLock()
	defer h.mu.RUnlock()
	return len(h.campaigns[campaignKey])
}

// broadcast sends data to all clients for a campaign except the one with senderClientID.
// If a client's send buffer is full, the connection is closed so it will reconnect
// and issue a catch-up GET rather than silently falling behind.
func (h *hub) broadcast(campaignKey, senderClientID string, data []byte) {
	h.mu.RLock()
	var overflow []*wsClient
	for client := range h.campaigns[campaignKey] {
		if client.clientID == senderClientID {
			continue
		}
		select {
		case client.send <- data:
		default:
			overflow = append(overflow, client)
		}
	}
	h.mu.RUnlock()

	for _, c := range overflow {
		log.Printf("WS: send buffer full for client %s, closing to force reconnect", c.clientID)
		// Closing the send channel is sufficient — writePump will detect ok=false,
		// send a CloseMessage, and return. readPump's defer then closes the conn.
		// Calling conn.Close() directly here would race with writePump's final write.
		h.unregister(c)
	}
}

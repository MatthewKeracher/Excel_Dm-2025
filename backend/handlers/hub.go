package handlers

import (
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

// broadcast sends data to all clients for a campaign except the one with senderClientID.
func (h *hub) broadcast(campaignKey, senderClientID string, data []byte) {
	h.mu.RLock()
	defer h.mu.RUnlock()
	for client := range h.campaigns[campaignKey] {
		if client.clientID == senderClientID {
			continue
		}
		select {
		case client.send <- data:
		default:
			// client buffer full; skip this update
		}
	}
}

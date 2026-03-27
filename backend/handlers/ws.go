package handlers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

// ServePersonalWS handles WebSocket connections for a user's personal campaign.
func ServePersonalWS(w http.ResponseWriter, r *http.Request) {
	userID, ok := wsAuth(r)
	if !ok {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	clientID := r.URL.Query().Get("clientId")
	serveWS(w, r, fmt.Sprintf("user:%d", userID), clientID)
}

// ServePublicWS handles WebSocket connections for a named public campaign.
func ServePublicWS(w http.ResponseWriter, r *http.Request) {
	_, ok := wsAuth(r)
	if !ok {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	name := r.PathValue("name")
	clientID := r.URL.Query().Get("clientId")
	serveWS(w, r, fmt.Sprintf("public:%s", name), clientID)
}

func serveWS(w http.ResponseWriter, r *http.Request, campaignKey, clientID string) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("WebSocket upgrade error: %v", err)
		return
	}

	client := &wsClient{
		conn:        conn,
		campaignKey: campaignKey,
		clientID:    clientID,
		send:        make(chan []byte, 64),
	}

	globalHub.register(client)
	go writePump(client)
	readPump(client) // blocks until disconnect
}

func readPump(client *wsClient) {
	defer func() {
		globalHub.unregister(client)
		client.conn.Close()
	}()

	client.conn.SetReadLimit(512)
	client.conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	client.conn.SetPongHandler(func(string) error {
		client.conn.SetReadDeadline(time.Now().Add(60 * time.Second))
		return nil
	})

	for {
		if _, _, err := client.conn.ReadMessage(); err != nil {
			break
		}
	}
}

func writePump(client *wsClient) {
	ticker := time.NewTicker(54 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case msg, ok := <-client.send:
			client.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if !ok {
				client.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			if err := client.conn.WriteMessage(websocket.TextMessage, msg); err != nil {
				return
			}
		case <-ticker.C:
			client.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if err := client.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

// wsAuth validates the JWT from the ?token= query parameter.
func wsAuth(r *http.Request) (int, bool) {
	tokenStr := r.URL.Query().Get("token")
	if tokenStr == "" {
		return 0, false
	}

	secret := wsSecret()
	token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return secret, nil
	})
	if err != nil || !token.Valid {
		return 0, false
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return 0, false
	}
	userID, ok := claims["user_id"].(float64)
	if !ok {
		return 0, false
	}
	return int(userID), true
}

func wsSecret() []byte {
	if s := os.Getenv("JWT_SECRET"); s != "" {
		return []byte(s)
	}
	return []byte("dev-secret-change-in-production")
}

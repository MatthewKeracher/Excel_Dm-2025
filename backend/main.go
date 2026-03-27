package main

import (
	"fmt"
	"log"
	"net/http"

	"exceldm/db"
	"exceldm/handlers"
	"exceldm/middleware"
)

func main() {
	if err := db.Connect(); err != nil {
		log.Fatal(err)
	}
	defer db.Conn.Close()

	if err := db.Init(); err != nil {
		log.Fatal("failed to initialise database:", err)
	}

	mux := http.NewServeMux()

	// Public auth routes
	mux.HandleFunc("POST /api/register", handlers.Register)
	mux.HandleFunc("POST /api/login", handlers.Login)

	// Protected campaign routes
	mux.Handle("GET /api/campaigns", middleware.Auth(http.HandlerFunc(handlers.GetCampaign)))
	mux.Handle("PUT /api/campaigns", middleware.Auth(http.HandlerFunc(handlers.PutCampaign)))

	// Public campaign routes (any logged-in user can read/write)
	mux.Handle("GET /api/public/{name}", middleware.Auth(http.HandlerFunc(handlers.GetPublicCampaign)))
	mux.Handle("PUT /api/public/{name}", middleware.Auth(http.HandlerFunc(handlers.PutPublicCampaign)))

	// WebSocket routes (auth via ?token= query param)
	mux.HandleFunc("GET /api/campaigns/ws", handlers.ServePersonalWS)
	mux.HandleFunc("GET /api/public/{name}/ws", handlers.ServePublicWS)

	// Serve frontend from project root
	mux.Handle("/", http.FileServer(http.Dir("../")))

	fmt.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}

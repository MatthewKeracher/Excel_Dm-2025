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

	// Campaign list and creation
	mux.Handle("GET /api/campaigns", middleware.Auth(http.HandlerFunc(handlers.ListCampaigns)))
	mux.Handle("POST /api/campaigns", middleware.Auth(http.HandlerFunc(handlers.CreateCampaign)))

	// Per-campaign CRUD (ID-based)
	mux.Handle("GET /api/campaigns/{id}", middleware.Auth(http.HandlerFunc(handlers.GetCampaign)))
	mux.Handle("PUT /api/campaigns/{id}", middleware.Auth(http.HandlerFunc(handlers.PutCampaign)))
	mux.Handle("PATCH /api/campaigns/{id}", middleware.Auth(http.HandlerFunc(handlers.PatchCampaign)))
	mux.Handle("POST /api/campaigns/{id}/members", middleware.Auth(http.HandlerFunc(handlers.AddCampaignMember)))

	// WebSocket (auth via ?token= query param)
	mux.HandleFunc("GET /api/campaigns/{id}/ws", handlers.ServeCampaignWS)

	// Serve frontend
	mux.Handle("/", http.FileServer(http.Dir("../")))

	fmt.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}

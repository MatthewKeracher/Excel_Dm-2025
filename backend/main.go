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

	// Account management
	mux.Handle("GET /api/account", middleware.Auth(http.HandlerFunc(handlers.GetAccount)))
	mux.Handle("PATCH /api/account/password", middleware.Auth(http.HandlerFunc(handlers.ChangePassword)))
	mux.Handle("PATCH /api/account/avatar", middleware.Auth(http.HandlerFunc(handlers.UpdateAvatar)))
	mux.Handle("PATCH /api/account/username", middleware.Auth(http.HandlerFunc(handlers.UpdateUsername)))

	// Campaign list and creation
	mux.Handle("GET /api/campaigns", middleware.Auth(http.HandlerFunc(handlers.ListCampaigns)))
	mux.Handle("POST /api/campaigns", middleware.Auth(http.HandlerFunc(handlers.CreateCampaign)))

	// Per-campaign CRUD (ID-based)
	mux.Handle("GET /api/campaigns/{id}", middleware.Auth(http.HandlerFunc(handlers.GetCampaign)))
	mux.Handle("PUT /api/campaigns/{id}", middleware.Auth(http.HandlerFunc(handlers.PutCampaign)))
	mux.Handle("PATCH /api/campaigns/{id}", middleware.Auth(http.HandlerFunc(handlers.PatchCampaign)))
	mux.Handle("PATCH /api/campaigns/{id}/settings", middleware.Auth(http.HandlerFunc(handlers.RenameCampaign)))
	mux.Handle("DELETE /api/campaigns/{id}", middleware.Auth(http.HandlerFunc(handlers.DeleteCampaign)))
	mux.Handle("GET /api/campaigns/{id}/members", middleware.Auth(http.HandlerFunc(handlers.ListCampaignMembers)))
	mux.Handle("POST /api/campaigns/{id}/members", middleware.Auth(http.HandlerFunc(handlers.AddCampaignMember)))
	mux.Handle("DELETE /api/campaigns/{id}/members/{userId}", middleware.Auth(http.HandlerFunc(handlers.RemoveCampaignMember)))

	// Invite links
	mux.Handle("POST /api/campaigns/{id}/invites", middleware.Auth(http.HandlerFunc(handlers.CreateInvite)))
	mux.HandleFunc("GET /api/invites/{token}", handlers.GetInvite)
	mux.Handle("POST /api/invites/{token}/accept", middleware.Auth(http.HandlerFunc(handlers.AcceptInvite)))

	// Ruleset reference library
	mux.Handle("GET /api/rulesets", middleware.Auth(http.HandlerFunc(handlers.ListRulesets)))
	mux.Handle("GET /api/rulesets/{name}/{file}", middleware.Auth(http.HandlerFunc(handlers.GetRulesetFile)))

	// WebSocket (auth via ?token= query param)
	mux.HandleFunc("GET /api/campaigns/{id}/ws", handlers.ServeCampaignWS)

	// Serve index.html for invite URLs so the SPA can handle the route
	mux.HandleFunc("GET /invite/{token}", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store")
		http.ServeFile(w, r, "../index.html")
	})

	// Serve frontend
	mux.Handle("/", http.FileServer(http.Dir("../")))

	fmt.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}

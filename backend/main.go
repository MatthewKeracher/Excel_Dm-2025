package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"exceldm/db"
	"exceldm/handlers"
)

func main() {
	if err := db.Connect(); err != nil {
		log.Fatal(err)
	}
	defer db.Conn.Close(context.Background())

	if err := db.Init(); err != nil {
		log.Fatal("failed to initialise database:", err)
	}

	mux := http.NewServeMux()

	// API routes — Go 1.22+ method-prefixed pattern syntax
	mux.HandleFunc("GET /api/campaigns", handlers.GetCampaign)
	mux.HandleFunc("PUT /api/campaigns", handlers.PutCampaign)

	// Serve the frontend from the project root
	mux.Handle("/", http.FileServer(http.Dir("../")))

	fmt.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}

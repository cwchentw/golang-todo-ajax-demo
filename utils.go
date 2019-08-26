package main

import (
	"encoding/json"
	"net/http"
)

// ErrorMessage emits error message as a json.
func ErrorMessage(w http.ResponseWriter, status int, msg string) {
	data := ResponseMessage{
		msg,
	}

	json, _ := json.Marshal(data)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(json)
}

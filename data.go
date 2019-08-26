package main

// TODO represents single TODO item.
type TODO struct {
	Item  string `json:"item"`
	Index uint   `json:"index"`
}

// TODOs represents TODO items.
type TODOs struct {
	Todos []TODO `json:"todos"`
}

// ResponseMessage represents message json for response
type ResponseMessage struct {
	Message string `json:"message"`
}

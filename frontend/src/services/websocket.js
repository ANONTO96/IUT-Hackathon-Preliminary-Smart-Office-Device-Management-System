const socket = new WebSocket("ws://127.0.0.1:8000/ws");

// socket.onopen = () => {
//   console.log("✅ WebSocket Connected");
// };

// socket.onclose = () => {
//   console.log("❌ WebSocket Closed");
// };

// socket.onerror = (err) => {
//   console.log("WebSocket Error", err);
// };

export default socket;
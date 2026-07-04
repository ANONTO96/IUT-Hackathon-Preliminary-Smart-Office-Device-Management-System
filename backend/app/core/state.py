from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections = set()

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.add(websocket)
        print(f"Client Connected ({len(self.active_connections)})")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.discard(websocket)
        print(f"Client Disconnected ({len(self.active_connections)})")

    async def broadcast(self, message):
        dead = set()

        for conn in self.active_connections:
            try:
                await conn.send_json(message)
            except:
                dead.add(conn)

        for d in dead:
            self.active_connections.discard(d)


# ✅ GLOBAL INSTANCE
connection_manager = ConnectionManager()
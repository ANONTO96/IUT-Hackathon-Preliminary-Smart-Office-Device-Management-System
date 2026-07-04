from email.mime import message

from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections = set()

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.add(websocket)
        print("CONNECT MANAGER ID:", id(self))
        print(f"Client Connected ({len(self.active_connections)})")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.discard(websocket)
        print(f"Client Disconnected ({len(self.active_connections)})")

    async def broadcast(self, message):

        print("BROADCAST MANAGER ID:", id(self))
        print("Connections:", len(self.active_connections))
        dead = set()

        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception as e:
                print(e)
                dead.add(connection)

        for d in dead:
            self.active_connections.remove(d)


# ✅ GLOBAL INSTANCE
connection_manager = ConnectionManager()
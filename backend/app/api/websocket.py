from fastapi import APIRouter, WebSocket
from app.core.state import connection_manager

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await connection_manager.connect(websocket)

    try:
        while True:
            data = await websocket.receive_text()
    except:
        connection_manager.disconnect(websocket)
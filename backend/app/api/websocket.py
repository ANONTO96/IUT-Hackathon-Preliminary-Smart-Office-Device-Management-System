# from fastapi import APIRouter, WebSocket
# from app.core.state import connection_manager

# router = APIRouter()

# @router.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):

#     await connection_manager.connect(websocket)

#     try:
#         while True:
#             await websocket.receive_text()

#     except Exception:
#         connection_manager.disconnect(websocket)



from fastapi import APIRouter, WebSocket
from app.core.state import connection_manager

router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await connection_manager.connect(websocket)

    # Send a test message immediately
    await websocket.send_json({
        "type": "connected",
        "message": "hello"
    })

    try:
        while True:
            await websocket.receive_text()

    except Exception:
        connection_manager.disconnect(websocket)
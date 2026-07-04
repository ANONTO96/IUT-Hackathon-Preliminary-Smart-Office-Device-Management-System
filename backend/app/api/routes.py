from fastapi import APIRouter
from app.services.device_manager import device_manager
from app.core.state import connection_manager

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class DeviceUpdate(BaseModel):
    status: bool


@router.get("/devices")
def get_devices():
    return device_manager.get_all_devices()

@router.get("/devices/{device_id}")
def get_device(device_id: int):

    device = device_manager.devices.get(device_id)

    if device is None:
        return {"error": "Device not found"}

    return device

@router.post("/devices/{device_id}")
async def update_device(device_id: int, update: DeviceUpdate):

    print("Received:", update.status)
    updated = device_manager.update_device(
        device_id,
        update.status
    )

    if updated is None:
        return {"error": "Device not found"}

    # Send live update to all dashboards
    await connection_manager.broadcast(updated)

    return updated
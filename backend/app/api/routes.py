from fastapi import APIRouter
from app.services.device_manager import device_manager

router = APIRouter()

@router.get("/devices")
def get_devices():
    return device_manager.get_all_devices()
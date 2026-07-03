import json
from pathlib import Path
from datetime import datetime


class DeviceStateManager:

    def __init__(self):
        self.devices = {}
        self.load_devices()

    def load_devices(self):
        file_path = (
            Path(__file__).parent.parent
            / "data"
            / "devices.json"
        )

        with open(file_path, "r") as file:
            devices = json.load(file)

        self.devices = {
            device["id"]: device
            for device in devices
        }

        print(f"Loaded {len(self.devices)} devices.")

    def get_all_devices(self):
        return list(self.devices.values())

    def update_device(self, device_id, status):

        device = self.devices[device_id]

        device["status"] = status
        device["last_updated"] = datetime.now().isoformat()

        if device["type"] == "Door":
            device["power"] = 0
        else:
            device["power"] = (
                device["rated_power"]
                if status
                else 0
            )
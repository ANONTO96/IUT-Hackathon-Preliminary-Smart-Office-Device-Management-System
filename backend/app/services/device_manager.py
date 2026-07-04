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

    def update_device(self, device_id: int, status: bool):

        device = self.devices.get(device_id)

        if device is None:
            return None

        previous_status = device["status"]
        now = datetime.now()

        device["status"] = status

        # Doors don't consume power or energy
        if device["type"] == "Door":
            device["current_power"] = 0

        else:
            device["current_power"] = (
                device["rated_power"]
                if status
                else 0
            )

        # Device turned ON
        if status and not previous_status:
            device["activated_at"] = now.isoformat(
                timespec="seconds"
            )

        # Device turned OFF
        elif (
            not status
            and previous_status
            and device["activated_at"] is not None
        ):

            start = datetime.fromisoformat(
                device["activated_at"]
            )

            runtime = (now - start).total_seconds()

            if device["type"] != "Door":
                device["total_runtime"] += int(runtime)

                device["energy_today"] += round(
                    (
                        device["rated_power"]
                        * runtime
                    ) / 3600000,
                    6
                )

            device["activated_at"] = None

        device["last_updated"] = now.isoformat(
            timespec="seconds"
        )

        return device

device_manager = DeviceStateManager()
import asyncio
import random


class DeviceSimulator:

    def __init__(self, manager):
        self.manager = manager

    async def start(self):

        try:
            while True:

                device = random.choice(
                    self.manager.get_all_devices()
                )

                # Toggle the device status
                new_status = not device["status"]

                self.manager.update_device(
                    device["id"],
                    new_status
                )

                state = self.get_state_text(
                    device["type"],
                    new_status
                )

                print(
                    f"[SIMULATOR] {device['name']} -> {state}"
                )

                await asyncio.sleep(
                    random.randint(3, 5)
                )
        except asyncio.CancelledError:
            print("\n[SIMULATOR] Simulation stopped.")

    def get_state_text(self, device_type, status):

        if device_type == "Door":
            return "OPEN" if status else "CLOSED"

        return "ON" if status else "OFF"
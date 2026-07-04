import asyncio
import random

from app.services.device_manager import device_manager
from app.core.state import connection_manager


class DeviceSimulator:

    def __init__(self):
        self.manager = device_manager

    async def start(self):

        print("🚀 Simulator started")

        try:
            while True:

                try:
                    devices = self.manager.get_all_devices()

                    device = random.choice(devices)

                    new_status = not device["status"]

                    updated_device = self.manager.update_device(
                        device["id"],
                        new_status
                    )

                    state = self.get_state_text(
                        updated_device["type"],
                        updated_device["status"]
                    )

                    print(
                        f"[SIMULATOR] "
                        f"{updated_device['name']} | "
                        f"{state} | "
                        f"Power: {updated_device['current_power']}W | "
                        f"Energy: {updated_device['energy_today']:.4f} kWh"
                    )

                    # ✅ FIXED BROADCAST
                    await connection_manager.broadcast(updated_device)

                except Exception as e:
                    print(f"[SIM ERROR] {e}")

                await asyncio.sleep(random.randint(3, 5))

        except asyncio.CancelledError:
            print("🛑 Simulator stopped safely")

    def get_state_text(self, device_type, status):

        if device_type == "Door":
            return "OPEN" if status else "CLOSED"

        return "ON" if status else "OFF"
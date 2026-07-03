import asyncio

from app.services.device_manager import DeviceStateManager
from app.simulator.simulator import DeviceSimulator


async def main():

    manager = DeviceStateManager()

    simulator = DeviceSimulator(manager)

    await simulator.start()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nSmart Office Simulator stopped.")
import requests

from config import API_URL


def get_devices():
    try:
        response = requests.get(f"{API_URL}/devices")
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"API Error: {e}")
        return []

def get_room_energy():

    devices = get_devices()

    rooms = {}

    for device in devices:

        room = device["room"]

        if room not in rooms:
            rooms[room] = 0

        rooms[room] += device["energy_today"]

    return rooms

def get_device(device_id):
    devices = get_devices()

    for device in devices:
        if device["id"] == device_id:
            return device

    return None


def get_total_power():
    devices = get_devices()

    return sum(
        device["current_power"]
        for device in devices
    )


def get_total_energy():
    devices = get_devices()

    return round(
        sum(
            device["energy_today"]
            for device in devices
        ),
        3
    )


def get_summary():

    devices = get_devices()

    online = sum(
        device["status"]
        for device in devices
    )

    offline = len(devices) - online

    return {
        "total": len(devices),
        "online": online,
        "offline": offline,
        "power": get_total_power(),
        "energy": get_total_energy()
    }


def update_device(device_id, status):

    try:

        response = requests.post(
            f"{API_URL}/devices/{device_id}",
            json={
                "status": status
            }
        )

        response.raise_for_status()

        return response.json()

    except requests.RequestException as e:

        print(f"API Error: {e}")

        return None
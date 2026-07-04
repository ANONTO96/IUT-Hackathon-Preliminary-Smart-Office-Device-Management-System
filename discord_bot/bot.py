import discord
from discord import app_commands
from discord.ext import tasks
from datetime import datetime

from config import ALERT_CHANNEL_ID
from config import TOKEN

from api import (
    get_devices,
    get_device,
    get_total_power,
    get_summary,
    update_device,
    get_room_energy,
)

intents = discord.Intents.default()

client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)


@client.event
async def on_ready():
    try:
        synced = await tree.sync()

        print(f"✅ Synced {len(synced)} commands")

        if not office_alert.is_running():
            office_alert.start()
        for cmd in synced:
            print(cmd.name)
        

    except Exception as e:
        print(e)

    print(f"Logged in as {client.user}")


# ==========================
# /devices
# ==========================

@tree.command(
    name="devices",
    description="Show all office devices"
)
async def devices(interaction: discord.Interaction):

    devices = get_devices()

    if not devices:
        await interaction.response.send_message(
            "❌ No devices found."
        )
        return

    message = ""

    for device in devices:

        status = "🟢 ON" if device["status"] else "🔴 OFF"

        message += (
            f"**{device['id']}** • {device['name']}\n"
            f"{status}\n\n"
        )

    await interaction.response.send_message(message)


# ==========================
# /device
# ==========================

@tree.command(
    name="device",
    description="Show one device"
)
@app_commands.describe(device_id="Device ID")
async def device(
    interaction: discord.Interaction,
    device_id: int
):

    device = get_device(device_id)

    if device is None:
        await interaction.response.send_message(
            "❌ Device not found."
        )
        return

    status = "🟢 ON" if device["status"] else "🔴 OFF"

    message = (
        f"## {device['name']}\n\n"
        f"ID : {device['id']}\n"
        f"Room : {device['room']}\n"
        f"Type : {device['type']}\n"
        f"Status : {status}\n"
        f"Power : {device['current_power']} W\n"
        f"Energy Today : {device['energy_today']} kWh\n"
        f"Runtime : {device['total_runtime']} sec"
    )

    await interaction.response.send_message(message)


# ==========================
# /power
# ==========================

@tree.command(
    name="power",
    description="Current office power"
)
async def power(interaction: discord.Interaction):

    total = get_total_power()

    await interaction.response.send_message(
        f"⚡ Current Office Power : **{total} W**"
    )


# ==========================
# /usage
# ==========================

@tree.command(
    name="usage",
    description="Show room-wise usage"
)
async def usage(interaction: discord.Interaction):

    rooms = get_room_energy()

    message = "## 🔋 Today's Usage\n\n"

    total = 0

    for room, energy in rooms.items():

        total += energy

        message += (
            f"🏢 **{room}**\n"
            f"⚡ {energy:.4f} kWh\n\n"
        )

    message += f"**Total:** {total:.4f} kWh"

    await interaction.response.send_message(message)

# ==========================
# /summary
# ==========================

@tree.command(
    name="summary",
    description="Overall office summary"
)
async def summary(interaction: discord.Interaction):

    data = get_summary()

    message = (
        "## 🏢 Office Summary\n\n"
        f"📦 Total Devices : **{data['total']}**\n"
        f"🟢 Active Devices : **{data['online']}**\n"
        f"🔴 Inactive Devices : **{data['offline']}**\n\n"
        f"⚡ Current Power : **{data['power']} W**\n"
        f"🔋 Today's Energy : **{data['energy']} kWh**\n\n"
        "💡 Use `/status` for room-wise details."
    )

    await interaction.response.send_message(message)


# ==========================
# /on
# ==========================

@tree.command(
    name="on",
    description="Turn ON a device"
)
@app_commands.describe(device_id="Device ID")
async def on(
    interaction: discord.Interaction,
    device_id: int
):

    device = update_device(device_id, True)

    if device is None:
        await interaction.response.send_message(
            "❌ Device not found."
        )
        return

    await interaction.response.send_message(
        f"✅ **{device['name']}** turned ON."
    )


# ==========================
# /off
# ==========================

@tree.command(
    name="off",
    description="Turn OFF a device"
)
@app_commands.describe(device_id="Device ID")
async def off(
    interaction: discord.Interaction,
    device_id: int
):

    device = update_device(device_id, False)

    if device is None:
        await interaction.response.send_message(
            "❌ Device not found."
        )
        return

    await interaction.response.send_message(
        f"🔴 **{device['name']}** turned OFF."
    )


# ==========================
# /toggle
# ==========================

@tree.command(
    name="toggle",
    description="Toggle device state"
)
@app_commands.describe(device_id="Device ID")
async def toggle(
    interaction: discord.Interaction,
    device_id: int
):

    device = get_device(device_id)

    if device is None:
        await interaction.response.send_message(
            "❌ Device not found."
        )
        return

    new_status = not device["status"]

    updated = update_device(
        device_id,
        new_status
    )

    state = "🟢 ON" if new_status else "🔴 OFF"

    await interaction.response.send_message(
        f"{updated['name']} is now {state}"
    )

# ==========================
# /status
# ==========================

@tree.command(
    name="status",
    description="Show office status by room"
)
async def status(interaction: discord.Interaction):

    devices = get_devices()

    if not devices:
        await interaction.response.send_message(
            "❌ Unable to fetch device information."
        )
        return

    rooms = {}

    for device in devices:

        room = device["room"]

        if room not in rooms:
            rooms[room] = {
                "fans_on": 0,
                "fans_total": 0,
                "lights_on": 0,
                "lights_total": 0,
                "door": "Unknown"
            }

        if device["type"] == "Fan":
            rooms[room]["fans_total"] += 1
            if device["status"]:
                rooms[room]["fans_on"] += 1

        elif device["type"] == "Light":
            rooms[room]["lights_total"] += 1
            if device["status"]:
                rooms[room]["lights_on"] += 1

        elif device["type"] == "Door":
            rooms[room]["door"] = (
                "🔓 Open"
                if device["status"]
                else "🔒 Closed"
            )

    message = "# 🏢 Office Status\n\n"

    for room, info in rooms.items():

        message += (
            f"## 📍 {room}\n"
            f"🌀 Fans : {info['fans_on']}/{info['fans_total']} ON\n"
            f"💡 Lights : {info['lights_on']}/{info['lights_total']} ON\n"
            f"🚪 Door : {info['door']}\n\n"
        )

    await interaction.response.send_message(message)


# ==========================
# /room
# ==========================

@tree.command(
    name="room",
    description="Show the status of a specific room"
)
@app_commands.describe(
    room="Room name (Drawing Room, Work Room 1, Work Room 2)"
)
async def room(
    interaction: discord.Interaction,
    room: str
):

    devices = get_devices()

    room_devices = [
        device
        for device in devices
        if device["room"].lower() == room.lower()
    ]

    if not room_devices:
        await interaction.response.send_message(
            "❌ Room not found.\n\n"
            "Available rooms:\n"
            "• Drawing Room\n"
            "• Work Room 1\n"
            "• Work Room 2"
        )
        return

    message = f"## 📍 {room.title()}\n\n"

    total_power = 0
    total_energy = 0

    for device in room_devices:

        status = "🟢 ON" if device["status"] else "🔴 OFF"

        icon = {
            "Fan": "🌀",
            "Light": "💡",
            "Door": "🚪"
        }.get(device["type"], "📦")

        message += (
            f"{icon} **{device['name']}** — {status}\n"
        )

        total_power += device["current_power"]
        total_energy += device["energy_today"]

    message += (
        f"\n⚡ **Current Power:** {total_power} W\n"
        f"🔋 **Today's Energy:** {total_energy:.4f} kWh"
    )

    await interaction.response.send_message(message)




@tasks.loop(minutes=1)
async def office_alert():

    now = datetime.now()

    # Only check after 10 PM
    if now.hour < 22:
        return

    devices = get_devices()

    rooms = {}

    for device in devices:

        room = device["room"]

        if room not in rooms:
            rooms[room] = {
                "fans": 0,
                "lights": 0
            }

        if device["type"] == "Fan" and device["status"]:
            rooms[room]["fans"] += 1

        if device["type"] == "Light" and device["status"]:
            rooms[room]["lights"] += 1

    channel = client.get_channel(ALERT_CHANNEL_ID)

    if channel is None:
        print("Alert channel not found.")
        return

    for room, data in rooms.items():

        if data["fans"] == 0 and data["lights"] == 0:
            continue

        await channel.send(
            f"""⚠️ **Office Reminder Alert**

🏢 **{room}**

🌀 Fans ON : {data['fans']}
💡 Lights ON : {data['lights']}

🕙 It's already after 10 PM.

Did someone forget to switch them off?"""
        )

client.run(TOKEN)
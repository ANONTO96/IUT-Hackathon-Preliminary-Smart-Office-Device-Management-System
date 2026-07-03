# 🏢 Smart Office Device Management System

A Smart Office Monitoring System that simulates IoT devices and provides real-time monitoring through a React Dashboard and Discord Bot using a centralized FastAPI backend.

---

## 📌 System Architecture

<p align="center">
    <img src="docs/system-architecture.png" width="100%">
</p>

---

## 🏗 Architecture Overview

The project follows a centralized backend architecture where the FastAPI server acts as the **Single Source of Truth**.

### Data Flow

```text
18 Simulated Devices
        │
        ▼
Python Device Simulator
        │
        ▼
Device State Manager
(In-Memory JSON Store)
        │
        ▼
FastAPI Backend
        │
 ┌──────┼──────────────┐
 │      │              │
REST  WebSocket   Alert Engine
 │      │              │
 ▼      ▼              ▼
React Dashboard   Discord Bot
```

---

## 🎯 Current Progress

### ✅ Completed

- [x] System Architecture
- [x] Project Planning
- [x] Device Dataset (`devices.json`)

### 🚧 In Progress

- [ ] Device State Manager
- [ ] Python Simulator

### ⏳ Upcoming

- [ ] FastAPI Backend
- [ ] REST API
- [ ] WebSocket
- [ ] React Dashboard
- [ ] Discord Bot
- [ ] Alert Engine
- [ ] Power Calculator

---
## 🏢 Office Layout

The simulated office consists of **18 virtual devices** distributed across **3 rooms**.

| Room | Devices |
|------|----------|
| Drawing Room | 2 Fans · 3 Lights · 1 Door |
| Work Room 1 | 2 Fans · 3 Lights · 1 Door |
| Work Room 2 | 2 Fans · 3 Lights · 1 Door |

### Total Devices

- 🌀 Fans : 6
- 💡 Lights : 9
- 🚪 Doors : 3

**Total = 18 Simulated Devices**

## 📂 Repository Structure

```text
backend/
├── app/
│   ├── data/
│   │   └── devices.json
│   ├── services/
│   ├── simulator/
│   └── main.py

discord_bot/

docs/
└── system-architecture.png
```

## ⚙ How It Works

1. The project loads `devices.json` once during startup.
2. The Device State Manager stores all device states in memory.
3. The Python Simulator randomly updates device states.
4. FastAPI exposes the current state through REST APIs and WebSocket.
5. The React Dashboard receives live updates via WebSocket.
6. The Discord Bot retrieves device information through REST APIs and receives alerts from the backend.
# 🏢 Smart Office Device Management System

A real-time Smart Office Monitoring System built for the **IUT CSE TechFest 2026 Hackathon**. The system simulates and monitors IoT devices through a centralized FastAPI backend, providing live updates to a React dashboard and external IoT devices such as ESP32.

---

# 📌 Features

- ⚡ Real-time device monitoring
- 🔄 Live updates using WebSocket
- 🌐 RESTful API for IoT integration
- 🏢 Interactive office floor layout
- 📊 Live power consumption tracking
- 📈 Device runtime & energy calculation
- 🚪 Smart Door monitoring
- 💡 Light & Fan status visualization
- 🔌 Ready for ESP32 integration
- 🤖 Designed for future Discord Bot support

---

# 🏗 System Architecture

<p align="center">
    <img src="docs/system-architecture.png" width="100%">
</p>

---

# 🔄 Data Flow

```text
           ESP32 Devices
                 │
                 │ HTTP POST
                 ▼
          FastAPI Backend
                 │
      Device State Manager
     (In-Memory Device Store)
                 │
      ┌──────────┴──────────┐
      │                     │
 REST API             WebSocket
      │                     │
      ▼                     ▼
 React Dashboard      Live Updates
```

---

# 🏢 Office Layout

The simulated office contains **18 smart devices** distributed across **3 rooms**.

| Room | Devices |
|------|---------|
| Drawing Room | 2 Fans · 3 Lights · 1 Door |
| Work Room 1 | 2 Fans · 3 Lights · 1 Door |
| Work Room 2 | 2 Fans · 3 Lights · 1 Door |

### Total Devices

- 🌀 Fans : **6**
- 💡 Lights : **9**
- 🚪 Doors : **3**

**Total = 18 Smart Devices**

---

# 📊 Dashboard

The React Dashboard provides

- Live office layout
- Device status visualization
- Total active devices
- Current power consumption
- Room-wise device summary
- Live activity feed
- Real-time WebSocket updates

---

# ⚙ Backend

Built with **FastAPI**

### REST Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/devices` | Get all devices |
| GET | `/devices/{id}` | Get a single device |
| POST | `/devices/{id}` | Update device status |
| WS | `/ws` | Live WebSocket connection |

---

# 🔌 ESP32 Integration

External IoT devices can communicate with the backend using simple HTTP requests.

Example

```http
POST /devices/5
```

```json
{
    "status": true
}
```

The backend immediately

- updates the device state
- recalculates power & runtime
- broadcasts the update via WebSocket
- refreshes every connected dashboard instantly

---

# ⚡ Live Device Statistics

Each device stores

- Current Status
- Current Power
- Rated Power
- Total Runtime
- Daily Energy Consumption
- Last Updated Timestamp

---

# 📂 Project Structure

```text
Smart-Office-System
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── core
│   │   ├── data
│   │   ├── services
│   │   ├── simulator
│   │   ├── websocket
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   └── main.jsx
│
├── docs
│   └── system-architecture.png
│
└── README.md
```

---

# 🚀 Technologies Used

## Backend

- FastAPI
- Uvicorn
- WebSocket
- Pydantic

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Lucide Icons

## IoT

- ESP32
- HTTP Client
- JSON

---

# ✅ Current Progress

| Module | Status |
|---------|--------|
| Project Planning | ✅ |
| Device Dataset | ✅ |
| Device State Manager | ✅ |
| REST API | ✅ |
| WebSocket | ✅ |
| Live Dashboard | ✅ |
| Office Layout | ✅ |
| Device Statistics | ✅ |
| Live Activity | ✅ |
| ESP32 Integration | 🚧 |
| Discord Bot | ⏳ |
| Alert Engine | ⏳ |
| Authentication | ⏳ |
| Database | ⏳ |

---

# 🔮 Future Improvements

- MQTT Support
- Database Persistence
- Authentication & Roles
- Alert Notification System
- Discord Bot Commands
- Historical Analytics
- Energy Usage Reports
- Device Scheduling
- AI-based Energy Optimization

---

# 👨‍💻 Developed For

**IUT CSE TechFest 2026 Hackathon**

Team Project — Smart Office Monitoring System
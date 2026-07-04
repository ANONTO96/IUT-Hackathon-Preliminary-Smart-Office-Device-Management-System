from contextlib import asynccontextmanager
import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.websocket import router as websocket_router
from app.services.device_manager import device_manager
from app.simulator.simulator import DeviceSimulator
from app.api.routes import router



@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Runs once when FastAPI starts.
    """

    # simulator = DeviceSimulator()

    # Start simulator in background
    # simulator_task = asyncio.create_task(simulator.start())

    print("✅ Simulator started.")

    yield

    # Stop simulator when FastAPI shuts down
    # simulator_task.cancel()

    print("🛑 Simulator stopped.")


app = FastAPI(
    title="Smart Office Device Management API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(websocket_router)

@app.get("/")
def home():
    return {
        "message": "Smart Office Backend Running"
    }
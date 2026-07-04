import DeviceIcon from "./DeviceIcon";

function OfficeLayout({ devices }) {

  const get = (room, type) =>
    devices.filter(d => d.room === room && d.type === type);

  const rooms = ["Drawing Room", "Work Room 1", "Work Room 2"];

  return (
    <div className="grid grid-cols-3 gap-6">

      {rooms.map((room) => {

        const fans = get(room, "Fan");
        const lights = get(room, "Light");
        const doors = get(room, "Door");

        return (
          <div
            key={room}
            className="relative bg-[#f3e7d3] border-4 border-slate-700 rounded-2xl h-[650px] p-4"
          >

            {/* TITLE */}
            <h2 className="text-center font-bold text-sm mb-6">
              {room.toUpperCase()}
            </h2>

            {/* 🌬️ FANS */}
            <div className="flex flex-col items-center gap-10 mt-4">
              {fans.map((fan, index) => (
                <div key={fan.id} className="flex flex-col items-center gap-1">
                  <DeviceIcon device={fan} />

                  {/* LABEL */}
                  <span className="text-xs text-gray-700 font-medium">
                    {fan.name}
                  </span>
                </div>
              ))}
            </div>

            {/* 💡 LIGHTS (ONLY GLOW) */}
            <div className="flex flex-col items-center gap-8 mt-8">
              {lights.map((light) => (
                <div key={light.id} className="flex flex-col items-center gap-1">

                  <div
                    className={`
                      p-2 rounded-full transition-all duration-300
                      ${light.status
                        ? "ring-4 ring-yellow-400 shadow-[0_0_18px_#fde047]"
                        : "ring-2 ring-gray-400"}
                    `}
                  >
                    <DeviceIcon device={light} />
                  </div>

                  {/* LABEL */}
                  <span className="text-xs text-gray-700 font-medium">
                    {light.name}
                  </span>
                </div>
              ))}
            </div>

            {/* 🚪 DOOR */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
              {doors.map((door) => (
                <div key={door.id} className="flex flex-col items-center gap-1">
                  <DeviceIcon device={door} />
                  <span className="text-xs text-gray-700 font-medium">
                    {door.name}
                  </span>
                </div>
              ))}
            </div>

          </div>
        );
      })}

    </div>
  );
}

export default OfficeLayout;
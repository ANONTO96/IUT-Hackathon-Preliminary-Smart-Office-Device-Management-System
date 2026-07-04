import {
  Fan,
  Lightbulb,
  DoorOpen,
} from "lucide-react";

function DeviceCard({ device }) {

  const getIcon = () => {

    if (device.type === "Fan")
      return <Fan size={22} />;

    if (device.type === "Light")
      return <Lightbulb size={22} />;

    return <DoorOpen size={22} />;
  };

  return (

    <div
      className={`rounded-xl p-4 transition-all border

      ${
        device.status
          ? "bg-green-600/20 border-green-500"
          : "bg-[#141b2d] border-white/5"
      }`}
    >

      <div className="flex justify-between">

        {getIcon()}

        <span
          className={`text-xs px-2 py-1 rounded

          ${
            device.status
              ? "bg-green-600"
              : "bg-gray-700"
          }`}
        >
          {device.type === "Door"
            ? device.status
              ? "OPEN"
              : "CLOSED"
            : device.status
            ? "ON"
            : "OFF"}
        </span>

      </div>

      <h3 className="mt-4 text-white font-semibold">

        {device.name}

      </h3>

      <p className="text-gray-400 text-sm">

        {device.room}

      </p>

      <div className="mt-3 text-sm">

        <p className="text-blue-400">

          Current Power :
          {device.current_power} W

        </p>

        <p className="text-yellow-400">

          Rated :
          {device.rated_power} W

        </p>

      </div>

    </div>

  );

}

export default DeviceCard;
import {
  Fan,
  Lightbulb,
  DoorOpen,
} from "lucide-react";

function DeviceIcon({ device }) {
  if (!device) return null;

  const base = "transition-all duration-300";

  if (device.type === "Fan") {
    return (
      <Fan
        size={34}
        className={`${base} ${
          device.status ? "animate-spin text-orange-500" : "text-gray-600"
        }`}
      />
    );
  }

  if (device.type === "Light") {
    return (
      <Lightbulb
        size={28}
        className={`${base} ${
          device.status
            ? "text-yellow-300 drop-shadow-[0_0_12px_#facc15]"
            : "text-gray-500"
        }`}
      />
    );
  }

  return (
    <DoorOpen
      size={28}
      className={`${base} ${
        device.status ? "text-blue-500" : "text-gray-600"
      }`}
    />
  );
}

export default DeviceIcon;
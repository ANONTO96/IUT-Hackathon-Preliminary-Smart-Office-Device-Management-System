import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  DoorOpen,
  Cpu,
  Zap,
  Bell,
  BarChart3,
} from "lucide-react";

function Sidebar() {

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Rooms", icon: DoorOpen, path: "/rooms" },
    { name: "Devices", icon: Cpu, path: "/devices" },
    { name: "Energy", icon: Zap, path: "/energy" },
    { name: "Alerts", icon: Bell, path: "/alerts" },
    { name: "Analytics", icon: BarChart3, path: "/analytics" },
  ];

  return (
    <aside className="w-64 h-screen bg-[#0f1420] border-r border-white/5 fixed left-0 top-0">

      <div className="px-5 py-5 border-b border-white/5">
        <p className="text-white font-semibold">SMART OFFICE</p>
      </div>

      <div className="mt-6 px-3 flex flex-col gap-2">

        {menu.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}

      </div>

    </aside>
  );
}

export default Sidebar;
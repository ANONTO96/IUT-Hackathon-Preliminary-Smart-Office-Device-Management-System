import {
  LayoutDashboard,
  DoorOpen,
  Cpu,
  Bell,
  BarChart3,
  Zap,
  FileText,
  Settings,
} from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, active: true },
  { name: 'Rooms', icon: DoorOpen },
  { name: 'Devices', icon: Cpu },
  { name: 'Alerts', icon: Bell },
  { name: 'Analytics', icon: BarChart3 },
  { name: 'Energy Usage', icon: Zap },
  { name: 'Reports', icon: FileText },
  { name: 'Settings', icon: Settings },
]

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#0f1420] border-r border-white/5 flex flex-col justify-between fixed left-0 top-0">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-white/5">
          <div className="text-blue-400">
            <LayoutDashboard size={22} />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">
              SMART OFFICE
            </p>
            <p className="text-gray-500 text-[10px] tracking-wide">
              MONITORING SYSTEM
            </p>
          </div>
        </div>

        {/* Menu */}
        <nav className="mt-4 px-3 flex flex-col gap-1">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-default ${
                item.active
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="px-4 pb-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          System Status
        </div>
        <p className="text-[11px] text-gray-500 -mt-2">All Systems Operational</p>

        

        <div className="flex items-center gap-2 px-1">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
            A
          </div>
          <div>
            <p className="text-white text-sm leading-tight">Admin</p>
            <p className="text-gray-500 text-[11px]">Administrator</p>
          </div>
        </div>

        
      </div>
    </aside>
  )
}

export default Sidebar
import { Wifi } from 'lucide-react'

function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0b0f19]">
      <div>
        <h1 className="text-white text-xl font-semibold">Dashboard</h1>
        <p className="text-gray-500 text-sm">Real-time overview of your office</p>
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-green-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Live
        </span>
        <Wifi size={16} className="text-gray-500" />
        <div className="text-right">
          <p className="text-gray-500 text-xs">Last Updated</p>
          <p className="text-white text-sm">10:30:45 AM</p>
        </div>
      </div>
    </header>
  )
}

export default Navbar
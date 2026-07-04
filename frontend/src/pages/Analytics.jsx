import { useOutletContext } from "react-router";

function Analytics() {
  const { devices = [] } = useOutletContext();

  return (
    <div className="bg-[#141b2d] p-5 rounded-xl">
      <h1 className="text-white text-xl font-bold mb-4">
        Live Activity
      </h1>

      <div className="space-y-3">
        {devices.slice(0, 10).map(d => (
          <div key={d.id}>
            <p className="text-white text-sm">{d.name}</p>
            <p className="text-blue-400 text-xs">
              {d.last_updated}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;
function SummaryCards({ devices }) {

  const active =
    devices.filter(d => d.status).length;

  const power = devices.reduce(
    (sum, d) => sum + (d.current_power || 0),
    0
  );

  return (

    <div className="grid grid-cols-4 gap-5 mb-8">

      <div className="bg-[#141b2d] p-5 rounded-xl">

        <h3 className="text-gray-400">

          Total Devices

        </h3>

        <p className="text-3xl text-white">

          {devices.length}

        </p>

      </div>

      <div className="bg-[#141b2d] p-5 rounded-xl">

        <h3 className="text-gray-400">

          Active

        </h3>

        <p className="text-3xl text-green-400">

          {active}

        </p>

      </div>

      <div className="bg-[#141b2d] p-5 rounded-xl">

        <h3 className="text-gray-400">

          Total Power

        </h3>

        <p className="text-3xl text-blue-400">

          {power} W

        </p>

      </div>

      <div className="bg-[#141b2d] p-5 rounded-xl">

        <h3 className="text-gray-400">

          Rooms

        </h3>

        <p className="text-3xl text-purple-400">

          3

        </p>

      </div>

    </div>

  );

}

export default SummaryCards;
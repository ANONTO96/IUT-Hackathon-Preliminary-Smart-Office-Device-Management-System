function LiveActivity({ devices }) {

    const latest = [...devices]
        .filter(device => device.last_updated)
        .sort(
            (a, b) =>
                new Date(b.last_updated) -
                new Date(a.last_updated)
        )
        .slice(0, 6);

    return (

        <div className="bg-[#141b2d] rounded-xl p-5">

            <h2 className="text-white mb-4">

                Live Activity

            </h2>

            {

                latest.map(device => (

                    <div
                        key={device.id}
                        className="border-b border-white/5 py-2"
                    >

                        <p className="text-white">

                            {device.name}

                        </p>

                        <p className="text-gray-400 text-xs">

                            {device.last_updated}

                        </p>

                    </div>

                ))

            }

        </div>

    )

}

export default LiveActivity;
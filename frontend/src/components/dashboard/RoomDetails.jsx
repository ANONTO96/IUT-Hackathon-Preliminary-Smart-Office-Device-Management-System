function RoomDetails({ devices }) {

const rooms=[
"Drawing Room",
"Work Room 1",
"Work Room 2"
]

return(

<div className="bg-[#141b2d] rounded-xl p-5">

<h2 className="text-white mb-5">

Room Summary

</h2>

{

rooms.map(room=>{

const data=devices.filter(d=>d.room===room)

const active=data.filter(d=>d.status).length

return(

<div
key={room}
className="mb-5"
>

<h3 className="text-white">

{room}

</h3>

<p className="text-gray-400">

Devices : {data.length}

</p>

<p className="text-green-400">

Active : {active}

</p>

</div>

)

})

}

</div>

)

}

export default RoomDetails;
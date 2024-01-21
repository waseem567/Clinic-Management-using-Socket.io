"use client"
import React, {useContext, useState} from 'react'
import EditSlots from './EditSlots'

import { useClinicContext } from '@/context/clinicContext';
function Slot({appointment, index,}) {
    const [selectedStartTime, setSelectedStartTime] = useState(appointment.startTime);
    const [selectedEndTime, setSelectedEndTime] = useState(appointment.endTime);
    const [status, setStatus] = useState(appointment.status);
    const { socket } = useContext(useClinicContext);
    const deleteAppointment = async (id) => {
        const deleteApp = await fetch("/api/appointments/"+id, {
            method: "DELETE"
        });
        const res = await deleteApp.json();
        let roomId = 12
        socket.emit("listening_from_frontend", roomId);
    };
  return (
    <tr className="bg-[#232222] border-b border-purple-500 text-white">
        <td className="whitespace-nowrap px-4 py-4 font-medium">{index+1}</td>
        <td className="whitespace-nowrap px-4 py-4">{appointment.startTime}</td>
        <td className="whitespace-nowrap px-4 py-4">{appointment.endTime}</td>
        <td className="whitespace-nowrap px-4 py-4">{appointment.status}</td>
        {/* <td className="whitespace-nowrap px-4 py-4 "><span> <EditSlots selectedStartTime={selectedStartTime} selectedEndTime={selectedEndTime} status={status} /></span></td> */}
        <td className="whitespace-nowrap px-4 py-4"><span onClick={()=>deleteAppointment(appointment._id)} className='bg-red-500 px-2 py-1 text-white rounded cursor-pointer'>Delete</span></td>
    </tr>
  )
}

export default Slot
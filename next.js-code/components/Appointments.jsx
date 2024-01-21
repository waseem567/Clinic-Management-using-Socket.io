"use client"
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import { useClinicContext } from '@/context/clinicContext';

const AppointmentList = ({ appointment, index, }) => {
  const { socket } = useContext(useClinicContext);
  const { data: session } = useSession();
  const oncheckedReservation = async () => {
    const data = await fetch("/api/register/doctor/" + session?.user?.loggedUser?._id, {
      method: "PUT",
      body: JSON.stringify({ appointmentId: appointment._id })
    })
    if (data.status === 200) {
      let roomId = 12
      socket.emit("listening_from_frontend", roomId);
    }
    const resp = data.json()
  };



  return (
    <tr class="bg-[#232222] border-b border-purple-500">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-white whitespace-nowrap"
      >
        {appointment?.Patients[0].name}
      </th>
      <td class="px-6 py-4">{appointment.startTime}</td>
      <td class="px-6 py-4">{appointment.endTime}</td>

      <td class="px-6 py-4 space-x-2">
        <span className="px-2 py-0 rounded-full bg-green-600"></span>
        <span>{appointment.status}</span>
      </td>
      <td class="px-6 py-4"><button onClick={oncheckedReservation} className="bg-green-600 rounded p-3 text-white">checked</button></td>
    </tr>
  );
};

export default AppointmentList;

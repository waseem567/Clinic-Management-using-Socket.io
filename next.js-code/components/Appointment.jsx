"use client";
import React, { useState, useEffect, useContext } from "react";
import AppointmentList from "./Appointments";
import { useSession } from "next-auth/react";
import { useClinicContext } from '@/context/clinicContext';

const Appointment = () => {
  const { data: session } = useSession()
  const [appointments, setAppointments] = useState([]);
  const {socket } = useContext(useClinicContext);

  useEffect(() => {
    getSlots();
  }, []);

  const getSlots = async () => {
    const response = await fetch(`/api/appointments/${session?.user?.loggedUser?._id}`);
    const slotsData = await response.json();
    setAppointments(() => slotsData?.data?.filter(a => a?.status === "Reserved"));
  };

  useEffect(() => {
    if (socket) {
      socket.on("refetch", (roomId) => {
        getSlots();
      });
    }
  }, []);
  

  return (
    <div>
      <div className="text-center text-white py-5">Appointments</div>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-white uppercase bg-[#232222] py-10">
            <tr className="py-10">
              <th scope="col" class="px-6 py-3">
                Patient Name
              </th>
              <th scope="col" class="px-6 py-3">
                Start Time
              </th>
              <th scope="col" class="px-6 py-3">
                End Time
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((app, i) => (
              <AppointmentList key={app._id} index={i} appointment={app} />
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && <div className="text-center py-5 mx-auto w-full">No appointment yet!</div>}

      </div>
    </div>
  );
};

export default Appointment;

"use client"
import React, { useState, useEffect, useContext, use } from 'react';
import EditSlots from './EditSlots';
import Slot from './Slot';
import { useClinicContext } from '@/context/clinicContext';
import { io } from 'socket.io-client';
import { useSession } from 'next-auth/react';

export default function Slots({ }) {
  const { data: session } = useSession()
  const { socket } = useContext(useClinicContext);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    getSlots();
  }, [])
  
  const getSlots = async () => {
    try {
      const response = await fetch(`/api/appointments/${session.user.loggedUser._id}`);
      const slotsData = await response.json();
      setSlots(slotsData.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("emiting_from_server", (roomId) => {
        getSlots();
      });
    }
  }, []);


  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light bg-[#1a1919] border-b border-purple-500 text-white">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-4 py-4">#</th>
                  <th scope="col" className="px-4 py-4">Start Time</th>
                  <th scope="col" className="px-4 py-4">End Time</th>
                  <th scope="col" className="px-4 py-4">Status</th>
                  {/* <th scope="col" className="px-4 py-4">Modify</th> */}
                  <th scope="col" className="px-4 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {slots?.length === 0 && <div>No appointment yet!</div>}
                {slots?.map((app, i) => <Slot key={app._id} index={i} appointment={app} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
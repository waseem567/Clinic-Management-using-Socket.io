/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import DoctorList from '@/components/Doctors'
import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar';
import { useClinicContext } from '@/context/clinicContext';
function doctorList() {
    const [doctorList, setdoctorList] = useState([]);
    const { socket } = useContext(useClinicContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        getAllDoctors();
    }, []);
    const getAllDoctors = async () => {
        setLoading(true);
        const res = await fetch('/api/register/doctor');
        const data = await res.json();
        setLoading(false)
        setdoctorList(data);
    }

    
        useEffect(() => {
            if (socket) {
              socket.on("refetch", (roomId) => {
                getAllDoctors();
              });
            }
          }, []);
    return (
        <div className='lg:ml-64 sm:ml-20 space-y-2 p-3 overflow-hidden'>
            <Sidebar />
            <DoctorList doctorList={doctorList} loading={loading} />
        </div>
    )
}

export default doctorList;

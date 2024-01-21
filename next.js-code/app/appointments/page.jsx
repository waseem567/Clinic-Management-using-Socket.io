import Appointment from '@/components/Appointment'
import React from 'react'
import Sidebar from '@/components/Sidebar'
const appointments = () => {
  return (
    <div className='lg:ml-64 sm:ml-14 p-4'>
      <Sidebar />
      <Appointment/>
    </div>
  )
}

export default appointments
"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { TimePicker } from 'antd';
import moment from "moment";
import { useSession } from "next-auth/react";
import { useClinicContext } from '@/context/clinicContext';

const AddSlots = ({ }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
            >
                Add Slot
            </button>
            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};

const SpringModal = ({ isOpen, setIsOpen, stateManage, setStateManage }) => {
    const { data: session } = useSession();
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const { socket } = useContext(useClinicContext);

    const handleStartTimeChange = (time, timeString) => {
        setStartTime(time);
    };

    const handleEndTimeChange = (time, timeString) => {
        setEndTime(time);
    };

    const handleAddSlot = async () => {
        const res = await fetch("/api/appointments", {
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                startTime: moment(startTime.$d).format('HH:mm'),
                endTime: moment(endTime.$d).format('HH:mm'),
                doctorId: session.user.loggedUser._id
            })
        })
        const data = await res.json();
        let roomId = 12
        socket.emit("listening_from_frontend", roomId);
        setIsOpen(false)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >
                        <div className="flex justify-around items-center my-4">
                            <div className="flex flex-col items-start justify-start">
                                <p>Start Time</p>
                                <TimePicker
                                    onChange={handleStartTimeChange}
                                    value={startTime}
                                    format="HH:mm"
                                    placeholder="Select start time"
                                />
                            </div>
                            <div className="flex flex-col items-start">
                                <p className="ml-4">End Time</p>
                                <TimePicker
                                    onChange={handleEndTimeChange}
                                    value={endTime}
                                    format="HH:mm"
                                    placeholder="Select end time"
                                    style={{ marginLeft: '16px' }}
                                />
                            </div>

                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                            >
                                Nah, go back
                            </button>
                            <button
                                onClick={handleAddSlot}
                                className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                            >
                                Add Slot
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddSlots;
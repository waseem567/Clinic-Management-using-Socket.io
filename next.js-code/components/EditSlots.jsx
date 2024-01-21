"use client"
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";
import { Button, TimePicker } from 'antd';
import moment from "moment";

const EditSlots = ({ selectedEndTime, selectedStartTime,status }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-green-600 to-lime-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
            >
                Edit
            </button>
            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} selectedStartTime={selectedStartTime} selectedEndTime={selectedEndTime} status={status} />
        </>
    );
};

const SpringModal = ({ isOpen, setIsOpen, selectedEndTime, selectedStartTime,status }) => {
   const start = moment(selectedStartTime);
    const [startTime, setStartTime] = useState(start);
    const end = moment(selectedEndTime);
    const [endTime, setEndTime] = useState(end);
    const [updatedStatus, setUpdatedStatus] = useState(status)

    const handleStartTimeChange = (time, timeString) => {
        setStartTime(time);
    };

    const handleEndTimeChange = (time, timeString) => {
        setEndTime(time);
    };

    const handleGetTimeRange = () => {
        const formattedStartTime = moment(startTime.$d).format('HH:mm');
        const formattedEndTime = moment(endTime.$d).format('HH:mm');
    };

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
                        <div className="text-center text-2xl font-bold">Edit Slot</div>
                        {/* Time Picker */}
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
                        <div className="my-5 ml-10">
                            <select name="status" id="status" className="text-black">
                                <option value="" disabled>Status</option>
                                <option value="reserved" selected={updatedStatus==="reserverd"?true:false} >Reserved</option>
                                <option value="not-reserved" selected={updatedStatus==="non-reserverd"?true:false}>Not-Reserved</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                            >
                                Nah, go back
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                            >
                                Edit Slot
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EditSlots;
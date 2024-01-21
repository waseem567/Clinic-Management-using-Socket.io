import mongoose, { Schema, models } from "mongoose";
const AppointmentSchema = new Schema(
    {
        Doctors: {
            type: mongoose.Types.ObjectId,
            ref: 'Doctor'
        },
        Patients: [{
            type: mongoose.Types.ObjectId,
            ref: 'Patient'
        }],
        startTime: {
            type: String
        },
        endTime: {
            type: String
        },
        status: {
            type: String,
            enum: ["Reserved", "Not Reserved"],
            default: "Not Reserved"
        },
    },
    { timestamps: true }
);
const Appointment = models.Appointment || mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
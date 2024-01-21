import mongoose, { Schema, models } from "mongoose";
const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true
    },
    concerns: {
      type: String,
    },
    Appointments: [{
      type: mongoose.Types.ObjectId,
      ref: 'Appointment'
    }],
  },
  { timestamps: true }
);
const Patient = models.Patient || mongoose.model("Patient", patientSchema);
export default Patient;
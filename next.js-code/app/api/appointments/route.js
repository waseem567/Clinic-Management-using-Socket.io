import { connectMongoDB } from '@/lib/mongodb';
import Appointment from '@/models/appointment';
import Doctor from '@/models/doctor'
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        connectMongoDB();
        const appointments = await Appointment.find({}).populate('Patients')
        return NextResponse.json({ message: "Appointments", appointments }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { status: 500, error: error.message, message: "An error occurred while getting Appointments." }
        );
    }
}

export async function POST(req) {

    try {
        const { startTime, endTime, doctorId } = await req.json();
        await connectMongoDB();

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            console.log("Doctor not found.");
            return NextResponse.json(
                { message: "Doctor not found." },
                { status: 404 }
            );
        }

        const appointment = new Appointment({
            Doctors: doctorId,
            startTime,
            endTime,
        });
        console.log(appointment)
        await appointment.save();

        doctor.Appointments.push(appointment._id);
        await doctor.save();

        return NextResponse.json(
            { status: 200, message: "Appointment created successfully.", data: appointment }
        );
    } catch (error) {
        return NextResponse.json(
            { status: 500, message: "An error occurred while creating a new Appointment.", error: error.message },
        );
    }
}
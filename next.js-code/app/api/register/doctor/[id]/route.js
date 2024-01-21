import { connectMongoDB } from "@/lib/mongodb";
import Doctor from "@/models/doctor";
import Appointment from "@/models/appointment";

// Update Doctor by ID
export const PATCH = async (request, { params }) => {
    const updateFields = await request.json();

    try {
        await connectMongoDB();

        const existingDoctor = await Doctor.findById(params.id);

        if (!existingDoctor) {
            return new Response(JSON.stringify({ message: "Doctor not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        for (const field in updateFields) {
            if (Object.prototype.hasOwnProperty.call(updateFields, field)) {
                existingDoctor[field] = updateFields[field];
            }
        }

        const updatedDoctor = await existingDoctor.save();

        const responseData = { message: "Doctor Updated Successfully!", data: updatedDoctor, status: 200 };
        return new Response(JSON.stringify(responseData), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ status: 500, message: "Error updating doctor", error: error.message }), { headers: { 'Content-Type': 'application/json' } });
    }
};

// Get Doctor by ID
export const GET = async (request, { params }) => {
    try {
        await connectMongoDB();

        // Find the doctor by ID and populate Appointments
        const doctor = await Doctor.findById(params.id).populate('Appointments Patients');

        if (!doctor) {
            return new Response(JSON.stringify({ message: "Doctor not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        const responseData = { message: "Doctor and related appointments found.", data: doctor, status: 200 };
        return new Response(JSON.stringify(responseData), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching Doctor data" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
};

// Delete Doctor by ID
export const DELETE = async (request, { params }) => {
    try {
        await connectMongoDB();
        const deletedDoctor = await Doctor.findByIdAndDelete(params.id);

        if (!deletedDoctor) {
            return new Response(
                JSON.stringify({ message: "Doctor not found to delete" }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const deletedDoctorObject = deletedDoctor.toObject();

        const responseData = {
            message: "Doctor successfully deleted.",
            data: deletedDoctorObject,
            status: 200
        };

        return new Response(
            JSON.stringify(responseData),
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ status: 500, message: "Error deleting", error: error.message }),
            { headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// Update Appointment Status by ID By Doctor
export const PUT = async (request, { params }) => {
    const { appointmentId } = await request.json();

    try {
        await connectMongoDB();

        const existingDoctor = await Doctor.findById(params.id);

        if (!existingDoctor) {
            return new Response(JSON.stringify({ message: "Doctor not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        if (!existingDoctor.Appointments.includes(appointmentId)) {
            return new Response(JSON.stringify({ message: "Appointment not associated with this doctor" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        const existingAppointment = await Appointment.findById(appointmentId);

        if (!existingAppointment) {
            return new Response(JSON.stringify({ message: "Appointment not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        if (existingAppointment.status === "Not Reserved") {
            return new Response(JSON.stringify({ message: "Appointment is already 'Not Reserved'" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        existingAppointment.status = "Not Reserved";
        const updatedAppointment = await existingAppointment.save();

        const responseData = { message: "Appointment Status Updated Successfully!", data: updatedAppointment, status: 200 };
        return new Response(JSON.stringify(responseData), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ status: 500, message: "Error updating appointment status", error: error.message }), { headers: { 'Content-Type': 'application/json' } });
    }
};
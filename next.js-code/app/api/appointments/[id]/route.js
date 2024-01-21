import { connectMongoDB } from "@/lib/mongodb";
import Appointment from "@/models/appointment";

// Update Appointment by ID
export const PATCH = async (request, { params }) => {
    const updateFields = await request.json();

    try {
        await connectMongoDB();

        const existingAppointment = await Appointment.findById(params.id);

        if (!existingAppointment) {
            return new Response(
                JSON.stringify({ message: "Appointment not found" }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        for (const field in updateFields) {
            if (Object.prototype.hasOwnProperty.call(updateFields, field)) {
                existingAppointment[field] = updateFields[field];
            }
        }

        const updatedAppointment = await existingAppointment.save();

        const responseData = {
            message: "Appointment Updated Successfully!",
            data: updatedAppointment,
            status: 200
        };

        return new Response(
            JSON.stringify(responseData),
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ status: 500, message: "Error updating appointment", error: error.message }),
            { headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// Get Appointment by ID
export const GET = async (request, { params }) => {
    try {
        await connectMongoDB();
        console.log(params.id);
        // Find the appointment by ID
        const appointment = await Appointment.find({Doctors:params.id}).populate("Doctors Patients");
        console.log(appointment);

        if (!appointment) {
            return new Response(
                JSON.stringify({ message: "Appointment not found" }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const responseData = {
            message: "Appointment found.",
            data: appointment,
            status: 200
        };

        return new Response(
            JSON.stringify(responseData),
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Error fetching appointment data" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// Delete Appointment by ID
export const DELETE = async (request, { params }) => {
    try {
        await connectMongoDB();
        const deletedAppointment = await Appointment.findByIdAndDelete(params.id);

        if (!deletedAppointment) {
            return new Response(
                JSON.stringify({ message: "Appointment not found to delete" }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const deletedAppointmentObject = deletedAppointment.toObject();

        const responseData = {
            message: "Appointment successfully deleted.",
            data: deletedAppointmentObject,
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
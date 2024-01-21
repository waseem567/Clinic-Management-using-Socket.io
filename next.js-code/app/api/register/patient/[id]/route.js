import { connectMongoDB } from "@/lib/mongodb";
import Patient from "@/models/patient";
import Doctor from "@/models/doctor"
import Appointment from "@/models/appointment";

// Update Patient by ID
export const PATCH = async (request, { params }) => {
    const updateFields = await request.json();

    try {
        await connectMongoDB();

        const existingPatient = await Patient.findById(params.id);

        if (!existingPatient) {
            return new Response(JSON.stringify({ message: "Patient not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        for (const field in updateFields) {
            if (Object.prototype.hasOwnProperty.call(updateFields, field)) {
                existingPatient[field] = updateFields[field];
            }
        }

        const updatedPatient = await existingPatient.save();

        const responseData = { message: "Patient Updated Successfully!", data: updatedPatient, status: 200 };
        return new Response(JSON.stringify(responseData), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ status: 500, message: "Error updating patient", error: error.message }), { headers: { 'Content-Type': 'application/json' } });
    }
};

// Get Patient by ID
export const GET = async (request, { params }) => {
    try {
        await connectMongoDB();

        const patient = await Patient.findById(params.id).populate('Appointments');

        if (!patient) {
            return new Response(JSON.stringify({ message: "Patient not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        const responseData = { message: "Patient found.", data: patient, status: 200 };
        return new Response(JSON.stringify(responseData), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching patient data" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
};

// Delete Patient by ID
export const DELETE = async (request, { params }) => {
    try {
        await connectMongoDB();
        const deletedPatient = await Patient.findByIdAndDelete(params.id);

        if (!deletedPatient) {
            return new Response(
                JSON.stringify({ message: "Patient not found to delete" }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const deletedPatientObject = deletedPatient.toObject();

        const responseData = {
            message: "Patient successfully deleted.",
            data: deletedPatientObject,
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

// Update Appointment Status by ID By Patient
export const PUT = async (request, { params }) => {
    const { appointmentId } = await request.json();

    try {
        await connectMongoDB();

        const existingPatient = await Patient.findById(params.id);

        if (!existingPatient) {
            return new Response(JSON.stringify({ message: "Patient not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        const existingAppointment = await Appointment.findById(appointmentId);

        if (!existingAppointment) {
            return new Response(JSON.stringify({ message: "Appointment not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        if (existingAppointment.status === "Reserved") {
            return new Response(JSON.stringify({ message: "Appointment is already 'Reserved'" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        existingAppointment.status = "Reserved";
        const updatedAppointment = await existingAppointment.save();

        existingAppointment.Patients.push(existingPatient._id);
        await existingAppointment.save();

        const existingDoctor = await Doctor.findById(existingAppointment.Doctors);
        existingDoctor.Patients.push(existingPatient._id);
        await existingDoctor.save();

        existingPatient.Appointments.push(appointmentId);
        await existingPatient.save();

        const responseData = { message: "Appointment Status Updated Successfully!", data: updatedAppointment, status: 200 };
        return new Response(JSON.stringify(responseData), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ status: 500, message: "Error updating appointment status", error: error.message }), { headers: { 'Content-Type': 'application/json' } });
    }
};
import { connectMongoDB } from "@/lib/mongodb";
import Doctor from "@/models/doctor";
import Patient from "@/models/patient";
import { NextResponse } from "next/server";
import Appointment from "@/models/appointment";
import bcrypt from "bcryptjs";
import { App } from "antd";

export async function POST(req) {
    try {
        const { name, email, password, age, specialization, qualification, exp, amount, address, gender, isDoctor } = await req.json();
        await connectMongoDB();
        const existedDoc = await Doctor.findOne({ email: email })
        const existedPat = await Patient.findOne({ email: email })

        if (existedPat || existedDoc) {
            return NextResponse.json({ message: "User Already Existed" }, { status: 400 })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = await Doctor.create({ name, email, password: hashedPassword, age, specialization, qualification, exp, amount, address, gender, isDoctor });

        return NextResponse.json({ message: "User registered.", newDoctor }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 },
            { error: error.message }
        );
    }
}

export async function GET(req) {
    try {
        await connectMongoDB();
        const Doctors = await Doctor.find({}).populate("Appointments");

        return NextResponse.json({ message: "All doctors.", Doctors }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { status: 500, error: error.message, message: "An error occurred while getting the user." }
        );
    }
}
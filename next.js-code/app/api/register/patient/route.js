import { connectMongoDB } from "@/lib/mongodb";
import Patient from "@/models/patient";
import Doctor from "@/models/doctor";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password, age, concerns } = await req.json();
        const existedDoc = await Doctor.findOne({ email: email })
        const existedPat = await Patient.findOne({email:email})

        if (existedPat || existedDoc) {
            return NextResponse.json({ message: "User Already Existed" }, { status: 400 })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        const newPatient = await Patient.create({ name, email, password: hashedPassword, age, concerns });
        console.log(newPatient)

        return NextResponse.json({ message: "User registered.", data: newPatient }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 },
            { error: error.message}
        );
    }
}

export async function GET(req) {
    try {
        await connectMongoDB();
        const Patients = await Patient.find({});

        return NextResponse.json({ message: "User registered.", data: Patients }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 },
            { error: error.message}
        );
    }
}


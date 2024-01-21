"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function PatientForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [valueDoc, setValue] = useState({
        name: "",
        email: "",
        password: "",
        age: 0,
        gender: "",
    });
    const onSavePatientProfile = async e => {
        e.preventDefault();
        if (valueDoc.name.trim() === "" || valueDoc.email.trim() === "" || valueDoc.password.trim() === "" || valueDoc.age.trim() === "" || valueDoc.gender.trim() === "") {
            return setError("Invalid credentials");
        };
        setLoading(true);
        // send request here....
        const data = await fetch("/api/register/patient", {
            method: "POST",
            body: JSON.stringify({
                name: valueDoc.name,
                email: valueDoc.email,
                password: valueDoc.password,
                age: valueDoc.age,
                gender: valueDoc.gender
            })
        });
        const resp = await data.json();
        if(!data.ok){
            setError(resp.message);
            setLoading(false);
            return;
        }
        setLoading(false);
        router.push("/");
    };
    const onClear = () => {
        setValue({
            name: "",
            email: "",
            password: "",
            age: 0,
            gender: "",
        });
        
        router.push("/choices");
    };
    const onChangeState = event => {

        const { name, value } = event.target;
        setError(null);
        setValue({
            ...valueDoc,
            [name]: value
        });
    }
    return <form className="md:mt-20 p-form z-50 sm:w-1/2 mx-auto p-5 xl:w-[700px]" onSubmit={onSavePatientProfile}>
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-white font-semibold leading-7 text-center">Patient Profile</h2>
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-12">
                       
                        <div class="mt-2">
                            <input onChange={onChangeState} name="name" type="text" class="border-t-0 border-l-0 border-r-0 opacity-100 block w-full outline-none py-2 bg-[#232323] text-white sm:leading-6 border-b-white" placeholder="Enter name..." value={valueDoc.name} />
                        </div>
                    </div>
                    <div class="sm:col-span-4">
                       
                        <div class="mt-2">
                            <input onChange={onChangeState} id="email" name="email" type="email" placeholder="Enter email..." value={valueDoc.email} class="border-t-0 border-l-0 border-r-0 opacity-100 block w-full outline-none py-2 bg-[#232323] text-white sm:leading-6 border-b-white" />
                        </div>
                    </div>
                    <div class="sm:col-span-4">
                        
                        <div class="mt-2">
                            <input value={valueDoc.password} onChange={onChangeState} id="email" placeholder="Enter password..." name="password" type="password" autocomplete="password" class="border-t-0 border-l-0 border-r-0 opacity-100 block w-full outline-none py-2 bg-[#232323] text-white sm:leading-6 border-b-white" />
                        </div>
                    </div>
                    <div class="sm:col-span-4">
                        
                        <div class="mt-2 w-full">
                            <select value={valueDoc.gender} onChange={onChangeState} id="country" name="gender" autocomplete="country-name" class="cursor-pointer border-t-0 border-l-0 border-r-0 opacity-100 block w-full outline-none py-2 bg-[#232323] text-white sm:leading-6 border-b-white">
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="sm:col-span-2 sm:col-start-1">
                        <label for="city" class="block text-sm font-medium leading-6 text-white">Age</label>
                        <div class="mt-2">
                            <input value={valueDoc.age} onChange={onChangeState} type="number" placeholder="Enter age..." min="20" name="age" id="city" autocomplete="address-level2" class="w-full border-t-0 border-l-0 border-r-0 opacity-100 block outline-none py-2 bg-[#232323] text-white sm:leading-6 border-b-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-6 grid grid-cols-2">
             <div className="text-red-500 flex justify-start items-center">{error && error}</div>
            <div className="grid grid-cols-2 gap-3">
            <button onClick={onClear} type="button" class="text-sm px-5 py-2 leading-6 text-white bg-[#232323]">Back</button>
            <button type="submit" class={`${loading && "opacity-50"} px-5 py-2 bg-[#eac726] flex justify-center`} disabled={loading}>{loading ? "Saving....": "Save"}</button>
            </div>
        </div>
    </form>
};
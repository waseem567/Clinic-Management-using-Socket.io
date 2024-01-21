"use client"
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
export default function DoctorForm (){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const router = useRouter();
    const [valueDoc, setValue] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        specialz: "",
        qualification: "",
        experience: "",
        amount: "",
        address: "",
        isDoctor:true
    })
    const onSaveDoctorProfile = async e => {
        e.preventDefault();
        if(valueDoc.address.trim() === "" || valueDoc.name.trim() === "" || valueDoc.email.trim() === "" || valueDoc.password.trim() === "" || valueDoc.age.trim() === "" || valueDoc.qualification.trim() === "" || valueDoc.specialz.trim() === "" || valueDoc.gender.trim() === "" || valueDoc.experience.trim() === "" || valueDoc.amount.trim() === ""){
            return setError("Invalid credentials entered!")
        };
        setLoading(true);
        const data = await fetch("/api/register/doctor", {
            method: "POST",
            body: JSON.stringify({
                name: valueDoc.name,
                email:valueDoc.email,
                password: valueDoc.password,
                age: valueDoc.age,
                gender: valueDoc.gender,
                specialization: valueDoc.specialz,
                amount: valueDoc.experience,
                qualification: valueDoc.qualification,
                exp: valueDoc.experience,
                address: valueDoc.address,
                isDoctor:valueDoc.isDoctor
            })
        });
        
        const resp = await data.json();
        if(!data.ok){
          setError(resp.message)
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
            specialz: "",
            qualification: "",
            experience: 0,
            amount: 0,
            address: "",
            isDoctor:false
        });
        router.push("/choices");
    };
    const onChangeState = event => {
        const { name, value } = event.target;

        setError(null)
         setValue({
            ...valueDoc,
        [name]: value
        });
    };
    return <form className="md:mt-20 p-form z-50 sm:w-1/2 mx-auto p-5 xl:w-[700px] " onSubmit={onSaveDoctorProfile}>
    
  <div class="space-y-12">
    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-white text-center">Doctor Profile</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600 text-center">This information will be shown publically.</p>
      <div class="">
      <div class="sm:col-span-4">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input onChange={onChangeState} placeholder="Enter your full name..." name="name" type="text" class="input" value={valueDoc.name} />
          </div>
        </div>
        <div class="sm:col-span-4">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input onChange={onChangeState} id="email" name="email" type="email" value={valueDoc.email} class="input" placeholder="Enter email..." />
          </div>
        </div>
        <div class="sm:col-span-4">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input value={valueDoc.password} onChange={onChangeState} id="email" name="password" placeholder="Enter password" type="password" autocomplete="email" class="input" />
          </div>
        </div>
        <div class="sm:col-span-4">
          <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Gender</label>
          <div class="mt-2 w-full">
            <select value={valueDoc.gender} onChange={onChangeState} id="country" name="gender" autocomplete="country-name" class="input">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div class="sm:col-span-2 sm:col-start-1">
          <label for="city" class="block text-sm font-medium leading-6 text-gray-900">Age</label>
          <div class="mt-2">
            <input value={valueDoc.age} onChange={onChangeState} type="number" min="1" name="age" placeholder="Age" id="city" autocomplete="address-level2" class="input" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="regions" class="block text-sm font-medium leading-6 text-gray-900">Specialization</label>
          <div class="mt-2">
            <input value={valueDoc.specialz} onChange={onChangeState} type="text" name="specialz" placeholder="Specialization" id="regions" autocomplete="address-level1" class="input" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">Qualification</label>
          <div class="mt-2">
            <input value={valueDoc.qualification} onChange={onChangeState} type="text" name="qualification" placeholder="Qualification" id="postal-code" autocomplete="postal-code" class="input" />
          </div>
        </div>
        <div class="sm:col-span-2 sm:col-start-1">
          <label for="city" class="block text-sm font-medium leading-6 text-gray-900">Experience (years)</label>
          <div class="mt-2">
            <input value={valueDoc.experience} onChange={onChangeState} type="number" min="1" name="experience" id="city" autocomplete="address-level2" class="input" placeholder="Experience" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="region" class="block text-sm font-medium leading-6 text-gray-900">Consultency Fees (Pkr)</label>
          <div class="mt-2">
            <input value={valueDoc.amount} onChange={onChangeState} type="number" name="amount" id="region" placeholder="Charges" autocomplete="address-level1" class="input" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">Clinic Address</label>
          <div class="mt-2">
            <input value={valueDoc.address} onChange={onChangeState} type="text" name="address" id="postal-code" placeholder="Address of the clinic" autocomplete="postal-code" class="input" />
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
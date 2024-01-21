"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("")
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        setLoading(false);
        return;
      }
      if (res.ok) {
        const session = await getSession();
        if (session && session.user && session.user.loggedUser && session.user.isDoctor) {
          router.push("/dashboard");
        } else {
          router.push("/doctor-list");
        }
    } 
  } catch (error) {
      setLoading(false)
    }
  };
  return (
    <div class="md:mt-20 p-form z-50 sm:w-1/2 mx-auto p-5 xl:w-[700px]">

        <h2 class="text-white font-semibold leading-7 text-center">Log In</h2>


          <form class="space-y-6 mt-4" onSubmit={handleSubmit}ob>
            <div>
              
              <div class="mt-1">
                <input name="email" type="email-address" autocomplete="email-address" required placeholder="Enter email..."
                  class="border-t-0 border-l-0 border-r-0 opacity-100 block w-full outline-none py-2 bg-[#232323] text-white sm:leading-6 border-b-white" onChange={(e)=>setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <div class="mt-1">
                <input id="password" name="password" type="password" autocomplete="password" required
                  class="border-t-0 border-l-0 border-r-0 opacity-100 block w-full outline-none py-2 bg-[#232323] text-white sm:leading-6 border-b-white" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} />
              </div>
            </div>

            <div>
              <div className="text-red-500 text-start py-3">{error !== "" && error}</div>
              <button type="submit"
                class={` ${loading && "opacity-50"} flex w-full justify-center border border-transparent bg-[#eac726] py-2 text-sm font-medium shadow-sm text-black`}>{loading ? "Please wait" : "Log In"}
              </button>
            </div>
            <span className="text-sm mt-6 block my-3 text-white" >
            Not Registered? <Link href={"/choices"} className="underline">Register</Link>
          </span>
          </form>
        </div>
   
 
  );
}

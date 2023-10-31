"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TypeAnimationStudent from "@/components/user/TypeAnimationUser";
import Link from "next/link";
import axios from "axios";

const Signin = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    try {
      // console.log(username, password);
      const res = await axios.post("api/user/signin", {
        email,
        password,
      });

      console.log(res.data);
      router.push("/");
      
      
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 p-4 md:p-0 bg-gradient-to-t from-fuchsia-100 white h-screen">
      <section className="flex items-start justify-center md:items-center col-span-1">
        <div className="w-full h-[80vh] flex justify-center items-center">
          <div className="w-[20rem]">
            <h1 className="text-center pt-0 md:pt-4 font-sans text-2xl md:text-3xl md:font-semi-bold">
              Welcome back
            </h1>
            <div className="flex flex-col px-4 pt-6">
              <label htmlFor="username">email</label>
              <input
                className=" bg-transparent w-72 rounded-md h-8 p-2 border border-[#7b2cbf]  focus:outline-[#7b2cbf]"
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col px-4 pt-2">
              <div className="flex justify-between mt-5">
                <label htmlFor="password">password</label>
                <a className="text-blue-950" href="#">
                  forgot password?
                </a>
              </div>
              <input
                className=" bg-transparent w-72 rounded-md h-8 p-2 border border-[#7b2cbf]  focus:outline-[#7b2cbf]"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <div className="mt-10 text-center text-purple-950">
                <Link className="text-sm" href="/signup">
                  Don't have an account?
                </Link>
                <Button
                  className="w-72 bg-[#7b2cbf] rounded-md text-white px-3 py-1"
                  onClick={submitHandler}
                >
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative flex justify-start items-center order-first md:order-last h-20 md:h-full pt-6 md:p-0">
        <TypeAnimationStudent />
      </section>
    </main>
  );
};

export default Signin;

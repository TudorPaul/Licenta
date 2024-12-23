"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const EmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return EmailRegex.test(email);
  };

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const username = e.target.username.value;

    if (!isValidEmail(email)) {
      alert("Invalid email");
      return;
    }
    if (!password || password.length < 8) {
      alert("Invalid password");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          username,
        }),
      });

      if (res.status === 400) {
        setError("This email is already in use");
        return;
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (err) {
      setError("Something went wrong");
      console.log("app/(auth)/register/page", err);
    }
  };

  if (sessionStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-96 rounded bg-dark-500 p-8 shadow-md">
          <h1 className="mb-4 text-center text-2xl font-bold">Register</h1>
          <form onSubmit={HandleSubmit}>
            <input
              type="text"
              name="email"
              className="mb-4 w-full border border-dark-200 p-2 text-dark-200"
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              className="mb-4 w-full border border-dark-200 p-2 text-dark-200 focus:outline-none"
              placeholder="Password"
              required
            />
            <input
              type="text"
              name="name"
              className="mb-4 w-full border border-dark-200 p-2 text-dark-200"
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="username"
              className="mb-4 w-full border border-dark-200 p-2 text-dark-200"
              placeholder="Username"
              required
            />
            <button
              type="submit"
              className="primary-gradient w-full rounded p-2 text-light-900"
            >
              Register
            </button>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </form>
          <Link className="mt-4 block hover:underline" href="/login">
            Already have an account? Login
          </Link>
        </div>
      </div>
    )
  );
};

export default Page;

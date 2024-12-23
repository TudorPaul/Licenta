"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

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
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log("app/(auth)/login/page", email, password);

    if (!isValidEmail(email)) {
      alert("Invalid email");
      return;
    }
    if (!password || password.length < 8) {
      alert("Invalid password");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError(res.error);
      if (res?.url) router.replace("/");
    } else {
      setError("");
      router.push("/");
    }
  };
  if (sessionStatus === "loading") {
    return <div>Loading...</div>;
  }
  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="mt-14 w-96 rounded bg-dark-500 p-8 shadow-md">
          <h1 className="mb-4 text-center text-2xl font-bold">Login</h1>
          <form onSubmit={HandleSubmit}>
            <input
              type="text"
              className="mb-4 w-full border border-dark-200 p-2 text-dark-200"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="mb-4 w-full border border-dark-200 p-2 text-dark-200 focus:outline-none"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="primary-gradient w-full rounded p-2 text-light-900"
            >
              Login
            </button>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </form>
          <button
            className="mx-auto mt-4 flex items-center justify-center"
            onClick={() => signIn("github")}
          >
            <Image
              alt="Github"
              src="/images/github-mark.png"
              width={72}
              height={72}
              className="rounded-full object-cover"
            />
          </button>
          <Link className="mt-4 block hover:underline" href="/register">
            Do not have an account? Register
          </Link>
        </div>
      </div>
    )
  );
};

export default Page;

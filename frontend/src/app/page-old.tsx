"use client";

import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import LoginButton from "../components/LoginButton";
import AuthenticationDemo from "../components/AuthenticationDemo";

export default function Home() {
  const { user, isLoading } = useUser();

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <div className="text-2xl font-bold">+ Auth0</div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Authentication System Demo
          </h1>
          <p className="text-gray-600 mb-8">
            JWT-based authentication using Auth0 with Next.js and Spring Boot
          </p>
        </div>

        {user ? (
          <div className="text-center space-y-4">
            <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <h2 className="text-lg font-semibold">Welcome, {user.name}!</h2>
              <p>You are successfully authenticated.</p>
            </div>

            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <a
                href="/protected"
                className="rounded-full border border-solid border-green-600 transition-colors flex items-center justify-center bg-green-600 text-white hover:bg-green-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              >
                Go to Protected Dashboard
              </a>
              <LoginButton />
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
              <h2 className="text-lg font-semibold">Please log in</h2>
              <p>You need to authenticate to access protected features.</p>
            </div>
            <LoginButton />
          </div>
        )}

        <AuthenticationDemo />

        <div className="max-w-2xl text-center space-y-4">
          <h3 className="text-xl font-semibold">Project Features</h3>
          <ul className="text-left text-sm space-y-2 bg-gray-50 p-4 rounded-lg">
            <li>✅ Auth0 integration with Next.js</li>
            <li>✅ JWT token-based authentication</li>
            <li>✅ Protected routes and pages</li>
            <li>✅ Secure API calls to Spring Boot backend</li>
            <li>✅ User profile management</li>
            <li>✅ Token validation testing</li>
          </ul>
        </div>

        {/* Authentication Demo Component */}
        <div className="w-full max-w-4xl">
          <AuthenticationDemo />
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://auth0.com/docs/quickstart/spa/nextjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Auth0 Docs
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js Docs
          </a>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useUser } from "@auth0/nextjs-auth0";
import LoginButton from "../components/LoginButton";

export default function Home() {
  const { user, isLoading } = useUser();

  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light mb-4">Auth0 Authentication</h1>
          <p className="text-gray-400 text-lg">
            Simple JWT-based authentication with Next.js
          </p>
        </div>

        {/* Auth Status */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
          {user ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium mb-2">Welcome, {user.name}</h2>
              <p className="text-gray-400 mb-6">
                You are successfully authenticated
              </p>

              <div className="flex gap-4 justify-center">
                <a
                  href="/protected"
                  className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition-colors"
                >
                  Dashboard
                </a>
                <LoginButton />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium mb-2">Not Authenticated</h2>
              <p className="text-gray-400 mb-6">
                Please log in to access protected features
              </p>
              <LoginButton />
            </div>
          )}
        </div>

        {/* Features */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
          <h3 className="text-lg font-medium mb-6">Features</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">Auth0 Integration</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">JWT Authentication</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">Protected Routes</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">API Integration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

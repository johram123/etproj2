"use client";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Profile from "../../components/Profile";
import ProtectedApiTest from "../../components/ProtectedApiTest";

export default withPageAuthRequired(function ProtectedPage() {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-light text-center mb-12">Dashboard</h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-medium mb-6">User Profile</h2>
            <Profile />
          </div>

          <div>
            <h2 className="text-xl font-medium mb-6">API Testing</h2>
            <ProtectedApiTest />
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-block px-6 py-2 bg-gray-800 border border-gray-700 text-white rounded hover:bg-gray-700 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
});

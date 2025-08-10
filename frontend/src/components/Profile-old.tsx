"use client";

import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div className="text-gray-400">Loading...</div>;
  if (error) return <div className="text-red-400">Error: {error.message}</div>;

  if (user) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex items-center mb-6">
          {user.picture && (
            <Image
              src={user.picture}
              alt="Profile"
              width={64}
              height={64}
              className="rounded-full mr-4"
            />
          )}
          <div>
            <h3 className="text-lg font-medium text-white">{user.name}</h3>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">
            Token Details
          </h4>
          <div className="bg-black border border-gray-700 rounded p-4">
            <pre className="text-xs text-gray-300 overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-gray-400">Please log in to view your profile.</div>
  );
}

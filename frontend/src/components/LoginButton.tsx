"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function LoginButton() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div className="text-gray-400">Loading...</div>;

  if (user) {
    return (
      <a
        href="/api/auth/logout"
        className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 px-6 py-2 rounded transition-colors"
      >
        Logout
      </a>
    );
  }

  return (
    <a
      href="/api/auth/login"
      className="bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 px-6 py-2 rounded transition-colors"
    >
      Login
    </a>
  );
}

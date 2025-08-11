"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";

export default function JwtTokenDisplay() {
  const { user } = useUser();
  const [accessToken, setAccessToken] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const getAccessToken = async () => {
    if (!user) {
      setError("Please log in first");
      return;
    }

    setLoading(true);
    setError("");
    setAccessToken("");

    try {
      // Get access token from Auth0
      const response = await fetch("/api/auth/token");

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken || "No access token available");
      } else {
        throw new Error(`Failed to get token: ${response.status}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Token copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  if (!user) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">JWT Tokens</h3>
        <p className="text-gray-400">Please log in to view JWT tokens</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">JWT Tokens from Auth0</h3>

      {/* User Info from JWT */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-2">
          User Claims (from ID Token):
        </h4>
        <div className="bg-black border border-gray-700 rounded p-4 overflow-auto max-h-40">
          <pre className="text-sm text-green-400">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
        <button
          onClick={() => copyToClipboard(JSON.stringify(user, null, 2))}
          className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Copy User Claims
        </button>
      </div>

      {/* Access Token */}
      <div className="mb-4">
        <button
          onClick={getAccessToken}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Getting Token..." : "Get Access Token"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-200">
          <strong>Error:</strong> {error}
        </div>
      )}

      {accessToken && (
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Access Token (JWT):</h4>
          <div className="bg-black border border-gray-700 rounded p-4 overflow-auto max-h-32">
            <pre className="text-sm text-yellow-400 break-all whitespace-pre-wrap">
              {accessToken}
            </pre>
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => copyToClipboard(accessToken)}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Copy Token
            </button>
            <a
              href={`https://jwt.io/#debugger-io?token=${encodeURIComponent(
                accessToken
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
            >
              Decode on JWT.io
            </a>
          </div>
        </div>
      )}

      {/* Token Info */}
      <div className="text-sm text-gray-400">
        <p>
          <strong>ID Token:</strong> Contains user profile information
          (displayed above)
        </p>
        <p>
          <strong>Access Token:</strong> Used to call protected APIs (click
          button to get)
        </p>
        <p>
          <strong>Refresh Token:</strong> Used to get new tokens (handled
          automatically)
        </p>
      </div>
    </div>
  );
}

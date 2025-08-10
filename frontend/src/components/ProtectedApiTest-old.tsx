"use client";

import { useUser, getAccessToken } from "@auth0/nextjs-auth0";
import { useState } from "react";

export default function ProtectedApiTest() {
  const { user } = useUser();
  const [apiResponse, setApiResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const callProtectedApi = async () => {
    if (!user) {
      setError("Please log in first");
      return;
    }

    setLoading(true);
    setError("");
    setApiResponse("");

    try {
      const token = await getAccessToken();

      const response = await fetch("http://localhost:8080/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.text();
        setApiResponse(data);
      } else {
        throw new Error(
          `API call failed: ${response.status} ${response.statusText}`
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const callUnprotectedApi = async () => {
    setLoading(true);
    setError("");
    setApiResponse("");

    try {
      const response = await fetch("http://localhost:8080/api/protected");

      if (response.ok) {
        const data = await response.text();
        setApiResponse(data);
      } else {
        throw new Error(
          `API call failed: ${response.status} ${response.statusText}`
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const callLocalProtectedApi = async () => {
    setLoading(true);
    setError("");
    setApiResponse("");

    try {
      const response = await fetch("/api/protected-demo");

      if (response.ok) {
        const data = await response.json();
        setApiResponse(JSON.stringify(data, null, 2));
      } else {
        throw new Error(
          `Local API call failed: ${response.status} ${response.statusText}`
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">API Testing</h3>

      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={callProtectedApi}
            disabled={loading || !user}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Call Spring Boot API"}
          </button>

          <button
            onClick={callLocalProtectedApi}
            disabled={loading || !user}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Call Local Protected API"}
          </button>

          <button
            onClick={callUnprotectedApi}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Call API (no auth)"}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {error}
          </div>
        )}

        {apiResponse && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            <h4 className="font-semibold">API Response:</h4>
            <pre className="mt-2 whitespace-pre-wrap">{apiResponse}</pre>
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p>
            <strong>Spring Boot API:</strong> Calls your backend server
            (requires Spring Boot running)
          </p>
          <p>
            <strong>Local Protected API:</strong> Calls Next.js API route with
            Auth0 protection
          </p>
          <p>
            <strong>No Auth API:</strong> Should fail with 401/403 error
          </p>
        </div>
      </div>
    </div>
  );
}

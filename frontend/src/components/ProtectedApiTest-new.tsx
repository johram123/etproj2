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

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-medium text-white mb-6">API Testing</h3>

      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={callProtectedApi}
            disabled={loading || !user}
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Loading..." : "Spring Boot API"}
          </button>

          <button
            onClick={callLocalProtectedApi}
            disabled={loading || !user}
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Loading..." : "Local Protected API"}
          </button>

          <button
            onClick={callUnprotectedApi}
            disabled={loading}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Loading..." : "No Auth Test"}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-900 border border-red-700 text-red-300 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {apiResponse && (
          <div className="p-3 bg-green-900 border border-green-700 text-green-300 rounded">
            <h4 className="font-medium mb-2">Response:</h4>
            <pre className="text-xs overflow-auto whitespace-pre-wrap">
              {apiResponse}
            </pre>
          </div>
        )}

        <div className="text-sm text-gray-400 space-y-1">
          <p>
            <strong>Spring Boot API:</strong> Calls your backend server
          </p>
          <p>
            <strong>Local Protected API:</strong> Calls Next.js protected route
          </p>
          <p>
            <strong>No Auth Test:</strong> Should fail with 401/403
          </p>
        </div>
      </div>
    </div>
  );
}

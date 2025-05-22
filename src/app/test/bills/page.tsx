"use client";

import { useState } from "react";

export default function TestBillsPage() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch("/api/test/bills");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to run test");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Bill Creation</h1>

      <button
        onClick={runTest}
        disabled={isLoading}
        className={`btn btn-primary mb-4 ${isLoading ? "loading" : ""}`}
      >
        {isLoading ? "Running Test..." : "Run Test"}
      </button>

      {error && (
        <div className="alert alert-error mb-4">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="alert alert-success">
            <p>{result.message}</p>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Test Prescription</h2>
              <pre className="bg-base-200 p-4 rounded-lg overflow-auto">
                {JSON.stringify(result.testPrescription, null, 2)}
              </pre>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Created Bill</h2>
              <pre className="bg-base-200 p-4 rounded-lg overflow-auto">
                {JSON.stringify(result.createdBill, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

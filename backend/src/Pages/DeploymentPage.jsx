import React, { useState } from 'react';

const DeploymentPage = () => {
  const [status, setStatus] = useState("live"); // Options: "live", "pending", "failed"

  const [logs, setLogs] = useState([
    "[14:01] Starting deployment...",
    "[14:02] Installing dependencies...",
    "[14:05] Build completed.",
    "[14:06] Deployment successful.",
  ]);

  const getStatusBadge = () => {
    switch (status) {
      case "live":
        return <span className="badge badge-success">Live</span>;
      case "pending":
        return <span className="badge badge-warning">Pending</span>;
      case "failed":
        return <span className="badge badge-error">Failed</span>;
      default:
        return <span className="badge">Unknown</span>;
    }
  };

  return (
    <div className="p-6 space-y-6 ">
      <h2 className="text-2xl font-bold">🚀 Deployment Status</h2>

      <div className="card shadow-md bg-base-100 border border-base-300">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h3 className="card-title">Current Status</h3>
            {getStatusBadge()}
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Logs</h4>
            <div className="bg-base-200 p-4 rounded overflow-y-auto max-h-48 font-mono text-sm">
              {logs.map((log, index) => (
                <p key={index}>{log}</p>
              ))}
            </div>
          </div>

          <div className="card-actions mt-4 justify-end">
            <a href="https://your-deployed-app.com" target="_blank" rel="noopener noreferrer">
              <button className="btn btn-primary">Visit Live Site</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentPage;

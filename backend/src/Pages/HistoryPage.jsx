import React, { useState } from 'react';

const dummyHistory = [
  {
    id: 'v1.3',
    message: 'Refactored Deployment UI',
    timestamp: '2025-07-06 17:30',
    diff: `- <button>Deploy</button>\n+ <button className="btn btn-primary">Deploy</button>`
  },
  {
    id: 'v1.2',
    message: 'Added DeploymentPage',
    timestamp: '2025-07-06 16:00',
    diff: `+ New file: DeploymentPage.jsx`
  },
  {
    id: 'v1.1',
    message: 'Initial Code Editor UI',
    timestamp: '2025-07-05 14:45',
    diff: `+ App.jsx\n+ Header.jsx\n+ Sidebar.jsx`
  },
];

const HistoryPage = () => {
  const [openDiffs, setOpenDiffs] = useState({});

  const toggleDiff = (id) => {
    setOpenDiffs((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">🕒 Version History</h2>

      <div className="space-y-4">
        {dummyHistory.map((entry) => (
          <div key={entry.id} className="card bg-base-100 shadow-md border border-base-200">
            <div className="card-body">
              <h3 className="text-lg font-semibold">{entry.id} — {entry.message}</h3>
              <p className="text-sm text-gray-500">{entry.timestamp}</p>
              
              <div className="card-actions justify-end mt-4">
                <button 
                  className="btn btn-sm btn-outline"
                  onClick={() => toggleDiff(entry.id)}
                >
                  {openDiffs[entry.id] ? "Hide Diff" : "View Diff"}
                </button>
              </div>

              {openDiffs[entry.id] && (
                <div className="mt-4 bg-base-200 p-4 rounded overflow-auto font-mono text-sm whitespace-pre-wrap border border-dashed border-gray-400">
                  <pre>{entry.diff}</pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faUserShield,
  faCode,
  faExclamationTriangle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const vulnerabilitiesList = [
  { id: 'xss-reflected', label: 'XSS (Reflected)', icon: faCode, description: 'Reflected script attacks through user input.' },
  { id: 'xss-stored', label: 'XSS (Stored)', icon: faCode, description: 'Stored malicious scripts in database.' },
  { id: 'sql-injection', label: 'SQL Injection', icon: faExclamationTriangle, description: 'Injecting SQL to manipulate database.' },
  { id: 'csrf', label: 'CSRF', icon: faUserShield, description: 'Cross-site request forgery attack.' },
  { id: 'command-injection', label: 'Command Injection', icon: faSearch, description: 'Injecting OS commands into input.' },
  { id: 'directory-traversal', label: 'Directory Traversal', icon: faShieldAlt, description: 'Accessing sensitive files via path manipulation.' },
  { id: 'local-file-inclusion', label: 'Local File Inclusion', icon: faShieldAlt, description: 'Loading local server files.' },
  { id: 'remote-file-inclusion', label: 'Remote File Inclusion', icon: faShieldAlt, description: 'Loading remote malicious files.' }
];

const AttaquesPage = () => {
  const { state } = useLocation();
  const { url } = state || {};

  const [selectedVulnerabilities, setSelectedVulnerabilities] = useState([]);
  const [scanIntensity, setScanIntensity] = useState("fast");
  const allIds = vulnerabilitiesList.map(v => v.id);

  const toggleVulnerability = (id) => {
    if (id === 'all') {
      setSelectedVulnerabilities(
        selectedVulnerabilities.length === vulnerabilitiesList.length ? [] : allIds
      );
    } else {
      setSelectedVulnerabilities(prev =>
        prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
      );
    }
  };

  const isChecked = (id) => {
    if (id === 'all') return selectedVulnerabilities.length === vulnerabilitiesList.length;
    return selectedVulnerabilities.includes(id);
  };

  const handleScan = () => {
    if (selectedVulnerabilities.length === 0) {
      alert("Please select at least one vulnerability.");
    } else {
      alert(`Scanning: ${selectedVulnerabilities.join(", ")} on ${url} with ${scanIntensity} intensity.`);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-800 py-10"
      style={{ backgroundImage: "url('/pexels-photo-3861976.webp')" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h1
          className="text-3xl font-bold text-center mb-8 text-slate-50"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
        >
          Vulnerability Scan Options
        </h1>

        {url && (
          <div className="text-center mb-6">
            <h2
              className="text-xl text-slate-100"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
            >
              Target URL: <span className="text-cyan-400">"&nbsp;</span>
              <span className="font-semibold text-white">{url}</span>
              <span className="text-cyan-400">&nbsp;"</span>
            </h2>

          </div>
        )}

        <div className="mb-6 flex justify-end">
          <label className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked('all')}
              onChange={() => toggleVulnerability('all')}
              className="accent-cyan-400 w-5 h-5"
            />
            <span className="text-sm font-medium text-slate-100">Select All</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {vulnerabilitiesList.map(({ id, label, icon, description }) => (
            <label
              key={id}
              className={`flex items-start space-x-4 p-4 border rounded-lg shadow-sm bg-white hover:shadow-md cursor-pointer transition-all ${
                selectedVulnerabilities.includes(id) ? 'border-cyan-400 ring-1 ring-cyan-400' : 'border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked(id)}
                onChange={() => toggleVulnerability(id)}
                className="accent-cyan-400 mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <FontAwesomeIcon icon={icon} className="text-cyan-400" />
                  <span className="font-semibold text-gray-800">{label}</span>
                </div>
                <p className="text-sm text-slate-600">{description}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="mb-10">
          <h3
            className="text-xl font-medium mb-4 text-slate-100"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
          >
            Scan Intensity
          </h3>
          <div className="space-x-4">
            {["fast", "medium", "thorough"].map(level => (
              <label key={level} className="inline-flex items-center space-x-1">
                <input
                  type="radio"
                  name="scanIntensity"
                  value={level}
                  checked={scanIntensity === level}
                  onChange={(e) => setScanIntensity(e.target.value)}
                  className="accent-cyan-400"
                />
                <span className="capitalize text-slate-100">{level} scan</span>
              </label>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleScan}
            className="bg-cyan-400 hover:bg-cyan-400 text-white py-3 px-6 rounded-lg shadow-md transition"
          >
            Start Scan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttaquesPage;

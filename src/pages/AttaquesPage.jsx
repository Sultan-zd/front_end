import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faUserShield,
  faCode,
  faExclamationTriangle,
  faSearch,
  faCheckSquare
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
      style={{ backgroundImage: "url('/sercurite2.avif')" }}

    >

      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-8">Vulnerability Scan Options</h1>
        
        {url && (
          <div className="text-center mb-6">
            <h2 className="text-xl">Target URL: <span className="font-semibold text-blue-700">{url}</span></h2>
          </div>
        )}

        {/* Checkbox: ALL */}
        <div className="mb-6 flex justify-end">
          <label className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked('all')}
              onChange={() => toggleVulnerability('all')}
              className="accent-blue-700 w-5 h-5"
            />
            <span className="text-sm font-medium">Select All</span>
          </label>
        </div>

        {/* Vulnerabilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {vulnerabilitiesList.map(({ id, label, icon, description }) => (
            <label
              key={id}
              className={`flex items-start space-x-4 p-4 border rounded-lg shadow-sm bg-white hover:shadow-md cursor-pointer transition-all ${
                selectedVulnerabilities.includes(id) ? 'border-blue-700 ring-1 ring-blue-700' : 'border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked(id)}
                onChange={() => toggleVulnerability(id)}
                className="accent-blue-700 mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <FontAwesomeIcon icon={icon} className="text-blue-700" />
                  <span className="font-semibold">{label}</span>
                </div>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Scan Intensity */}
        <div className="mb-10">
          <h3 className="text-xl font-medium mb-4">Scan Intensity</h3>
          <div className="space-y-2">
            {["fast", "medium", "thorough"].map(level => (
              <label key={level} className="inline-flex items-center space-x-3">
                <input
                  type="radio"
                  name="scanIntensity"
                  value={level}
                  checked={scanIntensity === level}
                  onChange={(e) => setScanIntensity(e.target.value)}
                  className="accent-blue-700"
                />
                <span className="capitalize text-gray-700">{level} scan</span>
              </label>
            ))}
          </div>
        </div>

        {/* Scan Button */}
        <div className="text-center">
          <button
            onClick={handleScan}
            className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg shadow-md transition"
          >
            Start Scan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttaquesPage;

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
  {
    id: 'xss',
    label: 'XSS (Reflected + Stored)',
    icon: faCode,
    description: 'Cross-site scripting attacks: reflected and stored.',
  },
  {
    id: 'sql-injection',
    label: 'SQL Injection',
    icon: faExclamationTriangle,
    description: 'Injecting SQL to manipulate database.',
  },
  {
    id: 'html-injection',
    label: 'HTML Injection',
    icon: faCode,
    description: 'Injecting HTML into pages viewed by other users.',
  },
  {
    id: 'web cache poisoning',
    label: 'Web Cache Poisoning',
    icon: faExclamationTriangle,
    description: 'Serving malicious content from cache to users.',
  },
  {
    id: 'web cache deception',
    label: 'Web Cache Deception',
    icon: faExclamationTriangle,
    description: 'Tricking the cache into storing sensitive data.',
  },
  {
    id: 'brute-force',
    label: 'Brute Force Test',
    icon: faUserShield,
    description: 'Testing login forms with multiple password attempts.',
  },
  {
    id: 'lfi',
    label: 'Local File Inclusion',
    icon: faExclamationTriangle,
    description: 'Exploiting vulnerable file inclusion functionality to access sensitive files on the server.',
  }
  
];

const AttaquesPage = () => {
  const { state } = useLocation();
  const { url } = state || {};

  const [selectedVulnerabilities, setSelectedVulnerabilities] = useState([]);
  const [scanIntensity, setScanIntensity] = useState("fast");
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);

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

  const handleScan = async () => {
    if (selectedVulnerabilities.length === 0) {
      alert("Please select at least one vulnerability.");
      return;
    }

    setLoading(true);
    const results = [];

    try {
      for (const vuln of selectedVulnerabilities) {
        let endpoint = null;

        if (vuln === 'xss') endpoint = 'scan-xss';
        else if (vuln === 'html-injection') endpoint = 'scan-html';
        else if (vuln === 'brute-force') endpoint = 'scan-brute';
        else if (vuln === 'web cache poisoning') endpoint = 'scan-poisoning';
        else if (vuln === 'web cache deception') endpoint = 'scan-deception';
        else if (vuln === 'sql-injection') endpoint = 'scan-sqli';
        else if (vuln === 'lfi') endpoint = 'scan-lfi';

        if (endpoint) {
          const response = await fetch(`http://192.168.1.11:5000/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
          });

          if (response.ok) {
            const data = await response.json();
            results.push(data);
          } else {
            results.push({
              vulnerability: vuln,
              result: '❌ Erreur lors du scan',
              risk: 'Inconnu',
              recommendation: 'Veuillez vérifier le serveur ou les paramètres.',
              description: 'Erreur de communication avec le serveur.',
            });
          }
        }
      }

      setReportData(results);
    } catch (error) {
      console.error('Erreur de requête:', error);
      alert('❌ Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-800 py-10" style={{ backgroundImage: "url('/pexels-photo-3861976.webp')" }}>
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-50" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}>
          Vulnerability Scan Options
        </h1>

        {url && (
          <div className="text-center mb-6">
            <h2 className="text-xl text-slate-100" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
              Target URL: <span className="text-cyan-400">"</span>
              <span className="font-semibold text-white">{url}</span>
              <span className="text-cyan-400">"</span>
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
              className={`flex items-start space-x-4 p-4 border rounded-lg shadow-sm bg-white hover:shadow-md cursor-pointer transition-all ${selectedVulnerabilities.includes(id) ? 'border-cyan-400 ring-1 ring-cyan-400' : 'border-gray-300'}`}
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
          <h3 className="text-xl font-medium mb-4 text-slate-100" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
            Scan Intensity
          </h3>
          <div className="space-x-4">
            {['fast', 'medium', 'thorough'].map(level => (
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
            className="bg-cyan-400 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg shadow-md transition"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-3">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Scanning...</span>
              </div>
            ) : (
              'Start Scan'
            )}
          </button>
        </div>

        {/* Rapport détaillé */}
        {reportData.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Rapport de Sécurité</h3>
            <div className="space-y-6">
              {reportData.map((entry, idx) => (
                <div key={idx} className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-cyan-500">
                  <h4 className="text-xl font-bold mb-2 text-gray-800">🔍 Vulnérabilité : {entry.vulnerability}</h4>
                  <p className="text-gray-700 mb-1"><strong>Résultat :</strong> {entry.result}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttaquesPage;

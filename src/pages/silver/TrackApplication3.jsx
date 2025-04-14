import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrackApplication3 = () => {
  const navigate = useNavigate();
  const handleBuyNowClick = () => {
    navigate('/check-status');
  };

  const [requestId, setRequestId] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  // Fonction pour simuler la récupération du statut de la demande
  const checkStatus = () => {
    if (!requestId) {
      setError('Please enter your request ID.');
      return;
    }

    // Logique fictive pour déterminer le statut de la demande
    // Remplace cette partie par une requête API réelle si nécessaire
    if (requestId === '12345') {
      setStatus('In progress');
      setError(null);
    } else if (requestId === '67890') {
      setStatus('Approved');
      setError(null);
    } else {
      setStatus(null);
      setError('Request ID not found. Please check your ID and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d1d1d1] to-[#a1a1a1] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-4/5 max-w-lg border-[3px] border-[#b0b0b0]">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8c8c8c] to-[#a1a1a1] mb-6">
            Track Your Application
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Enter your application ID to check the status of your request.
          </p>
        </div>

        {/* Formulaire pour entrer l'ID de demande */}
        <div className="mb-6">
          <input
            type="text"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
            placeholder="Enter Request ID"
            className="w-full p-3 border-2 border-[#b0b0b0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d1d1d1] transition duration-300"
          />
        </div>

        {/* Bouton pour vérifier le statut */}
        <div className="flex justify-center mb-6">
          <button
            className="bg-[#d1d1d1] text-black font-semibold text-lg px-6 py-3 rounded-lg shadow-md hover:bg-[#a1a1a1] transition duration-300"
            onClick={handleBuyNowClick}
          >
            Check Status
          </button>
        </div>

        {/* Affichage des erreurs ou du statut */}
        {error && (
          <div className="bg-red-200 text-red-800 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {status && (
          <div className="bg-green-200 text-green-800 p-3 rounded-lg mb-4">
            <strong>Status: </strong>{status}
          </div>
        )}

        {/* Lien de retour à la page d'accueil */}
        <div className="flex justify-center">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gray-800 text-white font-semibold text-lg px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackApplication3;

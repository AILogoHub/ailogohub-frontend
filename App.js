import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateLogo = async () => {
    setLoading(true);
    setImageUrl('');
    const res = await fetch('https://your-backend-url.com/generate-logo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (data?.prediction?.output) {
      setImageUrl(data.prediction.output[0]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Logo Generator</h1>
      <input
        type="text"
        placeholder="Enter a logo idea (e.g., tech + leaf)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md mb-4 text-lg"
      />
      <button
        onClick={generateLogo}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg font-semibold transition duration-300"
      >
        Generate Logo
      </button>
      {loading && <p className="mt-6 text-gray-600">Generating logo...</p>}
      {imageUrl && <img src={imageUrl} alt="AI Logo" className="mt-6 rounded shadow-md w-72" />}
    </div>
  );
}

export default App;
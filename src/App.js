import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import MapComponent from './components/MapComponent';
import FilterSidebar from './components/FilterSidebar';
import HeroSection from './components/HeroSection';
import MetricsPanel from './components/MetricsPanel';
import Footer from './components/Footer';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const [data, setData] = useState(null); // State to store data from Flask
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [endpoint, setEndpoint] = useState('bhuvan-map'); // State to track current endpoint
  const mapRef = useRef(); // Reference to the Leaflet map instance

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://127.0.0.1:5000/${endpoint}`);
      setData(response.data);
    } catch (err) {
      setError('Error fetching data from the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  // Function to handle map updates
  const handleMapUpdate = (newLocation) => {
    if (mapRef.current) {
      mapRef.current.setView(newLocation, 12); // Update map's center and zoom level
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <div className="relative z-0">
          <HeroSection />
        </div>

        {/* Button Group for Switching Endpoints */}
        <div className="flex justify-center gap-4 my-4">
          <button
            className={`px-4 py-2 rounded ${endpoint === 'energy-demand' ? 'bg-gray-700' : 'bg-gray-600'}`}
            onClick={() => setEndpoint('energy-demand')}
          >
            Energy Demand
          </button>
          <button
            className={`px-4 py-2 rounded ${endpoint === 'climate-data' ? 'bg-gray-700' : 'bg-gray-600'}`}
            onClick={() => setEndpoint('climate-data')}
          >
            Climate Data
          </button>
          <button
            className={`px-4 py-2 rounded ${endpoint === 'weather' ? 'bg-gray-700' : 'bg-gray-600'}`}
            onClick={() => setEndpoint('weather')}
          >
            Weather
          </button>
        </div>

        {/* Main Content */}
        <div className="container mx-auto grid grid-cols-12 gap-6 mt-6 p-4">
          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-3 bg-gray-800 text-gray-300 shadow-lg rounded-lg p-4">
            <FilterSidebar handleMapUpdate={handleMapUpdate} />
          </aside>

          {/* Map Component */}
          <main className="col-span-12 lg:col-span-6 bg-gray-800 text-gray-300 shadow-lg rounded-lg overflow-hidden">
            {loading ? (
              <div className="text-center p-4">Loading...</div>
            ) : error ? (
              <div className="text-red-600 text-center">{error}</div>
            ) : (
              <MapComponent ref={mapRef} data={data} />
            )}
          </main>

          {/* Metrics Panel */}
          <aside className="col-span-12 lg:col-span-3 bg-gray-800 text-gray-300 shadow-lg rounded-lg p-4">
            <MetricsPanel />
          </aside>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

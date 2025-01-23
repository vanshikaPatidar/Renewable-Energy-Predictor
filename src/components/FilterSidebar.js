import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // For API calls
import { setFilters } from '../actions/mapActions';

const FilterSidebar = ({ handleMapUpdate }) => { // Accept handleMapUpdate as a prop
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.map.filters);

  const [searchLocation, setSearchLocation] = useState('');
  const [error, setError] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchLocation(e.target.value);
  };

  const handleSearchSubmit = async () => {
    if (!searchLocation) {
      setError('Please enter a location.');
      return;
    }

    try {
      setError(null);

      // Use OpenCage Geocoding API
      const API_KEY = '6f8c07f5860c4cc58db6e1b1bc5e7ca5'; // Replace with your API key
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          searchLocation
        )}&key=${API_KEY}&countrycode=in`
      );

      const results = response.data.results;
      if (results.length === 0) {
        setError('Location not found.');
        return;
      }

      // Get the first result's latitude and longitude
      const { lat, lng } = results[0].geometry;

      // Update the map with the new location
      handleMapUpdate([lat, lng]);
    } catch (err) {
      setError('An error occurred while searching for the location.');
      console.error(err);
    }
  };

  return (
    <aside className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Filters</h2>

      {/* Search Bar */}
      {/* <div className="space-y-2">
        <input
          type="text"
          placeholder="Search for a location"
          value={searchLocation}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
        <button
          onClick={handleSearchSubmit}
          className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Search Location
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </div> */}

      {/* Climate Resilience Filter */}
      <div>
        <label
          htmlFor="resilience"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Climate Resilience
        </label>
        <select
          id="resilience"
          name="resilience"
          value={filters.resilience}
          onChange={handleFilterChange}
          className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        >
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Resource Availability Filter */}
      <div>
        <label
          htmlFor="resource"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Resource Availability
        </label>
        <select
          id="resource"
          name="resource"
          value={filters.resource}
          onChange={handleFilterChange}
          className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        >
          <option value="all">All</option>
          <option value="solar">Solar</option>
          <option value="wind">Wind</option>
          <option value="hydro">Hydro</option>
        </select>
      </div>

      {/* Energy Demand Proximity Filter */}
      <div>
        <label
          htmlFor="demand"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Energy Demand Proximity
        </label>
        <select
          id="demand"
          name="demand"
          value={filters.demand}
          onChange={handleFilterChange}
          className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        >
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;

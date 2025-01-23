import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from math import radians, sin, cos, sqrt, atan2
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

# Base URLs for APIs
NASA_POWER_API_URL = "https://power.larc.nasa.gov/api/temporal/daily/point"
NIWE_API_URL = "https://niwe.res.in"
IMD_API_URL = "https://mausam.imd.gov.in"
BHUWAN_API_URL = "https://bhuvan.nrsc.gov.in/api"
PROTECTED_PLANET_API_URL = "https://www.protectedplanet.net"
COPERNICUS_API_URL = "https://land.copernicus.eu"
CEA_API_URL = "https://cea.nic.in/api/instcap_allindia_res.php"
VIIRS_API_URL = "https://earthdata.nasa.gov"


MODEL_PATH = "models/solar_suitability_model.pkl"
model = joblib.load(MODEL_PATH)

@app.route('/predict', methods=['POST'])
def predict():
    # Expect JSON input with required features
    data = request.get_json()
    features = ['Latitude', 'Longitude', 'Annual', 'Summer_Avg', 'Winter_Avg']
    
    try:
        input_data = pd.DataFrame([data], columns=features)
        prediction = model.predict(input_data)
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
# Utility function for API requests
def fetch_api_data(url, params=None):
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return {"error": str(e)}

# Utility function to calculate the distance between two points (Haversine formula)
def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Earth's radius in kilometers
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

# API routes
@app.route('/climate-data', methods=['GET'])
def get_climate_data():
    location = request.args.get('location', '28.6139,77.2090')  # Default: New Delhi
    lat, lon = location.split(',')
    params = {
        "latitude": lat,
        "longitude": lon,
        "parameters": "ALLSKY_SFC_SW_DWN,T2M,WS10M",
        "community": "re",
        "start": "20250101",
        "end": "20250102",
        "format": "json",
    }
    data = fetch_api_data(NASA_POWER_API_URL, params)
    return jsonify(data)

def fetch_geocode(address):
    api_key = "6f8c07f5860c4cc58db6e1b1bc5e7ca5"
    url = f"https://api.opencagedata.com/geocode/v1/json?q={address}&key={api_key}"
    return fetch_api_data(url)

@app.route('/geocode', methods=['GET'])
def geocode():
    address = request.args.get('address')
    if not address:
        return jsonify({"error": "Address is required"}), 400

    geocode_data = fetch_geocode(address)
    if "error" in geocode_data:
        return jsonify({"error": geocode_data["error"]}), 500

    if geocode_data["results"]:
        return jsonify(geocode_data["results"][0]["geometry"])
    else:
        return jsonify({"error": "City not found"}), 404



@app.route('/distance-matrix', methods=['POST'])
def get_distance_matrix():
    """Generate a distance matrix for a list of locations."""
    locations = request.json.get('locations', [])
    if not locations or len(locations) < 2:
        return jsonify({"error": "At least two locations are required."}), 400

    matrix = []
    for loc1 in locations:
        row = []
        for loc2 in locations:
            dist = calculate_distance(loc1['lat'], loc1['lng'], loc2['lat'], loc2['lng'])
            row.append(dist)
        matrix.append(row)

    return jsonify({"matrix": matrix})

@app.route('/bhuvan-map', methods=['GET', 'POST'])
def generate_bhuvan_map_data():
    """Fetch or generate spatial mapping data."""
    if request.method == 'POST':
        user_data = request.json.get('user_data', [])
        if user_data:
            return jsonify(user_data)

    # Default mock data for GET requests
    mock_data = [
        {"lat": 28.6139, "lng": 77.2090, "name": "New Delhi"},
        {"lat": 28.7041, "lng": 77.1025, "name": "Delhi"},
        {"lat": 27.1767, "lng": 78.0081, "name": "Agra"},
    ]
    return jsonify(mock_data)


@app.route('/all-data', methods=['GET'])
def get_all_data():
    location = request.args.get('location', '28.6139,77.2090')  # Default: New Delhi
    lat, lon = location.split(',')

    # Fetch data from multiple APIs concurrently
    climate_data = fetch_api_data(
        NASA_POWER_API_URL,
        {
            "latitude": lat,
            "longitude": lon,
            "parameters": "ALLSKY_SFC_SW_DWN,T2M,WS10M",
            "community": "re",
            "start": "20250101",
            "end": "20250102",
            "format": "json",
        },
    )
    wind_data = fetch_api_data(f"{NIWE_API_URL}/api/wind?latitude={lat}&longitude={lon}")
    protected_areas = fetch_api_data(f"{PROTECTED_PLANET_API_URL}/api/protected-areas")

    return jsonify(
        {
            "climate_data": climate_data,
            "wind_data": wind_data,
            "protected_areas": protected_areas,
        }
    )

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

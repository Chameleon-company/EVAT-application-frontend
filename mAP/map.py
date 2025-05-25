from flask import Flask, render_template, jsonify, request
import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
from geopy.distance import geodesic
import os
from dotenv import load_dotenv
import requests
import polyline

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

app = Flask(__name__)

# Load station data once
df = pd.read_csv('C:/Users/mobas/OneDrive/Desktop/mobassher nomani/mAP/Data/new.csv')
gdf = gpd.GeoDataFrame(
    df,
    geometry=[Point(xy) for xy in zip(df['longitude'], df['latitude'])],
    crs='EPSG:4326'
)
gdf['search_label'] = (
    gdf['operator'].astype(str) + " | " +
    gdf['connection_type'].astype(str) + " | " +
    gdf['charging_points'].astype(str) + " | " +
    gdf['Address'].astype(str)
)

@app.route('/operators')
def get_operators():
    query = request.args.get('query', '').lower()
    matches = gdf['operator'].dropna().unique()
    suggestions = sorted([op for op in matches if query in op.lower()])
    return jsonify(suggestions)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/stations')
def stations():
    operator = request.args.get('operator', 'all').lower()
    gdf['lat'] = gdf.geometry.y
    gdf['lon'] = gdf.geometry.x
    if operator != 'all':
        filtered = gdf[gdf['operator'].str.lower().str.contains(operator)]
    else:
        filtered = gdf
    return jsonify(filtered[['operator', 'Address', 'charging_points', 'connection_type', 'lat', 'lon']].to_dict(orient='records'))

@app.route('/nearest-station/<float:lat>/<float:lon>')
def nearest_station(lat, lon):
    """Find the nearest charging station to given coordinates"""
    gdf['distance'] = gdf['geometry'].apply(lambda pt: geodesic((lat, lon), (pt.y, pt.x)).km)
    nearest = gdf.sort_values(by='distance').iloc[0]
    return jsonify({
        'station': {
            'operator': nearest['operator'],
            'address': nearest['Address'],
            'lat': nearest.geometry.y,
            'lng': nearest.geometry.x
        }
    })

@app.route('/route/<path:start_lat>/<path:start_lng>/<path:end_lat>/<path:end_lng>')
def get_route(start_lat, start_lng, end_lat, end_lng):
    try:
        print(f"Requesting route from ({start_lat},{start_lng}) to ({end_lat},{end_lng})")
        url = f"https://maps.googleapis.com/maps/api/directions/json?origin={start_lat},{start_lng}&destination={end_lat},{end_lng}&key={GOOGLE_API_KEY}"
        print(f"API URL: {url}")
        
        response = requests.get(url)
        data = response.json()
        print("Google API response:", data)
        
        if data['status'] != 'OK':
            print("Error from Google API:", data.get('error_message', 'No error message'))
            return jsonify({
                'status': 'error',
                'message': data.get('error_message', 'Directions request failed'),
                'api_status': data['status']
            }), 400
        
        overview_polyline = data['routes'][0]['overview_polyline']['points']
        decoded_path = polyline.decode(overview_polyline)
        coordinates = [[point[0], point[1]] for point in decoded_path]
        
        return jsonify({
            'status': 'success',
            'overview_polyline': overview_polyline,
            'coordinates': coordinates,
            'summary': data['routes'][0]['summary'],
            'distance': data['routes'][0]['legs'][0]['distance']['text'],
            'duration': data['routes'][0]['legs'][0]['duration']['text']
        })
    except Exception as e:
        print("Error in route endpoint:", str(e))
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
import os
import pandas as pd
import geopandas as gpd
import folium
import openrouteservice
from shapely.geometry import Point
from geopy.distance import geodesic
from streamlit_folium import st_folium
import streamlit as st
import geocoder
from dotenv import load_dotenv
from folium.plugins import Search

# --- Load environment variables ---
load_dotenv()

# --- Streamlit Setup ---
st.set_page_config(layout="wide")
st.title("🔌 EV Charging Station Finder (with Route & Search)")

# --- Load Data ---
df = pd.read_csv('C:/Users/mobas/OneDrive/Desktop/mobassher nomani/mAP/Data/new.csv')
gdf = gpd.GeoDataFrame(
    df,
    geometry=[Point(xy) for xy in zip(df['longitude'], df['latitude'])],
    crs='EPSG:4326'
)

# --- Prepare Search Field ---
gdf['search_label'] = (
    gdf['operator'].astype(str) + " | " +
    gdf['connection_type'].astype(str) + " | " +
    gdf['charging_points'].astype(str) + " | " +
    gdf['Address'].astype(str)
)

# --- Detect User Location ---
g = geocoder.ip('me')
if g.ok and g.latlng:
    current_coords = (g.latlng[0], g.latlng[1])
    st.sidebar.success(f"📍 Detected Location: {current_coords}")
else:
    st.sidebar.warning("⚠️ Could not detect your location. Using Melbourne CBD as default.")
    current_coords = (-37.8136, 144.9631)

# --- User Filter Options ---
st.sidebar.title("🔍 Filter Options")
unique_operators = sorted(gdf['operator'].dropna().unique())
operator_filter = st.sidebar.selectbox("Filter by Operator", unique_operators, index=0)
max_distance = st.sidebar.slider("Max Distance (km)", 10, 300, 100)

# --- Filter Data ---
filtered = gdf[gdf['operator'].str.contains(operator_filter, case=False)].copy()
filtered['distance_km'] = filtered['geometry'].apply(lambda pt: geodesic(current_coords, (pt.y, pt.x)).km)
filtered = filtered[filtered['distance_km'] <= max_distance]

# --- Initialize Map ---
aus_map = folium.Map(location=current_coords, zoom_start=8)

# --- GeoJSON Layer for Search ---
geojson_layer = folium.GeoJson(
    gdf[['search_label', 'operator', 'charging_points', 'connection_type', 'Address', 'geometry']],
    name="Charging Stations",
    tooltip=folium.GeoJsonTooltip(fields=['operator', 'charging_points', 'connection_type', 'Address']),
    popup=folium.GeoJsonPopup(fields=['operator', 'charging_points', 'connection_type', 'Address']),
)
geojson_layer.add_to(aus_map)

Search(
    layer=geojson_layer,
    search_label='search_label',
    placeholder='Search operator/type...',
    collapsed=False
).add_to(aus_map)

# --- Add Station Markers ---
for _, row in filtered.iterrows():
    folium.Marker(
        location=[row.geometry.y, row.geometry.x],
        popup=row['search_label'],
        tooltip=row['operator'],
        icon=folium.Icon(color='green', icon='flash', prefix='fa')
    ).add_to(aus_map)

# --- Draw Route to Closest Station ---
if not filtered.empty:
    target = filtered.sort_values(by='distance_km').iloc[0]
    target_coords = (target.geometry.y, target.geometry.x)

    try:
        client = openrouteservice.Client(key=os.getenv("ORS_API_KEY"))
        route = client.directions(
            coordinates=[(current_coords[1], current_coords[0]), (target_coords[1], target_coords[0])],
            profile='driving-car',
            format='geojson'
        )
        folium.GeoJson(route, name='Route').add_to(aus_map)

        folium.Marker(
            location=current_coords,
            popup='Your Location',
            icon=folium.Icon(color='blue')
        ).add_to(aus_map)

        folium.Marker(
            location=target_coords,
            popup='Nearest Station',
            icon=folium.Icon(color='red')
        ).add_to(aus_map)
    except Exception as e:
        st.error("❌ Failed to retrieve route. Check API key or internet.")
        st.exception(e)

folium.LayerControl().add_to(aus_map)

# --- Display Map ---
st_folium(aus_map, width=1200, height=700)

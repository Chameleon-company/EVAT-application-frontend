#!/usr/bin/env python
# coding: utf-8

# In[1]:


from geopy.geocoders import Nominatim
import pandas as pd
import geopandas as gpd
import folium
from shapely.geometry import Point
import openrouteservice
import geocoder


# In[2]:


df = pd.read_csv('C:/Users/mobas/OneDrive/Desktop/EVAT.charging_stations.csv')


# In[3]:


df


# In[4]:


df = df[['cost', 'charging_points', 'pay_at_location', 'is_operational', 'latitude','longitude','operator', 'connection_type']]


# In[5]:


df


# In[6]:


geolocator = Nominatim(user_agent="skywalker1254")


# In[7]:


def reverse_geocode(lat, lon):
    for attempt in range(3):  # Retry up to 3 times
        try:
            location = geolocator.reverse((lat, lon), exactly_one=True)
            return location.address if location else "Address not found"
        except GeopyError as e:
            print(f"Attempt {attempt + 1}: {e}")
            time.sleep(2)  
    return "Error: Unable to fetch address"


# In[8]:


subset_df = df[['cost', 'charging_points', 'pay_at_location', 'is_operational', 'latitude','longitude','operator', 'connection_type']].copy()
subset_df['Address'] = subset_df.apply(lambda row: reverse_geocode(row['latitude'], row['longitude']), axis=1)


# In[9]:


subset_df


# In[22]:


subset_df.to_csv("C:/Users/mobas/OneDrive/Desktop/new.csv", index= False)


# In[24]:


df1 = pd.read_csv('C:/Users/mobas/OneDrive/Desktop/iMAGE/new.csv')


# In[26]:


df1


# In[28]:


map = df1[['charging_points', 'operator', 'connection_type', 'Address','latitude', 'longitude']]


# In[30]:


map


# In[32]:


list= map[['Address','charging_points', 'operator', 'connection_type', 'latitude', 'longitude']].values.tolist()


# In[34]:


list


# In[36]:


aus_map = folium.Map(location=[-41.23530922,146.4083866])
fg=folium.FeatureGroup(name='Ev_map')
for i in list:
    fg.add_child(folium.Marker(location=[i[4],i[5]], popup=[i[0],i[1],i[2],i[3]], icon=folium.Icon(color='green')))
aus_map.add_child(fg)


# In[38]:


aus_map.save('C:/Users/mobas/OneDrive/Desktop/Aus_map.html')


# In[40]:


current_location = geocoder.ip('me')

if current_location.ok:
    current_coords = (current_location.latlng[0], current_location.latlng[1])
    print(f"Current Location: {current_coords}")
else:
    print("Unable to fetch current location.")
    current_coords = (0, 0)  


# In[42]:


charger_gdf = gpd.GeoDataFrame(
    map,
    geometry=gpd.points_from_xy(map.longitude, map.latitude),
    crs="EPSG:3857"
)


# In[44]:


current_point = Point(current_coords[1], current_coords[0])  # Point(lon, lat)
charger_gdf['distance'] = charger_gdf.geometry.distance(current_point)
nearest_charger = charger_gdf.loc[charger_gdf['distance'].idxmin()]
print(f"Nearest Charger: {nearest_charger['Address']} at {nearest_charger.geometry}")


# In[46]:


api_key = "5b3ce3597851110001cf62483ba95147bc4d4f9ba6e44d04127c4d06"  
client = openrouteservice.Client(key=api_key)


# In[48]:


coords = [(current_coords[1], current_coords[0]), 
          (nearest_charger.geometry.x, nearest_charger.geometry.y)]


# In[50]:


route = client.directions(coords, profile='driving-car', format='geojson')
m = folium.Map(location=current_coords, zoom_start=12)


# In[52]:


folium.Marker(
    location=current_coords,
    popup="Current Location",
    icon=folium.Icon(color='blue')
).add_to(m)
folium.Marker(
    location=(nearest_charger.geometry.y, nearest_charger.geometry.x),
    popup=nearest_charger['Address'],
    icon=folium.Icon(color='green')
).add_to(m)


# In[54]:


folium.GeoJson(route, name='Route').add_to(m)
m


# In[ ]:





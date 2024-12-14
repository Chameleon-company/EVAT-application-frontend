import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';


const TripPlannerScreen = () => {
  // State for start and finish locations
  const [start, setStart] = useState<{ latitude: number; longitude: number } | null>(null);
  const [finish, setFinish] = useState<{ latitude: number; longitude: number } | null>(null);


  // State for toggling details and storing calculated distance and ETA
  const [showDetails, setShowDetails] = useState(false);
  const [eta, setEta] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [weather, setWeather] = useState<string | null>(null);
  // State for storing EV station data fetched from the server
  const [evStations, setEvStations] = useState<any[]>([]);

  // Centralized state to manage active tab, map region, user location, and EV stations
  const [state, setState] = useState<{
    active: string;
    region: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    };
    userLocation: { latitude: number; longitude: number } | null;
    evStations: any[];
  }>({
    active: '2',
    region: {
      latitude: -37.8136,
      longitude: 144.9631,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    userLocation: null,
    evStations: [],
  });

  // Fetch location and EV station data on component mount
  useEffect(() => {
    // Request location permission on Android
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show your position on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation(); // Fetch location if permission is granted
        } else {
          console.log('Location permission denied');
        }
      } else {
        getCurrentLocation(); // iOS permissions
      }
    };

    // Get the current location of the user
    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setState(prevState => ({
            ...prevState,
            userLocation: { latitude, longitude },
            region: {
              ...prevState.region,
              latitude,
              longitude,
            },
          }));
        fetchWeather(latitude, longitude);
        },
        error => console.log('Error:', error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    // Fetch EV stations from the backend
    const fetchEVStations = async () => {
      try {
        const response = await axios.get('http://54.206.74.135:5000/stations'); // SWAGGER API IS HERE
        console.log('Fetched EV Stations:', response.data);
        setEvStations(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching EV stations:', error.message, error.response);
        } else {
          console.error('Error fetching EV stations:', error);
        }
      }
    };

    requestLocationPermission();  // Request permission to access location
    fetchEVStations();  // Fetch EV station data
  }, []);

  // Fetch weather data based on latitude and longitude
  const fetchWeather = async (latitude: number, longitude: number) => {
    const apiKey = '944aca7968627b1147fc40c03091dee3';
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
      const data = await response.json();
      console.log('Weather API response:', data);
      if (data && data.weather && data.weather.length > 0 && data.main) {
        setWeather(`${data.weather[0].description}, ${Math.round(data.main.temp - 273.15)}°C`);
      } else {
        setWeather('Weather data not available');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather('Error fetching weather data');
    }
  };
  // Handle marker press to update finish location and map center
  const handleMarkerPress = (station: any) => {
    setFinish({ latitude: station.latitude, longitude: station.longitude });
    setState(prevState => ({
      ...prevState,
      region: {
        ...prevState.region,
        latitude: station.latitude,
        longitude: station.longitude,
      },
    }));
  };


  // Handle place selection from Google Places autocomplete
  const handlePlaceSelect = (
    data: any,
    details: any,
    setLocation: React.Dispatch<React.SetStateAction<{ latitude: number; longitude: number } | null>>
  ) => {
    const { lat, lng } = details.geometry.location;
    setLocation({ latitude: lat, longitude: lng });

    setState(prevState => ({
      ...prevState,
      region: {
        ...prevState.region,
        latitude: lat,
        longitude: lng,
      },
    }));
  };

  // Calculate distance between start and finish locations
  const calculateDistance = () => {
    if (start && finish) {
      const R = 6371; // Radius of the Earth in km
      const dLat = (finish.latitude - start.latitude) * (Math.PI / 180);
      const dLng = (finish.longitude - start.longitude) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(start.latitude * (Math.PI / 180)) *
        Math.cos(finish.latitude * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return (R * c).toFixed(2); // Distance in km
    }
    return null;
  };

  // Calculate estimated time of arrival (ETA) based on distance
  const calculateEta = (dist: number) => {
    const averageSpeed = 60; // Average speed in km/h
    const time = dist / averageSpeed; // Time in hours
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  // Handle the "Plan Now" button press
  const handlePlanNow = async () => {
    if (start && finish) {
      const calculatedDistance = calculateDistance();
      if (calculatedDistance) {
        setDistance(calculatedDistance);  // Set the calculated distance
        setEta(calculateEta(parseFloat(calculatedDistance))); // Set the ETA
      }
    }
    setShowDetails(true); // Show details
  };

  // Open Google Maps for navigation
  const handleNavigate = () => {
    if (start && finish) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${start.latitude},${start.longitude}&destination=${finish.latitude},${finish.longitude}&travelmode=driving`;
      Linking.openURL(url).catch(() => Alert.alert('Error', 'Failed to open Google Maps.'));
    } else {
      Alert.alert('Error', 'Please select both start and finish locations.');
    }
  };

  // Render the component
  return (
    <View style={styles.container}>
      {/* Map View with region and user location */}
      <MapView
        style={styles.map}
        showsTraffic
        showsUserLocation={true}
        initialRegion={{
          latitude: state.userLocation ? state.userLocation.latitude : -37.8136,
          longitude: state.userLocation ? state.userLocation.longitude : 144.9631,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}
        region={state.region}
      >

        {/* Marker for start and finish location if available */}
        {start && <Marker coordinate={start} title="Start Location" />}
        {finish && <Marker coordinate={finish} title="Finish Location" />}

        {/* Directions between start and finish if both are selected */}
        {start && finish && (
          <MapViewDirections
            origin={start}
            destination={finish}
            apikey="AIzaSyA_XR8GkItXFubYUEQT5DKnQ1YNyu7ptSc"
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={result => {
              setEta(calculateEta(result.distance));
              setDistance(result.distance.toFixed(2));
            }}
          />
        )}

        {/* Markers for EV stations */}
        {evStations.map(station => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            title={station.Operator}
            onPress={() => handleMarkerPress(station)} // Set marker as destination
            anchor={{ x: 0.5, y: 0.40 }}  // Adjust where the marker sits
          >
          <View style={styles.circleMarker}>
            <Icon name="bolt" size={15} color="#00CB3A" />
          </View>
          </Marker>


        ))}
      </MapView>

      {/* Overlay with input fields and buttons */}
      <View style={styles.overlay}>
        <Text style={styles.text}>Trip Planner</Text>

        {/* Google Places Autocomplete for start and finish location */}
        <GooglePlacesAutocomplete
          placeholder="Start Location"
          fetchDetails={true}
          onPress={(data, details = null) => handlePlaceSelect(data, details, setStart)}
          query={{
            key: 'AIzaSyA_XR8GkItXFubYUEQT5DKnQ1YNyu7ptSc',
            language: 'en',
          }}
          styles={{ textInput: styles.input }}
        />
        <GooglePlacesAutocomplete
          placeholder="Finish Location"
          fetchDetails={true}
          onPress={(data, details = null) => handlePlaceSelect(data, details, setFinish)}
          query={{
            key: 'AIzaSyA_XR8GkItXFubYUEQT5DKnQ1YNyu7ptSc',
            language: 'en',
          }}
          styles={{ textInput: styles.input }}
        />

        {/* Plan Now button to calculate and show details */}
        <TouchableOpacity style={styles.button} onPress={handlePlanNow}>
          <Text style={styles.buttonText}>Plan Now</Text>
        </TouchableOpacity>

        {/* Display trip details if available */}
        {showDetails && (
          <View style={styles.details}>
            <View style={styles.infoRow}>
              <Icon name="track-changes" size={20} color="black" />
              <Text style={styles.distance}>Distance: {distance} km</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="access-time" size={20} color="black" />
              <Text style={styles.eta}>ETA: {eta}</Text>
            </View>
            <View style={styles.infoRow}>
                  <Icon name="wb-sunny" size={20} color="black" />
                  <Text style={styles.weather}>
                    Weather: {weather}
                  </Text>
                </View>



            {/* Navigate button to open Google Maps */}
            <TouchableOpacity style={styles.navigateButton} onPress={handleNavigate}>
              <Text style={styles.buttonText}>Navigate</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Overall container for the screen
  container: {
    flex: 1,
  },

  // MapView style
  map: {
    flex: 1,
  },

  // Overlay section for inputs and buttons
  overlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },

  // Text style for the overlay header
  text: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: 'bold',
  },

  // Input field styling
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  details: {
    marginTop: 16,
  },
  distance: {
    fontSize: 18,
    color: 'black',
    marginLeft: 8,
  },
  eta: {
    fontSize: 18,
    color: 'black',
    marginLeft: 8,
  },

  // Styling for each info row in details
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },

  // Weather text styling
  weather: {
    fontSize: 18,
    color: 'black',
    marginLeft: 8,
  },

  // Button styles
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },

  // Styling for the "Navigate" button
  navigateButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },

  // Button text styling
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // EV station marker styling
  circleMarker: {
    padding: 2,
    borderRadius: 100,
    backgroundColor: '#333', // Customize color
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TripPlannerScreen;

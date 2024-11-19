import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import 'react-native-get-random-values';

const TripPlannerScreen = () => {
  const [start, setStart] = useState<{ latitude: number; longitude: number } | null>(null);
  const [finish, setFinish] = useState<{ latitude: number; longitude: number } | null>(null);
  const [region, setRegion] = useState({
    latitude: -37.8136,
    longitude: 144.9631,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [showDetails, setShowDetails] = useState(false);
  const [immersiveView, setImmersiveView] = useState(false);

  const handlePlaceSelect = (data: any, details: any, setLocation: React.Dispatch<React.SetStateAction<{ latitude: number; longitude: number } | null>>) => {
    const { lat, lng } = details.geometry.location;
    setLocation({ latitude: lat, longitude: lng });
    setRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

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
      const distance = R * c; // Distance in km
      return distance.toFixed(2);
    }
    return null;
  };

  const toggleImmersiveView = () => {
    setImmersiveView(!immersiveView);
  };

  const handlePlanNow = () => {
    setShowDetails(true);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {start && <Marker coordinate={start} title="Start Location" />}
        {finish && <Marker coordinate={finish} title="Finish Location" />}
        {start && finish && (
          <MapViewDirections
            origin={start}
            destination={finish}
            apikey="AIzaSyDbfaYzyw__K8paspxDS6c7Pw5VP6q_R48"
            strokeWidth={3}
            strokeColor="hotpink"
          />
        )}
      </MapView>
      <View style={styles.overlay}>
        <Text style={styles.text}>Trip Planner</Text>
        <GooglePlacesAutocomplete
          placeholder="Start Location"
          fetchDetails={true}
          onPress={(data, details = null) => handlePlaceSelect(data, details, setStart)}
          query={{
            key: 'AIzaSyDbfaYzyw__K8paspxDS6c7Pw5VP6q_R48',
            language: 'en',
          }}
          styles={{ textInput: styles.input }}
        />
        <GooglePlacesAutocomplete
          placeholder="Finish Location"
          fetchDetails={true}
          onPress={(data, details = null) => handlePlaceSelect(data, details, setFinish)}
          query={{
            key: 'AIzaSyDbfaYzyw__K8paspxDS6c7Pw5VP6q_R48',
            language: 'en',
          }}
          styles={{ textInput: styles.input }}
        />
        <Button title="Plan Now" onPress={handlePlanNow} />
        {showDetails && (
          <View style={styles.details}>
            {start && finish && (
              <Text style={styles.distance}>
                Distance: {calculateDistance()} km
              </Text>
            )}
            <Button title="Toggle Immersive View" onPress={toggleImmersiveView} />
            {immersiveView && (
              <Text style={styles.immersiveView}>
                Immersive View is enabled! Preview your route in a stunning, multidimensional view.
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.😎',
    padding: 16,
  },
  text: {
    fontSize: 24,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
  details: {
    marginTop: 16,
  },
  distance: {
    fontSize: 18,
    color: 'blue',
  },
  immersiveView: {
    marginTop: 8,
    fontSize: 18,
    color: 'green',
  },
});

export default TripPlannerScreen;

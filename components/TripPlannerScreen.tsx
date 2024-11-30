import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  const [eta, setEta] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

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
      return (R * c).toFixed(2); // Distance in km
    }
    return null;
  };

  const calculateEta = (dist: number) => {
    const averageSpeed = 60;
    const time = dist / averageSpeed;
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  const handlePlanNow = async () => {
    if (start && finish) {
      const calculatedDistance = calculateDistance();
      if (calculatedDistance) {
        setDistance(calculatedDistance);
        setEta(calculateEta(parseFloat(calculatedDistance)));
      }
    }
    setShowDetails(true);
  };

  const handleNavigate = () => {
    if (start && finish) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${start.latitude},${start.longitude}&destination=${finish.latitude},${finish.longitude}&travelmode=driving`;
      Linking.openURL(url).catch(_err => Alert.alert('Error', 'Failed to open Google Maps.'));
    } else {
      Alert.alert('Error', 'Please select both start and finish locations.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} showsTraffic>
        {start && <Marker coordinate={start} title="Start Location" />}
        {finish && <Marker coordinate={finish} title="Finish Location" />}
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
      </MapView>
      <View style={styles.overlay}>
        <Text style={styles.text}>Trip Planner</Text>
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
        <TouchableOpacity style={styles.button} onPress={handlePlanNow}>
          <Text style={styles.buttonText}>Plan Now</Text>
        </TouchableOpacity>
        {showDetails && (
          <View style={styles.details}>
            {start && finish && (
              <>
                <View style={styles.infoRow}>
                  <Icon name="track-changes" size={20} color="black" />
                  <Text style={styles.distance}>
                    Distance: {distance} km
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Icon name="access-time" size={20} color="black" />
                  <Text style={styles.eta}>
                    ETA: {eta}
                  </Text>
                </View>
                <TouchableOpacity style={styles.navigateButton} onPress={handleNavigate}>
                  <Text style={styles.buttonText}>Navigate</Text>
                </TouchableOpacity>
              </>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  text: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: 'bold',
  },
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  navigateButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TripPlannerScreen;
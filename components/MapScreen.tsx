

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import ExpandableHeader from './ExpandableHeader';
import Amenities from './icons/Amenities';
import Station from './icons/Station';
import Search from './icons/Search';
import MapFilter from './icons/MapFilter';
import AvailiableIcon from './icons/Availiable';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Availiable from './Availiable';
import SearchComponent from './SearchComponent';

const { width: w } = Dimensions.get('window');
const menuItemWidth = w / 6;



// Removed unused menuItems variable

// Removed unused createIcon function

const menuIcons = {
  Search: (color: string) => <Search color={color} />,
  MapFilter: (color: string) => <MapFilter color={color} />,
  Availiable: (color: string) => <AvailiableIcon color={color} />,
  Station: (color: string) => <Station color={color} />,
  Amenities: (color: string) => <Amenities color={color} />,
};

const Map = () => {
  const translateY = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const menuHeight = insets.top + menuItemWidth + 50;

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

  useEffect(() => {
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
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } else {
        getCurrentLocation();
      }
    };

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
        },
        error => console.log('Error:', error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    const fetchEVStations = async () => {
      try {
        const response = await axios.get('https://api.openchargemap.io/v3/poi/', {
          params: {
            output: 'json',
            countrycode: 'AU',
            maxresults: 1000,
            key: '92ee87ed-3f4f-482d-8129-41932d6f9590',
          },
        });
        setState(prevState => ({
          ...prevState,
          evStations: response.data,
        }));
      } catch (error) {
        console.error('Error fetching EV stations:', error);
      }
    };

    requestLocationPermission();
    fetchEVStations();
  }, []);

  const menus = [
    { id: '1', name: 'Search', icon: menuIcons.Search },
    { id: '2', name: 'Map Filters', icon: menuIcons.MapFilter },
    { id: '3', name: 'Availiable', icon: menuIcons.Availiable },
    { id: '4', name: 'Stations', icon: menuIcons.Station },
    { id: '5', name: 'Amenities', icon: menuIcons.Amenities },
  ];

  const handlePress = (id: string) => {
    if (id === '1') {
      translateY.value = withSpring(-menuHeight);
    } else {
      translateY.value = withSpring(0);
    }
    setState(prevState => ({ ...prevState, active: id }));
  };

  const mapShow = (id: string) => id === '1' || id === '2';

  const handleClose = () => {
    setState(prevState => ({ ...prevState, active: '2' }));
    translateY.value = withSpring(0);
  };

  return (
    <View style={styles.container}>
      <ExpandableHeader
        menuData={menus}
        onPress={handlePress}
        active={state.active}
        translateY={translateY}
        menuItemWidth={menuItemWidth}
        menuHeight={menuHeight}
      />
      {mapShow(state.active) ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: state.userLocation ? state.userLocation.latitude : -37.8136,
            longitude: state.userLocation ? state.userLocation.longitude : 144.9631,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={state.region}
          showsUserLocation={true}
        >
          {state.userLocation && (
            <Marker
              coordinate={state.userLocation}
              title="You are here"
            />
          )}
          {state.evStations.map(station => (
            <Marker
              key={station.ID}
              coordinate={{
                latitude: station.AddressInfo.Latitude,
                longitude: station.AddressInfo.Longitude,
              }}
              title={station.AddressInfo.Title}
              description={station.AddressInfo.AddressLine1}
            />
          ))}
        </MapView>
      ) : null}
      {state.active === '1' ? (
        <SearchComponent state={state} handleClose={handleClose} />
      ) : null}
      {state.active === '3' ? (
        <View style={[styles.availiable, { paddingTop: menuHeight + 8 }]}>
          <Availiable />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  search: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
  },
  safeArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '50%',
    position: 'relative',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    borderRadius: 25,
    padding: 8,
    height: 50,
    backgroundColor: '#fff',
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
  },
  availiable: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 8,
  },
});

export default Map;

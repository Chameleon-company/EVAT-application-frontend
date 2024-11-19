import React from 'react';
import { View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const SearchComponent = ({ state, handleClose }) => {
  return (
    <View style={styles.search}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            placeholder="Search for EV charging stations"
            onPress={(data, details = null) => {
              console.log(data, details);
              // Handle the selected place details here
            }}
            query={{
              key: 'AIzaSyDbfaYzyw__K8paspxDS6c7Pw5VP6q_R48',
              language: 'en',
              types: 'establishment',
              location: `${state.region.latitude},${state.region.longitude}`,
              radius: 50000, // 50 km radius
            }}
            styles={{
              textInput: styles.textInput,
              container: styles.autocompleteContainer,
              listView: styles.listView,
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            debounce={200}
          />
          <View style={styles.closeIcon}>
            <Pressable onPress={handleClose}>
              <Icon name="close" size={20} />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SearchComponent;

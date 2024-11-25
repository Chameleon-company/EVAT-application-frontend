import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import { BlurView } from "@react-native-community/blur";

const FooterNavigation = () => {
  const navigation = useNavigation<any>();

  return (
      <View style={styles.navbar}>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Map')}>
          <Icon name="map" size={25} color="#707070" />
          <Text>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('TripPlanner')}>
          <Icon name="directions" size={25} color="#707070" />
          <Text>Trip Planner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Save')}>
          <Icon name="star-outline" size={25} color="#707070" />
          <Text>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Me')}>
          <Icon name="person" size={25} color="#707070" />
          <Text>Me</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({

  navbar: {
    position: 'absolute', // Sets the nav bar as an overlay
    bottom: 20, // Gap between nav bar and bottom of screen
    alignSelf: 'center',
    backgroundColor: '#333', // Black with 80% opacity
    borderRadius: 100,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },

  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  navItem: {
    alignItems: 'center',
    paddingHorizontal: 10, // Increased horizontal padding
    marginHorizontal: 10, // Increased horizontal margin
  },
});

export default FooterNavigation;

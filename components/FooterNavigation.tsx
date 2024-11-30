import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const FooterNavigation = () => {
  const navigation = useNavigation<any>();

  return (
      <View style={styles.navbarContainer}>
        <View style={styles.navbar}>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Map')}>
            <Icon name="map" size={25} color="#707070" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Login')}>
            <Icon name="login" size={25} color="#707070" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItemMain}
            onPress={() => navigation.navigate('TripPlanner')}>
            <Icon name="directions" size={25} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Save')}>
            <Icon name="star-outline" size={25} color="#707070" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Me')}>
            <Icon name="person" size={25} color="#707070" />
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({

  navbarContainer: {
    position: 'absolute', // Sets the nav bar as an overlay
    bottom: 20, // Gap between nav bar and bottom of screen
    alignSelf: 'center',
    marginHorizontal: 20,
  },

  navbar: {
    backgroundColor: '#333', // Black with 80% opacity
    borderRadius: 100,
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
  },

  navItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 25,
  },

  navItemMain: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginVertical: 12,
    borderRadius: 100,
    backgroundColor: '#00CB3A',
  },
});

export default FooterNavigation;

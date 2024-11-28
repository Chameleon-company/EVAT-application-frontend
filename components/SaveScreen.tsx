import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const chargingStations = [
  {
    id: "1",
    name: "EVgo Charging Station",
    distance: "1.2 km away from you",
    image: "https://via.placeholder.com/70",
    connectors: [
      { type: "CHAdeMO", power: "100 kW" },
      { type: "CCS", power: "100 kW" },
      { type: "CHAdeMO", power: "50 kW" },
    ],
  },
  {
    id: "2",
    name: "Electrify America Charging Station",
    distance: "1.2 km away from you",
    image: "https://via.placeholder.com/70",
    connectors: [{ type: "CHAdeMO", power: "100 kW" }],
  },
  {
    id: "3",
    name: "ChargePoint Charging Station",
    distance: "1.2 km away from you",
    image: "https://via.placeholder.com/70",
    connectors: [{ type: "CHAdeMO", power: "100 kW" }],
  },
];

const ChargingStationsScreen = () => {
  const renderStation = ({ item }: { item: any }) => (
    <View style={styles.stationContainer}>
      <Image
        style={styles.stationImage}
        source={{ uri: item.image }} // Replace with profile image URL
      />
      <View style={styles.stationInfo}>
        <Text style={styles.stationName}>{item.name}</Text>
        <Text style={styles.stationDistance}>
          <Icon name="location-on" size={14} color="#292D32" /> {item.distance}
        </Text>
        <View style={styles.connectorContainer}>
          {item.connectors.map((connector, index) => (
            <View key={index} style={styles.connectorRow}>
              <Text style={styles.connectorText}>
                <Icon name="bolt" size={14} color="#292D32" /> {connector.type} ·
              </Text>
              <Text style={styles.connectorPowerText}>{connector.power}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={18} color="#CDCDCD" />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>
        <View style={styles.searchBarFilter}>
          <Icon name="tune" size={24} color="#292D32" />
        </View>
      </View>

      {/* Charging Stations List */}
      <FlatList
        data={chargingStations}
        keyExtractor={(item) => item.id}
        renderItem={renderStation}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
//     backgroundColor: '#BBBCBC',  // Test Background of whole page
    backgroundColor: '#F5F4F6',  // White Background of whole page
  },

  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 10,

  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 12,
    flexGrow: 100,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  searchInput: {
    placeholderTextColor: '#CDCDCD',
    color: '#141415',
    marginLeft: 10,
    fontSize: 16,
  },

  searchBarFilter: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  stationContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  stationImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },

  stationInfo: {
    flex: 1,
  },

  stationName: {
    fontSize: 16,
    color: '#141415',
    fontWeight: 'bold',
    marginBottom: 5,
  },

  stationDistance: {
    fontSize: 14,
    color: '#5F5F63',
    marginBottom: 5,
  },

  connectorContainer: {
    marginTop: 0,
  },

  connectorRow: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Vertically center items in the row
    marginBottom: 5, // Add spacing between rows
  },

  connectorText: {
    fontSize: 14,
    color: '#5F5F63',
    marginRight: 5,
  },

  connectorPowerText: {
    fontSize: 14,
    color: '#AFAFB1',
  },

});

export default ChargingStationsScreen;

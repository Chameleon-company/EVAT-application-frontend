import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Profile Section. Just example data needs to be linked to user API */}
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://via.placeholder.com/70' }} // Replace with user profile image URL
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>MARGOT ROBBIE</Text>
          <Text style={styles.userEmail}>12345@1234.com</Text>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="settings" size={25} color="#292D32" />
        </TouchableOpacity>
      </View>

      {/* Charging Fee and Balance Section */}
        <View style={styles.cardSection}>
          <View style={styles.cardItem}>
            <Icon name="bolt" size={25} color="#00CB3A" />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardValue}>128.36</Text>
              <Text style={styles.cardLabel}>Charging fee</Text>
            </View>
          </View>

          <View style={styles.cardItem}>
            <Icon name="wallet" size={25} color="#00B7CB" />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardValue}>105.06</Text>
              <Text style={styles.cardLabel}>Balance</Text>
            </View>
          </View>
        </View>

      {/* Utilities Section */}
      <View style={styles.utilitiesContainer}>
        <Text style={styles.utilitiesTitle}>Utilities</Text>
        <ScrollView style={styles.utilitiesScrollContainer}>
          {[
            { title: 'Favourite stations', icon: 'favorite-outline', navigate: 'Save' },
            { title: 'Service sector', icon: 'info-outline', navigate: 'Me' },
            { title: 'Historical records', icon: 'history', navigate: 'Me' },
            { title: 'Activity Center', icon: 'work-outline', navigate: 'Me' },
            { title: 'Fault reporting', icon: 'error-outline', navigate: 'Me' },
            { title: 'Scroll Test', icon: 'comment', navigate: 'Me' },
            { title: 'Scroll Test 2', icon: 'comment', navigate: 'Me' },
            { title: 'Scroll Test 3', icon: 'comment', navigate: 'Me' },
            { title: 'Scroll Test 4', icon: 'comment', navigate: 'Me' },
            { title: 'Scroll Test 5', icon: 'comment', navigate: 'Me' },
            { title: 'Scroll Test 6', icon: 'comment', navigate: 'Me' },
            { title: 'Scroll Test 7', icon: 'comment', navigate: 'Me' },
            { title: 'Scroll Test 8', icon: 'comment', navigate: 'Me' },
            { title: 'Scroll Test 9', icon: 'comment', navigate: 'Me' },
            { title: 'Scroll Test 10', icon: 'comment', navigate: 'Me' },
            { title: 'Scroll Test 11', icon: 'comment', navigate: 'Me' },
            { title: 'Scroll Test 12', icon: 'comment', navigate: 'Me' },
            { title: 'Scroll Test 13', icon: 'comment', navigate: 'Me' },

          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.utilityItem} onPress={() => navigation.navigate(item.navigate)}>
              <Icon name={item.icon} size={20} color="#292D32"/>
              <Text style={styles.utilityText}>{item.title}</Text>

            </TouchableOpacity>
          ))}
        <View style={styles.bottomPadding} />

        </ScrollView>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
//    backgroundColor: '#BBBCBC',  // High contrast Background of whole page
    backgroundColor: '#F5F4F6',  // Normal Background of whole page
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
  },

  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  userInfo: {
    flex: 1,
    marginLeft: 14, // Between profile image and text
  },

  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#292D32',
  },

  userEmail: {
    fontSize: 12,
    color: '#B59F9D',
  },

  editButton: {
    paddingLeft: 20, // Increase touch area of button
    paddingVertical: 20,
  },

  editText: {
    color: '#B59F9D',
    fontSize: 12,
  },

  cardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 16,
    gap: 15, // Gap between cards
  },

  cardItem: {
    flex: 1,
    backgroundColor: '#FFF', // White background color for each card
    borderRadius: 18,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20, // Gap between icon and text


    shadowColor: '#02B335',
    shadowOffset: {
      width: 3.5,
      height: 7,

    },
    shadowOpacity: 0.06,
    shadowRadius: 14,
  },

  cardTextContainer: {
//     gap: 0 ,
  },

  cardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#292D32',
    paddingTop: 15,
  },

  cardLabel: {
    fontSize: 14,
    color: '#B59F9D',
    paddingBottom: 15,
  },

  utilitiesContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },

  utilitiesTitle: {
     fontSize: 20,
     fontWeight: 'bold',
     color: '#292D32',
  },

  utilitiesScrollContainer: {
    flex: 1,
    marginTop: 5,
  },

  utilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    marginTop: 4, // Dead zone between items
  },

  utilityText: {
    fontSize: 18,
    color: '#292D32',
    marginLeft: 12,
  },

  bottomPadding: {
    height: 100, // So that the nav bar doesnt hide some of the list
  },
});


export default ProfileScreen;


import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://via.placeholder.com/70' }} // Replace with profile image URL
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>MARGOT ROBBIE</Text>
          <Text style={styles.userEmail}>12345@1234.com</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Charging Fee and Balance Section */}
        <View style={styles.cardSection}>
          <View style={styles.cardItem}>
            <Text style={styles.cardIcon}>⚡</Text>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardValue}>128.36</Text>
              <Text style={styles.cardLabel}>Charging fee</Text>
            </View>
          </View>

          <View style={styles.cardItem}>
            <Text style={styles.cardIcon}>👛</Text>
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
            { title: 'My collection', icon: '❤️' },
            { title: 'Service sector', icon: '👥' },
            { title: 'Historical records', icon: '⏰' },
            { title: 'Activity Center', icon: '📢' },
            { title: 'Fault reporting', icon: '📝' },
            { title: 'Scroll Test', icon: '📝' },
            { title: 'Scroll Test 2', icon: '📝' },
            { title: 'Scroll Test 3', icon: '📝' },
            { title: 'Scroll Test 4', icon: '📝' },
            { title: 'Scroll Test 5', icon: '📝' },
            { title: 'Scroll Test 6', icon: '📝' },
            { title: 'Scroll Test 7', icon: '📝' },
            { title: 'Scroll Test 8', icon: '📝' },
            { title: 'Scroll Test 9', icon: '📝' },
            { title: 'Scroll Test 10', icon: '📝' },
            { title: 'Scroll Test 11', icon: '📝' },

          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.utilityItem}>
              <Text style={styles.utilityIcon}>{item.icon}</Text>
              <Text style={styles.utilityText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
//       {/* Bottom Navigation Section */}
//       <View style={styles.bottomNavigation}>
//         {['🏠', '🚗', '⚡', '👤'].map((icon, index) => (
//           <TouchableOpacity key={index} style={styles.navItem}>
//             <Text style={styles.navIcon}>{icon}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
//    backgroundColor: '#BBBCBC',  // Test Background of whole page
    backgroundColor: '#eeeeee',  // White Background of whole page
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
    borderRadius: 35
  },

  userInfo: {
    flex: 1,
    marginLeft: 14, // Between profile image and text
  },

  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#292D32'
  },

  userEmail: {
    fontSize: 12,
    color: '#B59F9D'
  },

  editButton: {
    paddingLeft: 20, // Increase size of button
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
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Align icon and text vertically
    gap: 20, // Gap between icon and text

    shadowColor: "#02B335",
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

  icon: {
    fontSize: 40, // Icon size
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
     fontSize: 16,
     fontWeight: 'bold',
     color: '#292D32'
  },

  utilitiesScrollContainer: {
    flex: 1,
    marginTop: 5,
  },

  utilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 5, // Deadzone between items
  },

  utilityIcon: {
    fontSize: 20,
    marginRight: 8
  },

  utilityText: {
    fontSize: 14,
    color: '#292D32'
  },
//
//   bottomNavigation: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 16,
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderTopColor: '#E0E0E0'
//   },
//
//   navItem: {
//     alignItems: 'center'
//   },
//
//   navIcon: {
//     fontSize: 24,
//     color: '#333'
//   }
});


export default ProfileScreen;
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FooterNavigation from './components/FooterNavigation';
import MapScreen from './components/MapScreen';
import TripPlannerScreen from './components/TripPlannerScreen';
import SaveScreen from './components/SaveScreen';
import MeScreen from './components/MeScreen';
import EditProfileScreen from './components/EditProfileScreen';
import LogInScreen from './components/LogInScreen';
import CreateAccountScreen from './components/CreateAccountScreen';

import 'react-native-get-random-values';

const Stack = createNativeStackNavigator();

const routes = [
  {name: 'Map', component: MapScreen},
  {name: 'TripPlanner', component: TripPlannerScreen},
  {name: 'Save', component: SaveScreen},
  {name: 'Me', component: MeScreen},
  {name: 'EditProfile', component: EditProfileScreen},
  {name: 'Login', component: LogInScreen},
  {name: 'CreateAccount', component: CreateAccountScreen},
];

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.navigatorContainer}>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}>
            {routes.map((route, index) => (
              <Stack.Screen
                key={index}
                name={route.name}
                component={route.component}
              />
            ))}
          </Stack.Navigator>
        </View>

        <SafeAreaView>
          <FooterNavigation />
        </SafeAreaView>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fancyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20, // Add margin to separate text from the navigator
  },
  navigatorContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10, // Add padding to the navigator container
  },
});

export default App;

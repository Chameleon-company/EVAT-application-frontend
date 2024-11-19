import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import StationIcon from '../icons/Station';

interface AvailiableProps {
  // Define the props if any, currently assuming there are none
}

export default function Availiable(_props: AvailiableProps): JSX.Element {
  return (
    <View style={styles.wrap}>
      <View style={styles.centered}>
        <StationIcon color="#008000" />
      </View>
      <View style={styles.spaceAround}>
        <Text style={styles.text}>Austion Hospital Car Park</Text>
        <Text style={styles.text}>Type 2</Text>
      </View>
      <View style={styles.flexEnd}>
        <Text
          style={[
            styles.text,
            styles.highlightText,
          ]}
        >
          9.0 EVAT Score
        </Text>
        <Text style={styles.text}>4 out 4 Available</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    backgroundColor: '#fff',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
    padding: 8,
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#007AFF',
  },
  spaceAround: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  highlightText: {
    backgroundColor: '#007AFF',
    color: '#fff',
    textAlign: 'center',
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

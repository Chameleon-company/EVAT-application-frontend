import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddCard: React.FC<{ navigation: any }> = ({ navigation }): React.ReactElement => {
  const [vehicleType, setVehicleType] = useState("Options");

  const handleProceed = () => {
  };

  return (
    <View style={styles.addCard}>
      <View style={styles.he100} />
      <Image
        source={require('../../assets/login/c2.png')}
        style={styles.logo} />
      <Text style={styles.txt1}>
        Add Your Electric Vehicle
      </Text>
      <Text style={styles.txt2}>
        Your vehicle is used to assess the compatibility of charging stations.
      </Text>
      <View style={styles.inpBox}>
        <View style={styles.inp}>
          <TextInput
            placeholder="Add your Vehicle"
            keyboardType="default"
            style={styles.input}
          />
        </View>
        <View style={styles.inp}>
          <TextInput
            placeholder="Vehicle type?"
            keyboardType="default"
            style={styles.input}
          />
        </View>
        <Text style={styles.txt3}>Select charging port type</Text>
        <View style={styles.select}>
          <Picker
            selectedValue={vehicleType}
            style={styles.picker}
            onValueChange={(itemValue) => setVehicleType(itemValue)}
          >
            <Picker.Item label="Options" value="Options" />
            <Picker.Item label="audi" value="audi" />
            <Picker.Item label="byd" value="byd" />
            <Picker.Item label="geely" value="geely" />
            <Picker.Item label="volvo" value="volvo" />
          </Picker>
        </View>
      </View>
      <Text style={styles.txt4}>Vehicles year of manufacture:</Text>
      <Text style={styles.txt5}>Jun 10, 2024</Text>
      <Text style={styles.txt6}>skip for now</Text>

      <TouchableOpacity style={styles.next} onPress={handleProceed}>
        <Text style={styles.nextText}>Proceed</Text>
      </TouchableOpacity>
      <Image source={require('../../assets/login/c3.png')} style={styles.c3} />
    </View>
  );
};

const styles = StyleSheet.create({
  addCard: {
    flex: 1,
    height: '100%',
    backgroundColor: '#cff9ff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // padding: 10,
  },
  he100: {
    height: 50,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    margin: 0,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  txt1: {
    fontSize: 35,
    textAlign: 'center',
    color: '#2293B7',
    width: '95%',
    marginVertical: 10,
  },
  txt2: {
    fontSize: 19,
    textAlign: 'center',
    // color: '#fff',
    width: '95%',
    marginVertical: 10,
  },
  inpBox: {
    width: '90%',
    marginTop: 10,
  },
  inp: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 20,
    // backgroundColor: '#fff',
    paddingLeft: 10,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  txt3: {
    textAlign: 'center',
    // color: '#fff',
    marginVertical: 20,
  },
  select: {
    width: 200,
    margin: 'auto',
    // display: 'block',
    height: 50,
  },
  picker: {
    width: '100%',
    height: '100%',
    borderWidth: 0,
    fontSize: 20,
  },
  txt4: {
    textAlign: 'center',
    // display: 'block',
    // color: '#fff',
    marginVertical: 10,
  },
  txt5: {
    // color: '#fff',
    // padding: 10,
    width: 200,
    // backgroundColor: '#2293B7',
    // margin: 10,
    textAlign: 'center',
  },
  txt6: {
    // color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  txt7: {
    backgroundColor: '#2C2C2C',
    margin: 10,
    width: 120,
    padding: 10,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  c3: {
    width: '100%',
    height: 200,
    marginTop: 20,
    resizeMode: 'contain',
  },
  next: {
    backgroundColor: '#2293B7',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30,
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddCard;

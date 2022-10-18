import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-ionicons';
import {Button} from 'react-native-paper';
import Icons from '../assets/ok.jpg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const About = () => {
  const [haha, setHaha] = useState(false);

  return (
    <View style={style.Container}>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Image
          style={{width: 100, height: 100, marginBottom: 10}}
          source={Icons}></Image>
        <Text style={{color: 'white'}}>
          Masi dalam tahap pekerjaan tut. tut. tut.
        </Text>
      </View>
      {/* <Icon android="md-add" color="white" /> */}
    </View>
  );
};

const style = StyleSheet.create({
  Container: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default About;

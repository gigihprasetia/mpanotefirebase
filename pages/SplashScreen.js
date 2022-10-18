import React from 'react';
import {View, Text, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import Icon from '../assets/notepad.jpg';
import {useEffect} from 'react';
import {StackActions} from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Tabs'));
    }, 3000);
  }, []);
  return (
    <View style={style.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Image style={style.Image} source={Icon} />
        <Text onPress={() => navigation.navigate('Home')} style={style.Text}>
          MpaaNote.
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    color: 'pink',
    fontSize: 25,
    marginTop: 10,
    fontWeight: 'bold',
  },
  Image: {
    width: 120,
    height: 120,
  },
});

export default SplashScreen;

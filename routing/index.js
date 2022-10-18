import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../pages/SplashScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native';
import Home from '../pages/home';
import About from '../pages/about';
import WriteBoard from '../pages/writeBoard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: '#FB2576',
          height: 55,
        },
        tabBarLabel: ({focused, color, size}) => (
          <Text style={{color: focused ? 'white' : 'black'}}>{route.name}</Text>
        ),
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-outline' : 'home-outline';
          } else if (route.name === 'About') {
            iconName = focused
              ? 'ellipsis-horizontal-circle-outline'
              : 'ellipsis-horizontal-circle-outline';
          }
          // console.log(color, 'xjsixj');
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F1EFDC',
        tabBarInactiveTintColor: 'black',
      })}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            color: 'black',
          },
        }}
        component={Home}
      />
      <Tab.Screen
        name="About"
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            color: 'black',
          },
        }}
        component={About}
      />
    </Tab.Navigator>
  );
};

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SpalshScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Tabs"
          component={Tabs}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="WriteBoard"
          component={WriteBoard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;

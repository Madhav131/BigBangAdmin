import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashSreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import ScanEntry from './Security/ScanEntry';
import ScanTicket from './Employee/ScanTicket';
import colors from './utils/colors';

import Feather from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import TicketList from './Employee/TicketList';
import Ticketupdate from './Employee/ticketupdate';


const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomComponent = () => {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: colors.red,
      inactiveTintColor: colors.gray,
      showLabel: false,
      style: {
        backgroundColor: colors.white
      }
    }} screenOptions={{ headerShown: false }} >
      <Tab.Screen name="Scan" component={ScanTicket}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="qrcode-scan" color={color} size={28} />
          )
        }}
      />
      <Tab.Screen name="TicketList" component={TicketList}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="ticket" color={color} size={28} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const RootScreen = props => (
  <RootStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="splashScreen">
    <RootStack.Screen name="splashScreen" component={SplashSreen} />
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
    <RootStack.Screen name="ScanEntry" component={ScanEntry} />
    <RootStack.Screen name="ScanTicket" component={BottomComponent} />
    <RootStack.Screen name="Ticketupdate" component={Ticketupdate} />

  </RootStack.Navigator>
);

export default RootScreen;

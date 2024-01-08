import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Home, Profile, CreateEvent, SearchEvent } from "../screens";
import Page from "../..";
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Page} />
      <Tab.Screen name="search" />
      <Tab.Screen name="create"  />
      <Tab.Screen name="Profile" />
    </Tab.Navigator>
  );
};

export default Tabs;
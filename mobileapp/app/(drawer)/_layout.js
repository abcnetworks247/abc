import "react-native-gesture-handler"
import { View, Text, SafeAreaView } from 'react-native'
import {Drawer} from "expo-router/drawer"
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import {GestureHandlerRootView }from "react-native-gesture-handler";
import globalStyels from "../../styles/globalStyels";

const _layout = () => {

  return (
       <SafeAreaView style={globalStyels.droidSafeArea}>

     <Navbar />
        <Drawer >
        <Drawer.Screen name="pricing/index" options={{ header: () => null , animation: "slide_from_left"} } />
        <Drawer.Screen name="(dashboard)" options={{ header: () => null , animation: "slide_from_left"} } />
    </Drawer>
        </SafeAreaView> 

  )
}

export default _layout
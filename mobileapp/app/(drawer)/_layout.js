import "react-native-gesture-handler"
import { View, Text, SafeAreaView, Pressable } from 'react-native'
import {Drawer} from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import {GestureHandlerRootView }from "react-native-gesture-handler";
import globalStyels from "../../styles/globalStyels";
import { useRouter } from "expo-router";


const _layout = () => {
  const Router = useRouter()
  return (
    <>
    
       <SafeAreaView style={globalStyels.droidSafeArea}>

     <Navbar />

        <Drawer  >
        <Drawer.Screen name="(dashboard)" options={{ header: () => null , title: "home",  animation: "slide_from_left"} } />
      
    </Drawer>
        </SafeAreaView> 
    </>

  )
}

export default _layout
import "react-native-gesture-handler"
import { View, Text, SafeAreaView, Pressable } from 'react-native'
import {Drawer} from "expo-router/drawer";
import { DrawerItem } from "@react-navigation/drawer";
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import {GestureHandlerRootView }from "react-native-gesture-handler";
import globalStyels from "../../styles/globalStyels";
import { useRouter } from "expo-router";
import DrawerContentScrollView from "../components/navigations/DrawerContentScrollView";


const _layout = () => {
  const Router = useRouter()
  return (
    <>
    

        <Drawer drawerContent={props => <DrawerContentScrollView {...props} />} >
        <Drawer.Screen name="(dashboard)" options={{ header: () => null , title: "home",  animation: "slide_from_left"} } />
      
    </Drawer>
    </>

  )
}

export default _layout
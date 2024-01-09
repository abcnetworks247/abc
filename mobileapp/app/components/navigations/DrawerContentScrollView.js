import { View, Text, Image } from 'react-native'
import React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Logo from "../../../assets/AbcstudioNo.png";

const DrawerContentScrollView = () => {
    const router = useRouter()
  return (
    <View className="mt-[-10px]">
    <DrawerItem label={"Abc Studio"}  labelStyle={{marginLeft: -20, fontSize: 18, marginTop: -20, display: "none"}} icon={({color, size}) => <Image source={Logo} style={{width: 100, height: 80}} />}>

    </DrawerItem>
    <DrawerItem  labelStyle={{marginLeft: -20, fontSize: 18}}  label={"Home"}  icon={({color, size}) => <MaterialCommunityIcons
              name="home-outline"
              size={25}
              color={color}
            /> } onPress={() => router.push('/home')}/>
    </View>
  )
}

// const styles = StyleSheet.cr

export default DrawerContentScrollView
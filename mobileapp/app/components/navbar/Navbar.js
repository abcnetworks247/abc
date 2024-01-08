import { View, Text ,Image} from 'react-native'
import React from 'react';
import Logo from "../../../assets/AbcstudioNo.png";
import User from "../../../assets/AbcstudioNo.png";

const Navbar = () => {
  return (
    <View className="flex items-center justify-between px-4">
     <View>
        <Image source={Logo} className="w-40 h-20" />
     </View>
     <View>

     <View> </View>
     <View></View>
     </View>
    </View>
  )
}

export default Navbar;
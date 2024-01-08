import { View, Text, Image } from "react-native";
import React from "react";
import Logo from "../../../assets/AbcstudioNo.png";
import User from "../../../assets/user.jpg";

const Navbar = () => {
  return (
    <View className="flex flex-row items-center justify-between px-4 bg-[#111827] border-b-2 backdrop-blur-2xl">
      <View>
        <Image source={Logo} className="w-40 h-20" />
      </View>
      <View>
        <View>
       {/* //wishlist icons */}
       
        </View>
        <View >
        <Image source={User} className="w-10 h-10 rounded-full border-2 border-[#f5f5f5]" />
        </View>
      </View>
    </View>
  );
};

export default Navbar;

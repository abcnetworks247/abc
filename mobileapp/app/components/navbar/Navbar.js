import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
import Logo from "../../../assets/AbcstudioNo.png";
import Svg, { Path, G } from "react-native-svg";
import User from "../../../assets/user.jpg";

const Navbar = () => {
  return (
    <View className="flex flex-row items-center justify-between px-4 bg-[#111827] border-b-2 backdrop-blur-2xl mb-4">
      <View className="h-[60px] w-20">

        <Image source={Logo} className="w-full h-full" />
      </View>
      <View className="flex flex-row gap-4 items-center">
        <View>
       {/* //wishlist icons */}
       
       <Svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"

    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6c-1.8-2.097-4.806-2.745-7.06-.825-2.255 1.92-2.573 5.131-.802 7.402 1.472 1.888 5.927 5.87 7.387 7.16.163.144.245.216.34.245a.456.456 0 00.258 0c.095-.029.176-.1.34-.245 1.46-1.29 5.915-5.272 7.387-7.16 1.77-2.27 1.492-5.502-.802-7.402C16.755 3.275 13.8 3.903 12 6z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
        </View>
        <View >
        <Image source={User} className="w-10 h-10 rounded-full border-2 border-[#f5f5f5]" />
        </View>
      </View>
    </View>
  );
};

export default Navbar;

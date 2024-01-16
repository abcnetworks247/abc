import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Navbar from "../../../../../components/navbar/Navbar";
import globalStyels from "../../../../../../styles/globalStyels";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import Product from "../../../../../../assets/product.jpg"

const index = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={globalStyels.droidSafeArea}>
          <View className="border-b-2 border-gray-200 py-2 px-2 w-full">
            <TouchableOpacity
              className="flex items-center flex-row gap-3  "
              onPress={() => {
                router.push("/profile");
              }}
            >
              <Svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M4 10l-.354.354L3.293 10l.353-.354L4 10zm16.5 8a.5.5 0 01-1 0h1zM8.646 15.354l-5-5 .708-.708 5 5-.708.708zm-5-5.708l5-5 .708.708-5 5-.708-.708zM4 9.5h10v1H4v-1zM20.5 16v2h-1v-2h1zM14 9.5a6.5 6.5 0 016.5 6.5h-1a5.5 5.5 0 00-5.5-5.5v-1z"
                  fill="#222"
                />
              </Svg>
              <Text className="text-lg">Back</Text>
            </TouchableOpacity>
          </View>
      <ScrollView>
        <View>
          <View className="px-4">
            <Text className="text-xl mt-8 ">Orders</Text>

             <View>
    <View className="w-full h-fit">
<View>
  <View className="flex items-center flex-row justify-between mt-4 pl-2 py-2 border border-gray-200 ">
    <View className="flex items-center flex-row gap-4">
      <View className="h-24 w-24">
        <Image
          source={Product}
          className="h-24 w-24 rounded-md "
       
        />
      </View>
      <View className="flex flex-col">
        <Text className="text-gray-600 line-clamp-1">
          Avira Fashion
        </Text>
        <Text className="text-sm text-gray-500">Order 33455</Text>
        <View className="flex items-center justify-center bg-[#daa520] rounded-sm px-[2px] shadow-sm self-start">
          <Text className="text-white">Delivered</Text>
        </View>
      </View>
    </View>
    <View >
      <Text className="text-sm cursor-pointer text-blue-500 flex items-center justify-center p-2 rounded-sm hover:bg-red-200">See details</Text>
    </View>
  </View>
</View>
</View> 

             </View>
          </View>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;


{/* <View className="w-full h-fit">
<View>
  <View className="flex items-center flex-row justify-between mt-4 px-2 py-2 border border-gray-200 gap-8">
    <View className="flex items-center gap-2 flex-shrink-0">
      <View className="h-24 w-24">
        <Image
          source={Product}
       
        />
      </View>
      <View className="flex flex-col">
        <Text className="text-gray-600 line-clamp-1">
          Avira Fashion
        </Text>
        <Text className="text-sm text-gray-500">Order 33455</Text>
        <View className="flex items-center justify-center bg-[#daa520] rounded-sm px-[2px] shadow-sm self-start">
          <Text className="text-white">Delivered</Text>
        </View>
      </View>
    </View>
    <View >
      <Text className="text-sm cursor-pointer text-blue-500 flex items-center justify-center p-2 rounded-sm hover:bg-red-200">See details</Text>
    </View>
  </View>
</View>
</View> */}
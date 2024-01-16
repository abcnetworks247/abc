import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image
  } from "react-native";
  import React from "react";
  import globalStyels from "../../../../../../styles/globalStyels";
  import Svg, { Path, G } from "react-native-svg";
  import { useRouter } from "expo-router";
  import Product from "../../../../../../assets/product.jpg";
  import * as ImagePicker from "expo-image-picker"
  const index = () => {
  
    const router = useRouter();
  const SelectImagePicker = async ()=>{
  
      try {
          
          const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
          })
          if(!result.canceled){
      
          }
      } catch (error) {
          
      }
  
  }
  
  
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
            <View className="px-4 w-full">
              <Text className="text-xl mt-8 ">Hey 👋 PrinceAjuize welcome back </Text>
  
  
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default index;
  
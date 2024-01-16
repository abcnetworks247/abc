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
import Navbar from "../../../../../components/navbar/Navbar";
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
            <Text className="text-xl mt-8 ">Edit Profile</Text>

       <View className="mt-6">
       <View className="w-full ">
        <TextInput
          className="w-full px-4 mb-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
          placeholder="Full Name"
          defaultValue="PrinceAjuzie"
          name="fullname"
        /> 
      </View>
      <View className="relative z-0 w-full mb-5 group">
        <TextInput
          className="w-full px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
          placeholder="Email"
         defaultValue="princeajuzie1@gmail.com"
      
          name="email"
        />
      </View>
      <View className="relative z-0 w-full mb-5 group">
        <TextInput
          className="w-full px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
          placeholder="Phone"
          name="phonenumber"
        />
      </View>
      <View className="mb-6">
        <Text className="block mb-2 text-sm font-medium dark:text-gray-400">
          Shipping Address
        </Text>
        <TextInput
          name="shippingaddress"
          type="text"
          placeholder="Enter your shipping address..."
          className="w-full px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
          data-gramm="false"
          wt-ignore-input="true"
        />
      </View>
      <View className="mb-6">
        <Text className="block mb-2 text-sm font-medium dark:text-gray-400">
          Profile Picture
        </Text>  
        <TouchableOpacity className="py-2 shrink-0 w-full" onPress={SelectImagePicker}   >
            <View className="relative">
       <View className="absolute bg-black/50 z-10  h-[50px] top-10 w-[100px] rounded-b-lg flex items-center justify-center ">
       <Svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={30}
      color="white"
      width={30}
      className="text-white"
    >
      <G stroke="#ffff" strokeWidth={1.5}>
        <Path d="M15 13H9M12 10v6" strokeLinecap="round" />
        <Path d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.408 4.408 0 001.226-1.204c.749-1.1.749-2.633.749-5.697 0-3.065 0-4.597-.749-5.697a4.407 4.407 0 00-1.226-1.204c-.72-.473-1.622-.642-3.003-.702-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0013.634 3h-3.268c-.988 0-1.839.685-2.033 1.636-.129.635-.696 1.125-1.355 1.125-1.38.06-2.282.23-3.003.702A4.405 4.405 0 002.75 7.667C2 8.767 2 10.299 2 13.364c0 3.064 0 4.596.749 5.697.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21z" />
        <Path d="M19 10h-1" strokeLinecap="round" />
      </G>
    </Svg>
       </View>
       <View>

          <Image 
            source={{
              uri: 'https://i.pinimg.com/originals/a6/f3/c5/a6f3c55ace829310723adcb7a468869b.png',
            }}
            alt=""
            className=" relative object-cover rounded-md h-[90px] w-[100px]"
          />
       </View>
            </View>
        </TouchableOpacity>
       
      </View>
      <TouchableOpacity
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
       <Text className="text-white text-center text-lg">Save</Text> 
      </TouchableOpacity>
       </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

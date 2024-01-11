import { View, Text, SafeAreaView,FlatList , ScrollView, TouchableOpacity, TextInput,KeyboardAvoidingView, Platform  } from "react-native";
import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import globalStyels from "../../../../styles/globalStyels";
import Svg, { Path } from 'react-native-svg';

const index = () => {

     

  return (
    <SafeAreaView  style={globalStyels.droidSafeArea}>
      <Navbar /> 
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}> 

      <ScrollView className="w-full" showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <View  className=" flex flex-col items-center justify-center w-full px-5 py-4 mx-auto  text-center">
      <View  className="text-center w-full">
            <Text className="mt-8 text-2xl font-semibold tracking-tight text-black lg:text-3xl ">
            Get In Touch
            </Text>
            <Text className=" mt-4 text-base text-gray-400 ">
            Have a specific inquiry or looking to explore new opportunities? Our experienced team is ready to engage with you.

         
            </Text>

            <View className="mt-8 space-y-4">
        <TextInput
          placeholder="Full Name"
          className="px-2 py-3 bg-white w-full text-sm border-b-2 focus:border-[#333] outline-none"
        />
        <TextInput
          placeholder="Street"
          className="px-2 py-3 bg-white w-full text-sm border-b-2 focus:border-[#333] outline-none"
        />
        <View style="flexDirection: 'row'; justifyContent: 'space-between';">
          <TextInput
            placeholder="City"
            className="px-2 py-3 bg-white w-full text-sm border-b-2 focus:border-[#333] outline-none"
          />
     
        </View>
        <TextInput
          placeholder="Phone No."
          className="px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#333] outline-none"
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Email"
          className="px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#333] outline-none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Write Message"
          className="px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#333] outline-none"
          multiline={true}
        numberOfLines={20}

        />
      </View>
      <TouchableOpacity
        onPress={() => {
          // Add logic for handling button press here
        }}
      >
        <View         className=" flex flex-row mt-2  text-center items-center justify-center text-sm w-full rounded px-4 py-4  font-semibold bg-[#333]  hover:bg-[#222]">

          <Text>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              fill="#fff"
              viewBox="0 0 548.244 548.244"
            >
              <Path
                fillRule="evenodd"
                d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                clipRule="evenodd"
                data-original="#000000"
              />
            </Svg>
          </Text>
        <Text className="text-white">Send Message</Text>
        </View>
      </TouchableOpacity>
          </View>
      
  
 
    

  
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default index;

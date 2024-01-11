import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import globalStyels from "../../../../styles/globalStyels";
import User from "../../../../assets/user.jpg";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  G,
} from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function index() {
  return (
    <SafeAreaView style={globalStyels.droidSafeArea}>
      <Navbar />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-10 w-full">
          <View>
            <View className="flex flex-row items-center  px-4 gap-4">
              <Image
                source={User}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <View>
                <Text className="text-[18px] font-semibold  w-full text-gray-600">
                  Prince Ajuzie
                </Text>
                <Text className="text-[18px] text-gray-600">
                  princeajuzie12@gmail.com
                </Text>
                <View className="flex flex-row items-center gap-1">
                <Text className="text-[18px] font-semibold   text-gray-600">
                    Basic
                  </Text>
                  <View>

                  <Svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 120 120"
                    id="Layer_1"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000"
                  >
                    <G id="SVGRepo_iconCarrier">
                      <Path
                        d="M75.7 58.3L60 66.2 44.3 58.3 24.9 97.1 37 95.9 43.2 106.3 60 72.9 76.8 106.3 83 95.9 95.1 97.1z"
                        fill="#ff97b7"
                      />
                      <Path
                        d="M92.8 38.2l-1.1 4.2c-.3 1.4-.1 2.9.6 4.2l2.1 3.8c1.3 2.2.9 5.1-1.1 6.9l-3.2 2.9c-1.1 1-1.7 2.4-1.8 3.8l-.2 4.3c-.2 2.6-2 4.8-4.6 5.2l-4.3.8c-1.4.3-2.7 1.1-3.6 2.2L73.1 80c-1.5 2.1-4.3 2.9-6.6 1.9l-4-1.7c-1.4-.6-2.8-.6-4.2 0l-4.1 1.6c-2.4.9-5.2.1-6.7-2L45 76.1c-.8-1.2-2.1-2-3.5-2.3l-4.2-.8c-2.6-.5-4.4-2.7-4.5-5.3l-.2-4.4c0-1.5-.6-2.8-1.7-3.8l-3.2-3c-1.9-1.8-2.3-4.6-.9-6.9l2.3-3.8c.8-1.2 1-2.7.6-4.1l-1-4.3c-.6-2.5.6-5.1 2.9-6.3l3.9-1.9c1.3-.6 2.3-1.8 2.8-3.1l1.4-4.2c.9-2.4 3.3-4 5.9-3.7l4.4.4c1.4.2 2.9-.2 4.1-1.2l3.4-2.7c2-1.6 4.9-1.6 6.9.1l3.4 2.7c1.2.9 2.6 1.4 4 1.2l4.3-.4c2.6-.3 5 1.3 5.8 3.8l1.3 4.1c.4 1.4 1.5 2.6 2.8 3.2l3.9 2c2.3 1.7 3.6 4.3 2.9 6.8z"
                        fill="#ffc54d"
                      />
                      <Circle cx={60} cy={48.6} r={25.4} fill="#e8b04b" />
                    </G>
                  </Svg>
                  </View>
                </View>
              </View>
            </View>

          <View className="mx-3">

            <View className=" py-6 px-4 mt-14 rounded-lg shadow-xl w-full bg-blue-600">
      <View className="flex flex-col items-start justify-between gap-2 mb-3 lg:flex-col-reverse rounded-sm">
        <View className="order-first inline-block px-4 py-2 text-xs font-semibold tracking-wider text-white bg-blue-900 rounded-full  lg:order-none bg-opacity-2">
          <Text className="text-white">

          Membership Package
          </Text>
        </View>
      </View>
      <Text className="text-white text-sm mb-2">
        Subscribe to the Pro Plan and unlock exclusive benefits.
      </Text>
      <TouchableOpacity
        className="block mt-4 px-8 py-2 text-sm font-semibold text-center text-white transition bg-blue-400 duration-100 rounded-lg bg-opacity-20 hover:bg-opacity-30 md:text-sm"
        onPress={() => {
          // Add your navigation logic or any action here
        }}
      >
        <Text className="text-center text-white">Subscribe</Text>
      </TouchableOpacity>
    </View>
          </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

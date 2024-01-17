import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import globalStyels from "../../../../../../styles/globalStyels";
import Svg, { Path, G } from "react-native-svg";
import { useRouter } from "expo-router";
import Product from "../../../../../../assets/product.jpg";
import * as ImagePicker from "expo-image-picker";
const index = () => {
  const router = useRouter();
  const SelectImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.canceled) {
      }
    } catch (error) {}
  };

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
          <View className="px-4 w-full gap-4 mt-7">
            <Text className="text-xl mt-8 ">
              Hey 👋 PrinceAjuize welcome back{" "}
            </Text>

            <View className="flex flex-col gap-4 ">
              <View className="flex flex-row   items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
                <View className="p-3 rounded-full bg-indigo-600 bg-opacity-75 mr-5">
                  <Svg
                    width="64px"
                    height="64px"
                    viewBox="0 -0.5 25 25"
                    fill="none"
                    color="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.924 7.281a2.279 2.279 0 11-4.558-.004 2.279 2.279 0 014.558.004zM14.997 12.919h-4.7a3.042 3.042 0 000 6.081h4.7a3.042 3.042 0 000-6.081v0zM20.688 9.024a1.743 1.743 0 11-3.486-.002 1.743 1.743 0 013.486.002v0zM4.334 9.024a1.743 1.743 0 103.486 0 1.743 1.743 0 00-3.486 0v0z"
                      stroke="#fff"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M19.437 12.839a.75.75 0 000 1.5v-1.5zm1.307.75l.015-.75h-.015v.75zm0 4.651v.75h.015l-.015-.75zm-1.307-.75a.75.75 0 000 1.5v-1.5zM5.585 14.339a.75.75 0 000-1.5v1.5zm-1.307-.75v-.75h-.016l.016.75zm0 4.651l-.016.75h.016v-.75zm1.307.75a.75.75 0 000-1.5v1.5zm13.852-4.651h1.307v-1.5h-1.307v1.5zm1.291 0a1.576 1.576 0 011.543 1.575h1.5a3.076 3.076 0 00-3.012-3.075l-.03 1.5zm1.543 1.575c0 .858-.685 1.558-1.543 1.576l.031 1.5a3.076 3.076 0 003.012-3.075h-1.5zm-1.527 1.576h-1.307v1.5h1.307v-1.5zm-15.16-4.651H4.279v1.5h1.307v-1.5zm-1.322 0a3.076 3.076 0 00-3.012 3.075h1.5c0-.857.686-1.557 1.543-1.575l-.03-1.5zM1.25 15.914a3.076 3.076 0 003.012 3.076l.031-1.5a1.576 1.576 0 01-1.543-1.575h-1.5zm3.028 3.076h1.307v-1.5H4.278v1.5z"
                      fill="#fff"
                    />
                  </Svg>
                </View>
                <View className="flex flex-col  item-center gap-2">
                  <Text className="text-2xl font-semibold text-gray-700">
                    4644
                  </Text>
                  <Text className="text-gray-500 text-base">New User</Text>
                </View>
              </View>
              <View className="flex flex-row   items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
                <View className="p-3 rounded-full bg-orange-600 bg-opacity-75 mr-5">
                  <Svg
                    className=" text-white"
                    viewBox="0 0 28 28"
                    fill="none"
                    width="64px"
                    height="64px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M4.2 1.4a1.4 1.4 0 000 2.8h1.707l.428 1.711.014.059 1.9 7.6L7 14.82c-1.763 1.764-.514 4.78 1.98 4.78H21a1.4 1.4 0 000-2.8H8.98l1.4-1.4h9.22a1.4 1.4 0 001.252-.774l4.2-8.4A1.4 1.4 0 0023.8 4.2H8.793l-.435-1.74A1.4 1.4 0 007 1.4H4.2zM22.4 23.1a2.1 2.1 0 11-4.2 0 2.1 2.1 0 014.2 0zM9.1 25.2a2.1 2.1 0 100-4.2 2.1 2.1 0 000 4.2z"
                      fill="currentColor"
                    />
                  </Svg>
                </View>
                <View className="flex flex-col  item-center gap-2">
                  <Text className="text-2xl font-semibold text-gray-700">
                    3453
                  </Text>
                  <Text className="text-gray-500 text-base">Total Orders</Text>
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

import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Svg } from "react-native-svg";
import Path from "react-native-svg";



export default function App() {
  return (
    <View className=" bg-white">
      <View className="flex items-center border border-gray-200 relative w-full mt-12 p-2">
        <View className="relative grow  flex flex-row justify-between rounded-r-lg w-fit pl-2">
          <TextInput
            className="outline-none grow text-sm bg-transparent text-gray-900  placeholder-gray-400"
            placeholder="Search here..."
          />
          <TouchableOpacity className="bg-blue-400 w-8 flex items-center justify-center rounded-r-md shrink-0">
            <Svg
              className="w-4 h-full "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <Path
                stroke="white"
                stroke-linecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
      <Text className="text-blue-500">Klipto Inc! </Text>
      <Text>@2024 We no dey gree for anybody 😂😂😂</Text>
      <Text>Oga you gats gree</Text>
      <StatusBar style="auto" />
    </View>
  );
}


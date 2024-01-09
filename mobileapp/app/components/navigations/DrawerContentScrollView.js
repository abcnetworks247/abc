import { View, Text, Image } from "react-native";
import React from "react";
import { DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "../../../assets/AbcstudioNo.png";
import Svg, { Path } from "react-native-svg";

const DrawerContentScrollView = () => {
  const router = useRouter();
  return (
    <View className="mt-[-10px]">
      <DrawerItem
        label={"Abc Studio"}
        labelStyle={{
          marginLeft: -20,
          fontSize: 18,
          marginTop: -20,
          display: "none",
        }}
        icon={({ color, size }) => (
          <Image source={Logo} style={{ width: 100, height: 80 }} />
        )}
      ></DrawerItem>
      {/* <DrawerItem label={'Main Menu'} labelStyle={{ margin: -20, fontSize: 15 }}/> */}
      <DrawerItem
        labelStyle={{ marginLeft: -20, fontSize: 18 }}
        label={"Home"}
        icon={({ color, size }) => (
          <Svg viewBox="0 0 24 24" fill="currentColor" height="2em" width="2em">
            <Path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 00.707-1.707l-9-9a.999.999 0 00-1.414 0l-9 9A1 1 0 003 13zm9-8.586l6 6V15l.001 5H6v-9.586l6-6z" />
            <Path d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18z" />
          </Svg>
        )}
        onPress={() => router.push("/home")}
      />

      <DrawerItem
        labelStyle={{ marginLeft: -20, fontSize: 18 }}
        label={"Store"}
        icon={({ color, size }) => (
          <Svg
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 3a2 2 0 00-2 2v1.838l-1.51 4.53A2.001 2.001 0 003 13.963V20a2 2 0 002 2h14a2 2 0 002-2v-6.037a2.001 2.001 0 001.51-2.595L21 6.837V5a2 2 0 00-2-2H5zm10 17h4v-6H5v6h4v-3a3 3 0 116 0v3zm-4 0h2v-3a1 1 0 10-2 0v3zm-7.613-8l1.334-4H6.32l-.667 4H3.387zm4.293 0l.667-4H11v4H7.68zM13 12V8h2.653l.667 4H13zm5.347 0l-.667-4h1.6l1.333 4h-2.266zM19 5v1H5V5h14z"
              fill="#000"
            />
          </Svg>
        )}
        onPress={() => router.push("/store")}
      />
      <DrawerItem
        labelStyle={{ marginLeft: -20, fontSize: 18, backgroundColor: "#DC2626", paddingHorizontal: 3, paddingVertical: 3, width: 90,  borderRadius: 5, textAlign: "center", color: "#FFFFFF",}}
        label={"Live"}
        icon={({ color, size }) => (
          <Svg
          fill="none"
          stroke="#DC2626"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          height="2em"
          width="2em"
        >
          <Path stroke="none" d="M0 0h24v24H0z" />
          <Path d="M13 12 A1 1 0 0 1 12 13 A1 1 0 0 1 11 12 A1 1 0 0 1 13 12 z" />
          <Path d="M17 12 A5 5 0 0 1 12 17 A5 5 0 0 1 7 12 A5 5 0 0 1 17 12 z" />
          <Path d="M15.9 20.11v.01M19.04 17.61v.01M20.77 14v.01M20.77 10v.01M19.04 6.39v.01M15.9 3.89v.01M12 3v.01M8.1 3.89v.01M4.96 6.39v.01M3.23 10v.01M3.23 14v.01M4.96 17.61v.01M8.1 20.11v.01M12 21v.01" />
        </Svg>
        )}
        onPress={() => router.push("/store")}
      />
    </View>
  );
};

// const styles = StyleSheet.cr

export default DrawerContentScrollView;

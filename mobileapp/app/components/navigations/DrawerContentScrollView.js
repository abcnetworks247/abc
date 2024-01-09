import { View, Text, Image } from "react-native";
import React from "react";
import { DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "../../../assets/AbcstudioNo.png";
import Svg, { Path } from "react-native-svg";
import User from "../../../assets/user.jpg"

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
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 512 512"
            className="w-5 h-5 opacity-75"
            height="2em"
            width="2em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={32}
              d="M448 448V240m-384 0v208M382.47 48H129.53c-21.79 0-41.47 12-49.93 30.46L36.3 173c-14.58 31.81 9.63 67.85 47.19 69h2c31.4 0 56.85-25.18 56.85-52.23 0 27 25.46 52.23 56.86 52.23s56.8-23.38 56.8-52.23c0 27 25.45 52.23 56.85 52.23s56.86-23.38 56.86-52.23c0 28.85 25.45 52.23 56.85 52.23h1.95c37.56-1.17 61.77-37.21 47.19-69l-43.3-94.54C423.94 60 404.26 48 382.47 48zM32 464h448M136 288h80a24 24 0 0124 24v88h0-128 0v-88a24 24 0 0124-24zm152 176V312a24 24 0 0124-24h64a24 24 0 0124 24v152"
            />
          </Svg>
        )}
        onPress={() => router.push("/store")}
      />

      <DrawerItem
        labelStyle={{
          marginLeft: -20,
          fontSize: 18,
          backgroundColor: "#DC2626",
          paddingHorizontal: 3,
          paddingVertical: 3,
          width: 90,
          borderRadius: 5,
          textAlign: "center",
          color: "#FFFFFF",
        }}
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

      <DrawerItem
        labelStyle={{ marginLeft: -20, fontSize: 18 }}
        label={"Membership"}
        icon={({ color, size }) => (
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-75"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M0 0h24v24H0z" stroke="none" />
            <Path d="M7 11a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
            <Path d="M12 14a2 2 0 104 0 2 2 0 10-4 0M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2" />
          </Svg>
        )}
        onPress={() => router.push("/membership")}
      />
      <DrawerItem
        labelStyle={{ marginLeft: -20, fontSize: 18 }}
        label={"About"}
        icon={({ color, size }) => (
          <Svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 512 512"
            className=" text-black opacity-75"
            height="2em"
            width="2em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              fill="none"
              strokeMiterlimit={10}
              strokeWidth={32}
              d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z"
            />
            <Path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={32}
              d="M220 220h32v116"
            />
            <Path
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit={10}
              strokeWidth={32}
              d="M208 340h88"
            />
            <Path
              d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"
              stroke="none"
            />
          </Svg>
        )}
        onPress={() => router.push("/about")}
      />
      <DrawerItem
        labelStyle={{ marginLeft: -20, fontSize: 18 }}
        label={"Contact"}
        icon={({ color, size }) => (
          <Svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 24 24"
          className=" text-black opacity-75"
          height="2em"
          width="2em"
          xmlns="http://www.w3.org/2000/svg"
         
        >
          <Path fill="none" d="M0 0h24v24H0V0z" stroke="none" />
          <Path
            d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM4 0h16v2H4zm0 22h16v2H4zm8-10a2.5 2.5 0 000-5 2.5 2.5 0 000 5zm0-3.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 7.49C17 13.9 13.69 13 12 13s-5 .9-5 2.99V17h10v-1.01zm-8.19-.49c.61-.52 2.03-1 3.19-1 1.17 0 2.59.48 3.2 1H8.81z"
            stroke="none"
          />
        </Svg>
        )}
        onPress={() => router.push("/contact")}
      />
      <DrawerItem
        labelStyle={{ marginLeft: -20, fontSize: 18 }}
        label={"Wishlist"}
        icon={({ color, size }) => (
          <Svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 512 512"
   
          height="2em"
          width="2em"
          xmlns="http://www.w3.org/2000/svg"
 
        >
          <Path
            d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
            stroke="none"
          />
        </Svg>
        )}
        onPress={() => router.push("/Wishlist")}
      />
      <DrawerItem
        labelStyle={{ marginLeft: -20, fontSize: 18 }}
        label={"Cart"}
        icon={({ color, size }) => (
          <Svg
      xmlns="http://www.w3.org/2000/svg"
      height="2em"
      width="2em"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
     
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Path d="M7 10l5-6 5 6M21 10l-2 8a2 2.5 0 01-2 2H7a2 2.5 0 01-2-2l-2-8z" />
      <Path d="M10 15a2 2 0 104 0 2 2 0 10-4 0" />
    </Svg>
        )}
        onPress={() => router.push("/Cart")}
      />


      <View className="mt-10">


      <DrawerItem
        labelStyle={{ marginLeft: -20, fontSize: 18 }}
        label={"Prince Ajuzie"}
        icon={({ color, size }) => (
        <Image source={User} className="w-10 h-10 rounded-full border-2 border-[#f5f5f5]"  />
        )}
        onPress={() => router.push("/profile")}
      />
      </View>
    </View>
  );
};

// const styles = StyleSheet.cr

export default DrawerContentScrollView;

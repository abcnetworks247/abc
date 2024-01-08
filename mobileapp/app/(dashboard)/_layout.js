import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Path, G } from "react-native-svg";
import { View } from "react-native";
import Navbar from "../components/navbar/Navbar";
export default function layout() {
  return (
   <>
       <Navbar />
    <Tabs  screenOptions={{
      tabBarStyle: {
        opacity: 5,
        // backgroundColor: "red",

      }
    }} > 

      <Tabs.Screen 
        name="home/index"
        options={{
          header: () => null,
          title: "Home",
          tabBarActiveBackgroundColor: "#fff",
    
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="home-outline"
              size={30}
              color="black"
            />
          ),
          animation: "slide_from_right",
        }}
      />

      <Tabs.Screen
        name="store/index"
        options={{
          header: () => null,
          title: "store",
          tabBarIcon: () => (
            <Svg
              width="24px"
              height="24px"
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
          ),
        }}
      />
      <Tabs.Screen
        name="cart/index"
        options={{
          header: () => null,
          title: "cart",
          tabBarIcon: () => (
            <Svg
              width="64px"
              height="64px"
              viewBox="-2.4 -2.4 28.80 28.80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <G stroke="#1C274C" strokeWidth={1.5}>
                <Path
                  d="M2 3l.265.088c1.32.44 1.98.66 2.357 1.184C5 4.796 5 5.492 5 6.883V9.5c0 2.828 0 4.243.879 5.121.878.879 2.293.879 5.121.879h2m6 0h-2"
                  strokeLinecap="round"
                />
                <Path d="M7.5 18a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM16.5 18a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                <Path
                  d="M5 6h3m-2.5 7h10.522c.96 0 1.439 0 1.815-.248.375-.248.564-.688.942-1.57l.429-1c.81-1.89 1.214-2.833.77-3.508C19.532 6 18.505 6 16.45 6H12"
                  strokeLinecap="round"
                />
              </G>
            </Svg>
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          header: () => null,
          title: "Profile",
          tabBarIcon: () => (
            <Svg
              width="24px"
              height="24px"
              viewBox="0 0 30.586 30.586"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M572.138 221.245a15.738 15.738 0 00-21.065-.253l-1.322-1.5a17.738 17.738 0 0123.741.28z"
                transform="translate(-546.269 -195.397)"
              />
              <Path
                d="M561.464 204.152a4.96 4.96 0 11-4.96 4.96 4.966 4.966 0 014.96-4.96m0-2a6.96 6.96 0 106.96 6.96 6.96 6.96 0 00-6.96-6.96z"
                transform="translate(-546.269 -195.397)"
              />
              <Path
                d="M561.562 197.4a13.293 13.293 0 11-13.293 13.293 13.308 13.308 0 0113.293-13.293m0-2a15.293 15.293 0 1015.293 15.293 15.293 15.293 0 00-15.293-15.293z"
                transform="translate(-546.269 -195.397)"
              />
            </Svg>
          ),
        }}
      />
    </Tabs>
   </>
  );
}

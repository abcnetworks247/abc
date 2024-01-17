import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
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

import { Link } from "expo-router";

export default function index() {
  const data = [
    {
      id: 1,
      name: "Profile",
      icon: (
        <Svg
          width="24px"
          height="24px"
          className="w-5 h-5 mr-3"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M5 21a7 7 0 1114 0M16 7a4 4 0 11-8 0 4 4 0 018 0z"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      link: "/profile/userprofile",
    },
    {
      id: 2,
      name: "Orders",
      icon: (
        <Svg
          width="24px"
          height="24px"
          className="w-5 h-5 mr-3"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <G stroke="#1C274C" strokeWidth={1.5}>
            <Path d="M7.5 18a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM16.5 18a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
            <Path
              d="M11 10.8l1.143 1.2L15 9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M2 3l.261.092c1.302.457 1.953.686 2.325 1.231.372.545.372 1.268.372 2.715V9.76c0 2.942.063 3.912.93 4.826.866.914 2.26.914 5.05.914H12m4.24 0c1.561 0 2.342 0 2.894-.45.551-.45.709-1.214 1.024-2.743l.5-2.424c.347-1.74.52-2.609.076-3.186-.443-.577-1.96-.577-3.645-.577h-6.065m-6.066 0H7"
              strokeLinecap="round"
            />
          </G>
        </Svg>
      ),
      link: "/profile/orders",
    },
    {
      id: 3,
      name: "Edit Profile",
      icon: <Svg
      width="24px"
      className="w-5 h-5 mr-3"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h2m6-16h2a2 2 0 012 2v2M14.902 20.334l-2.187.438.438-2.187a1 1 0 01.273-.511L17.5 14l2-2 1.987 1.987-2 2-4.074 4.074a1 1 0 01-.511.273zM9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z" />
      </G>
    </Svg>,
      link: "/profile/editprofile",
    },
    {
      id: 4,
      name: "Change Password",
      icon: <Svg
      width="24px"
      height="24px"
      className="w-5 h-5 mr-3"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M464.433 147.54a9.899 9.899 0 00-17.56 9.14 214.264 214.264 0 01-38.769 251.42c-83.856 83.848-220.315 83.875-304.207-.008a9.896 9.896 0 00-16.893 7.005v56.9a9.896 9.896 0 0019.793 0v-34.55A234.95 234.95 0 00464.433 147.54zM103.897 103.902c83.882-83.874 220.341-83.865 304.207-.009a9.89 9.89 0 0016.892-6.996v-56.9a9.896 9.896 0 00-19.793 0v34.55C313.023-1.356 176.055 3.751 89.904 89.901a233.956 233.956 0 00-42.337 274.553 9.899 9.899 0 0017.56-9.14 214.249 214.249 0 0138.77-251.412z" />
      <Path d="M126.4 254.555v109.44a27.08 27.08 0 0027 27h205.2a27.077 27.077 0 0027-27v-109.44a27.078 27.078 0 00-27-27H153.4a27.08 27.08 0 00-27 27zM328 288.13a21.146 21.146 0 11-21.146 21.146A21.167 21.167 0 01328 288.13zm-72 0a21.146 21.146 0 11-21.146 21.146A21.167 21.167 0 01256 288.13zm-72 0a21.146 21.146 0 11-21.146 21.146A21.167 21.167 0 01184 288.13zM343.653 207.756v-36.002a87.653 87.653 0 00-175.306 0v36.002h19.793v-36.002a67.86 67.86 0 01135.72 0v36.002z" />
    </Svg>,
      link: "/profile/changepassword",

    },
    {
      id: 5,
      name: "Close Account",
      icon:  <Svg
      width="24px"
      className="w-5 h-5 mr-3"
      height="24px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"

    >
      <Path
        d="M10 0l-.395.016-.39.046-.387.077-.379.105-.37.137-.358.164-.344.191-.328.22-.31.241-.29.268-.267.289-.245.307-.218.326-.194.343-.166.356-.134.37-.108.378-.078.385-.045.39L4.98 5l.015.613.043.612.076.607.106.604.135.597.164.592.191.58.22.572.25.559.276.549.184.308.209.291.062.098.037.107.01.116-.016.115-.043.105-.062.096-.086.076-.102.057-.109.033-.72.133-.714.156-.709.18-.7.205-.694.23-.686.254-.279.125-.264.153-.248.18-.228.2-.205.225-.182.242-.156.262-.131.275-.178.471-.15.479-.123.486-.096.492-.068.496-.008.205.02.201.046.198.073.19.097.177.12.164.144.145.158.125.178.101.187.08.198.049 1.158.209 1.164.178 1.168.148 1.172.12 1.174.09 1.177.06L9.412 20h1.176l.95-.023a2.008 2.008 0 01-.058-.381 1.89 1.89 0 01.09-.621l-.994.025H9.422l-1.15-.03-1.15-.058-1.15-.086-1.148-.117-1.14-.146-1.141-.174-1.133-.203-.117-.04-.107-.064-.084-.092-.061-.105-.033-.121-.002-.123.062-.444.084-.435.11-.434.133-.426.158-.418.101-.207.123-.199.145-.18.166-.162.183-.142.2-.121.21-.096.653-.242.66-.219.668-.195.676-.172.68-.149.683-.127.217-.052.207-.084.193-.114.172-.14.149-.164.127-.184.093-.201.065-.213.033-.219v-.222l-.035-.22-.065-.212-.095-.201-.125-.184-.158-.218-.137-.23-.256-.505-.229-.515-.203-.526-.175-.535-.15-.543-.126-.55-.096-.555-.07-.559-.04-.563-.017-.562.018-.35.045-.345.076-.34.106-.334.134-.322L6.52 3l.19-.293.213-.277.236-.258.26-.236.277-.211.295-.188.31-.162.325-.133.334-.105.344-.075.347-.046L9.998 1l.352.016.347.046.342.075.334.105.324.133.313.162.295.188.277.21.26.237.234.258.215.277.19.293.16.31.134.323.106.334.076.34.045.345.016.35-.014.562-.041.563-.07.559-.098.554-.123.551-.15.543-.176.535-.205.526-.229.515-.254.504-.137.23-.158.22-.127.183-.093.201-.067.213-.035.219v.222l.033.215c.282-.284.64-.506 1.049-.588l.03-.045.21-.29.184-.31.275-.548.248-.559.221-.572.193-.58.164-.592.135-.597.104-.604.076-.607.045-.612L15.02 5l-.013-.39-.047-.391-.078-.385-.106-.379-.136-.37-.166-.355-.192-.343-.219-.326-.246-.307-.265-.29-.29-.267-.31-.242-.328-.219-.346-.191-.357-.164-.37-.137-.378-.105-.389-.077-.39-.046L10 0zm3.49 12.99a.5.5 0 00-.35.858l2.647 2.646-2.646 2.647a.5.5 0 10.707.707l2.646-2.647 2.647 2.647a.5.5 0 10.707-.707L17.2 16.494l2.647-2.646a.5.5 0 00-.364-.858.5.5 0 00-.343.15l-2.647 2.647-2.646-2.646a.5.5 0 00-.358-.15z"
        fill="#222"
        fillOpacity={1}
        stroke="none"
        strokeWidth={0}
      />
    </Svg>,
      link: "/profile/closeaccount",
    },
    {
      id: 6,
      name: "logout",
      icon: <Svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      className="w-5 h-5 mr-3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G
        stroke="#292D32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M8.9 7.56c.31-3.6 2.16-5.07 6.21-5.07h.13c4.47 0 6.26 1.79 6.26 6.26v6.52c0 4.47-1.79 6.26-6.26 6.26h-.13c-4.02 0-5.87-1.45-6.2-4.99M15 12H3.62M5.85 8.65L2.5 12l3.35 3.35" />
      </G>
    </Svg>,
      link: "/profile/logout",
    },
  ];
  return (
    <SafeAreaView style={globalStyels.droidSafeArea}>
      <Navbar />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-10 w-full px-4">
          <View>
            <View className="flex flex-row items-center   gap-4">
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


            <View className=" mt-8 ">
              {data.map(({name, icon, link, id})=>{
                return(
                    <View className=" border-gray-300 border-b-2" key={id}>

                  <Link href={link} className="flex items-center  border-gray-300 border-b-2" >
                  
                 <View className="flex flex-row item-center  px-4 py-3 rounded-lg " key={name}>
                  
                 {icon}
                <Text className="text-lg text-gray-600">{name}</Text>
                 </View>
                  </Link>
                    </View>
                )
              })

              }
            </View>
            <View className="">
              <View className=" py-6 px-4 mt-14 rounded-lg shadow-xl w-full bg-blue-600">
                <View className="flex flex-col items-start justify-between gap-2 mb-3 lg:flex-col-reverse rounded-sm">
                  <View className="order-first inline-block px-4 py-2 text-xs font-semibold tracking-wider text-white bg-blue-900 rounded-full  lg:order-none bg-opacity-2">
                    <Text className="text-white">Membership Package</Text>
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

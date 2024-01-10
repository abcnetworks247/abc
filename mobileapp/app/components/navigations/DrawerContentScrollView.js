import { View, Text, Image } from "react-native";
import React from "react";
import { DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "../../../assets/AbcstudioNo.png";
import Svg, { Path, G } from "react-native-svg";
import User from "../../../assets/user.jpg";
const DrawerContentScrollView = () => {
  const router = useRouter();
  return (
    <View className="mt-[10px]  ">
      <View className="flex flex-col justify-between gap-28 ">
        <View>
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
              <MaterialCommunityIcons
                name="home-outline"
                size={30}
                color="black"
              />
            )}
            onPress={() => router.push("/home")}
          />

          <DrawerItem
            labelStyle={{ marginLeft: -20, fontSize: 18 }}
            label={"Store"}
            icon={({ color, size }) => (
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
              borderRadius: 10,
              textAlign: "center",
              color: "#FFFFFF",
            }}
            label={"Live"}
            icon={({ color, size }) => (
              <Svg
                width="27px"
                height="27px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <G fill="#C12127">
                  <Path d="M12.98 21.953a10.12 10.12 0 01-1.96 0l.193-1.991a8.1 8.1 0 001.574 0l.193 1.99zM9.096 21.572l.58-1.914a7.947 7.947 0 01-1.446-.6l-.945 1.763c.573.307 1.179.56 1.811.75zM5.656 19.73l1.27-1.545a8.062 8.062 0 01-1.111-1.11L4.27 18.343c.415.506.88.97 1.386 1.386zM3.179 16.715l1.763-.944a7.938 7.938 0 01-.6-1.447l-1.914.58c.192.632.444 1.238.751 1.81zM2.047 12.98l1.991-.193a8.12 8.12 0 010-1.574l-1.99-.193a10.123 10.123 0 000 1.96zM2.428 9.096l1.914.58c.153-.505.355-.989.6-1.446l-1.763-.945a9.938 9.938 0 00-.75 1.811zM4.27 5.656l1.545 1.27a8.06 8.06 0 011.11-1.111L5.657 4.27c-.506.415-.97.88-1.386 1.386zM7.285 3.179l.945 1.763a7.938 7.938 0 011.446-.6l-.58-1.914a9.938 9.938 0 00-1.81.751zM11.02 2.047a10.123 10.123 0 011.96 0l-.193 1.991a8.12 8.12 0 00-1.574 0l-.193-1.99zM14.904 2.428l-.58 1.914c.505.153.989.355 1.447.6l.944-1.763a9.936 9.936 0 00-1.811-.75zM18.344 4.27l-1.27 1.545c.406.333.778.705 1.111 1.11l1.545-1.269a10.06 10.06 0 00-1.386-1.386zM20.821 7.285l-1.763.945c.245.457.447.941.6 1.446l1.914-.58a9.937 9.937 0 00-.751-1.81zM21.953 11.02l-1.991.193a8.1 8.1 0 010 1.574l1.99.194a10.123 10.123 0 000-1.961zM21.572 14.904l-1.914-.58a7.947 7.947 0 01-.6 1.447l1.763.944c.307-.573.56-1.179.75-1.811zM19.73 18.344l-1.545-1.27a8.063 8.063 0 01-1.11 1.111l1.269 1.545c.506-.415.97-.88 1.386-1.386zM16.715 20.821l-.944-1.763a7.947 7.947 0 01-1.447.6l.58 1.914a9.935 9.935 0 001.81-.751z" />
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 12a3 3 0 116 0 3 3 0 01-6 0zm3 1a1 1 0 110-2 1 1 0 010 2z"
                  />
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 6a6 6 0 100 12 6 6 0 000-12zm-4 6a4 4 0 108 0 4 4 0 00-8 0z"
                  />
                </G>
              </Svg>
            )}
            onPress={() => router.push("/store")}
          />

          <DrawerItem
            labelStyle={{ marginLeft: -20, fontSize: 18 }}
            label={"Membership"}
            icon={({ color, size }) => (
              <Svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M3 21h18M3 18h18M5.823 3A2 2 0 113 5.823M5.823 3H18.177M5.823 3c-.874.003-1.354.026-1.731.218a2 2 0 00-.874.874c-.192.377-.215.857-.218 1.731m0 0V12.177m0 0A2 2 0 115.823 15M3 12.177c.003.875.026 1.354.218 1.731a2 2 0 00.874.874c.377.192.857.215 1.731.218m0 0H18.177M21 12.177A2 2 0 1018.177 15M21 12.178V6.2v-.377m0 6.354c-.003.875-.026 1.354-.218 1.731a2 2 0 01-.874.874c-.377.192-.857.215-1.731.218M21 5.823A2 2 0 1118.177 3M21 5.823c-.003-.874-.026-1.354-.218-1.731a2 2 0 00-.874-.874c-.377-.192-.857-.215-1.731-.218M14 9a2 2 0 11-4 0 2 2 0 014 0z"
                  stroke="#000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            )}
            onPress={() => router.push("/membership")}
          />
          <DrawerItem
            labelStyle={{ marginLeft: -20, fontSize: 18 }}
            label={"About"}
            icon={({ color, size }) => (
              <Svg
              width="27px"
              height="27px"
              viewBox="0 -0.5 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
      
            >
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.385 6.672l3.644-3.145a2.315 2.315 0 012.942 0l3.644 3.145c.374.31.593.768.6 1.253L18.5 18a3 3 0 01-3 3h-6a3 3 0 01-3-3l.282-10.075c.008-.485.228-.943.603-1.253z"
                stroke="#000"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M10.5 13.25a.75.75 0 000 1.5v-1.5zm4 1.5a.75.75 0 100-1.5v1.5zm-5 1.5a.75.75 0 000 1.5v-1.5zm6 1.5a.75.75 0 100-1.5v1.5zM11 8.5h.75H11zm1.208-1.47l-.146-.736.146.736zm1.678.898l-.693.286.693-.286zm-.553 1.82l-.417-.623.417.624zm-1.894-.187l-.53.53.53-.53zm-.939 5.19h4v-1.5h-4v1.5zm-1 3h6v-1.5h-6v1.5zm2.25-9.25a.75.75 0 01.604-.736l-.292-1.47A2.25 2.25 0 0010.25 8.5h1.5zm.604-.736a.75.75 0 01.839.45l1.386-.574a2.25 2.25 0 00-2.517-1.347l.292 1.471zm.839.45a.75.75 0 01-.277.91l.833 1.247a2.25 2.25 0 00.83-2.731l-1.386.573zm-.277.91a.75.75 0 01-.947-.094l-1.06 1.06a2.25 2.25 0 002.84.281l-.833-1.247zm-.947-.094a.75.75 0 01-.219-.53h-1.5c0 .596.237 1.168.659 1.59l1.06-1.06z"
                fill="#000"
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
              width="27px"
              height="27px"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
         
            >
              <Path d="M63 40.22c0-5.947-3.907-10.995-9.288-12.722v-6.015c0-10.57-10.164-19.842-21.752-19.842s-21.752 9.272-21.752 19.842v6.044C4.869 29.28 1 34.303 1 40.22c0 7.368 5.994 13.363 13.362 13.363h3.674a3.51 3.51 0 003.506-3.506v-19.71a3.504 3.504 0 00-3.336-3.493v-5.137c0-6.015 5.882-12.743 13.754-12.743 7.87 0 13.75 6.728 13.75 12.743v5.146c-1.813.133-3.252 1.636-3.252 3.484v19.71a3.51 3.51 0 003.506 3.506h2.673l-.005 4.56h-5.655a3.325 3.325 0 00-3.208-2.492H37.67c-1.835 0-3.328 1.493-3.328 3.328s1.493 3.328 3.328 3.328h2.098a3.325 3.325 0 003.106-2.165h6.756a1 1 0 001-.999l.006-5.61C57.538 53.017 63 47.25 63 40.22zM39.769 60.307H37.67c-.733 0-1.328-.596-1.328-1.328s.595-1.328 1.328-1.328h2.098c.732 0 1.328.596 1.328 1.328s-.596 1.328-1.328 1.328zM13.362 51.54C7.564 51.03 3 46.149 3 40.22S7.564 29.41 13.362 28.9v22.64zm6.18-21.173v19.71c0 .83-.676 1.506-1.506 1.506h-2.674V28.857h2.674c.83 0 1.506.678 1.506 1.51zM31.96 6.994c-8.245 0-15.754 7.027-15.754 14.743v5.12h-1.844c-.735 0-1.45.076-2.154.19v-5.564c0-9.505 9.23-17.842 19.752-17.842s19.752 8.337 19.752 17.842v5.552a13.333 13.333 0 00-2.074-.178H47.71v-5.12c0-7.715-7.507-14.743-15.75-14.743zm12.498 43.083v-19.71c0-.832.676-1.51 1.506-1.51h2.674v22.726h-2.674c-.83 0-1.506-.675-1.506-1.506zm6.18 1.463V28.9C56.437 29.41 61 34.293 61 40.22s-4.563 10.811-10.362 11.32z" />
            </Svg>
            )}
            onPress={() => router.push("/contact")}
          />
          <DrawerItem
            labelStyle={{ marginLeft: -20, fontSize: 18 }}
            label={"Wishlist"}
            icon={({ color, size }) => (
              <Svg
              width="27px"
              height="27px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6c-1.8-2.097-4.806-2.745-7.06-.825-2.255 1.92-2.573 5.131-.802 7.402 1.472 1.888 5.927 5.87 7.387 7.16.163.144.245.216.34.245a.456.456 0 00.258 0c.095-.029.176-.1.34-.245 1.46-1.29 5.915-5.272 7.387-7.16 1.77-2.27 1.492-5.502-.802-7.402C16.755 3.275 13.8 3.903 12 6z"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
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
              width="27px"
              height="27px"
              viewBox="0 0 24 24"
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
            )}
            onPress={() => router.push("/Cart")}
          />
        </View>

        <View className="">
          <DrawerItem
            labelStyle={{ marginLeft: -20, fontSize: 18 }}
            label={"Prince Ajuzie"}
            icon={({ color, size }) => (
              <Image
                source={User}
                className="w-[50px] h-[50px] rounded-full border-2 border-[#f5f5f5]"
              />
            )}
            onPress={() => router.push("/profile")}
          />
        </View>
      </View>
    </View>
  );
};

// const styles = StyleSheet.cr

export default DrawerContentScrollView;

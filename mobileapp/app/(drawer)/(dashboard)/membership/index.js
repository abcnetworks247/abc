import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import globalStyels from "../../../../styles/globalStyels";
import Svg, { Path } from "react-native-svg";

const index = () => {
  const Plans = [
    {
      name: "General - Copper Donor",
      price: "10 - 50",
      description:
        "This plan is ideal for individual users and hobbyists who are looking for essential functionalities to support.",
      features: ["Live Video"],
    },
    {
      name: "Prime -Silver Donor",
      price: "55 - 100",
      description:
        "This plan is ideal for individual users and hobbyists who are looking for essential functionalities to support.",
      features: ["Special Discount", "Live Video"],
    },
    {
      name: "Patrons 1 - Gold Donor",
      price: "105 - 200",
      description:
        "This plan is ideal for individual users and hobbyists who are looking for essential functionalities to support.",
      features: ["Special Discount", "Live Video", "Free Shipping"],
    },
    {
      name: "Patron 2 - Diamond Donor",
      price: "500",
      description:
        "This plan is ideal for individual users and hobbyists who are looking for essential functionalities to support.",
      features: [
        "Special Discount",
        "Live Video",
        "Free Shipping / Fast Delivery",
        "Free ABCTV App Download",
      ],
    },
    {
      name: "Patron 3 - Titanium Donor",
      price: "1000",
      description:
        "This plan is ideal for individual users and hobbyists who are looking for essential functionalities to support.",
      features: [
        "Special Discount",
        "Live Discount",
        "Free ABCTV App Download",
        "Free ABCTV Gadgets",
        "Free Shipping / Free Delivery",
      ],
    },
  ];

  return (
    <SafeAreaView style={globalStyels.droidSafeArea}>
      <Navbar />
      <ScrollView
        className="w-full"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View className=" flex flex-col items-center justify-center w-full px-8 py-4 mx-auto lg:pt-8 text-center">
          <View className="text-center">
            <Text className="mt-8 text-2xl font-semibold tracking-tight text-black lg:text-3xl text-center">
              Membership Packages
            </Text>
            <Text className=" mt-4 text-base text-gray-400 text-center">
              Every plan includes every feature, and can scale as your team
              does.
            </Text>
          </View>

          {Plans.map(({ price, name, description, features }) => {
            return (
              <View
                className="border-blue-600 rounded-2xl border  divide-gray-200  mt-10 w-full"
                key={name}
              >
                <View className="">
                  <View className="p-6">
                    <View className="flex justify-between">
                      <Text className="text-lg font-semibold text-gray-600">
                        {name}
                      </Text>
                    </View>
                    <Text className="mt-0.5 text-sm text-gray-500">
                      {description}
                    </Text>
                    <Text className="mt-9">
                      <Text className="text-2xl font-bold tracking-tight text-gray-900">
                        ${price}
                      </Text>
                      <Text className="text-base font-medium text-gray-500">
                        /mo
                      </Text>
                    </Text>
                    <TouchableOpacity className="flex justify-center text-center w-full py-3 mt-4 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring">
                      <Text className="text-center text-white">
                        Get started now
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="px-6 pt-6 pb-8">
                    <Text className="text-sm font-medium text-gray-900">
                      FEATURES
                    </Text>
                    {features.map((feature) => {
                      return (
                        <View className="flex space-x-3 flex-row mt-3"  key={feature}>
                          <View className="flex  justify-center items-center rounded-full bg-green-100 h-5 w-5">
                            <Svg
                              fill="#0285DE"
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              stroke="#0285DE"
                            >
                              <Path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm5.676 8.237l-6 5.5a1 1 0 01-1.383-.03l-3-3a1 1 0 111.414-1.414l2.323 2.323 5.294-4.853a1 1 0 111.352 1.474z" />
                            </Svg>
                          </View>
                          <Text className="text-sm text-gray-500">
                            {feature}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

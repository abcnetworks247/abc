import { View, Text, SafeAreaView } from "react-native";
import React from "react";

import HeroCarousel from "../../../components/carousel/herocarousel/heroCarousel";
import Navbar from "../../../components/navbar/Navbar";
import globalStyels from "../../../../styles/globalStyels";

const index = () => {
  return (
    <SafeAreaView style={globalStyels.droidSafeArea}>
      <View>
        <Navbar />

        <View className="flex flex-col">
          <HeroCarousel />
          <View>
            <Text>Home</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;

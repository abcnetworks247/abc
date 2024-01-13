import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";

import HeroCarousel from "../../../components/carousel/herocarousel/heroCarousel";
import Navbar from "../../../components/navbar/Navbar";
import globalStyels from "../../../../styles/globalStyels";
import HomeNews from "../../../components/news";


const index = () => {
  return (
    <SafeAreaView style={globalStyels.droidSafeArea}>
      <View>
        <ScrollView
          className=""
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}

        >
          <Navbar />
          
          <View className="container p-3 space-y-8">
            <HomeNews />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default index;

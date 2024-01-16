import { View, Text, SafeAreaView,ScrollView } from "react-native";
import React from "react";

import HeroCarousel from "../../../components/carousel/herocarousel/heroCarousel";
import Navbar from "../../../components/navbar/Navbar";
import globalStyels from "../../../../styles/globalStyels";

const index = () => {
  return (
    <SafeAreaView style={globalStyels.droidSafeArea}>
      <View>
        <Navbar />

        <ScrollView className="" showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <HeroCarousel />
         <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo explicabo sunt repudiandae facilis voluptas quae quaerat rerum neque cumque commodi amet maiores corporis, eaque aut distinctio ipsam perspiciatis expedita perferendis sit sint iste deserunt obcaecati minima? Ipsum, magnam fugit. Excepturi cupiditate expedita ducimus aspernatur eaque accusamus, hic a quidem enim repudiandae suscipit, ea provident ad id sunt asperiores dolorum! In odit tempora, quidem accusantium assumenda dolore ullam incidunt at numquam, natus expedita. Eaque sunt ipsam blanditiis quo doloribus laudantium fuga consequatur, velit minima, incidunt totam quam, voluptatem recusandae. Eveniet, saepe, doloremque omnis sapiente eligendi fuga molestiae amet adipisci unde ab magni! Rem optio adipisci necessitatibus aperiam nulla magnam delectus repellat alias esse sint laboriosam et quasi nobis voluptatum facere laudantium eaque aliquid, doloribus id? Facilis asperiores sunt et. Temporibus facilis, doloribus quam impedit amet rerum numquam quidem aspernatur dicta ea nesciunt, ullam id, quibusdam officiis magnam aliquid inventore blanditiis quaerat. Voluptatum natus nihil ab debitis aspernatur suscipit fugiat exercitationem recusandae, dignissimos pariatur possimus aperiam quas veritatis magni harum? Explicabo eligendi voluptatibus accusantium soluta quibusdam eius delectus iure assumenda minus quisquam earum quam libero, cum vel provident deleniti, praesentium omnis cupiditate dolorem, hic sequi dolores cumque. Quasi, voluptas facere! Rem, ea.
         </Text>
         
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default index;

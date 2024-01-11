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
import { Image } from "react-native";
import About from "../../../../assets/about.jpg";
const index = () => {
    const data = [
        {
          title: 'Digital campaigns',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.',
        },
        {
          title: 'Digital campaigns',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.',
        },
        {
          title: 'Digital campaigns',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.',
        },
        {
          title: 'Digital campaigns',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.',
        },
        {
          title: 'Digital campaigns',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.',
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
        <View className=" flex flex-col items-center justify-center w-full px-5 py-4 mx-auto lg:pt-8 text-center gap-4">
          <View className="text-center">
            <Text className="mt-8 text-2xl font-semibold tracking-tight text-black lg:text-3xl ">
              About Us
            </Text>
            <Text className=" mt-4 text-base text-gray-400 ">
              At Oravent, we go beyond decoration – we craft immersive
              experiences that tell a story. With a passion for transforming
              spaces, our dedicated team brings creativity and precision to
              every project, turning ordinary venues into extraordinary
              memories. From intimate gatherings to grand celebrations, we pride
              ourselves on attention to detail and a commitment to excellence.
              Let us be the brushstrokes to your canvas, creating a tapestry of
              beauty for your special moments. Welcome to a world where every
              event becomes a masterpiece.
            </Text>
          </View>
          <View className="w-full">
            <Image
              source={About}
              className="object-cover w-full pl-3 h-[300px] rounded-lg flex items-center justify-center  shadow-md"
            />
          </View>

          <View className="">
            <View className="text-center">
              <Text className="mt-8 text-2xl font-semibold tracking-tight text-black lg:text-3xl text-center">
                Kickstart your marketing
              </Text>
              <Text className=" mt-4 text-base text-gray-400 text-center">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Consequuntur aliquam doloribus nesciunt eos fugiat. Vitae
                aperiam fugit consequuntur saepe laborum.
              </Text>
            </View>
          </View>
     {data.map(({description, title, index})=>{
        return(

          <View className="shadow-2xl" key={index}>
            <TouchableOpacity
              className="block rounded-xl border border-gray-200 p-8 shadow-2xl transition hover:border-blue-500 hover:shadow-blue-500/10"
              href="/about#"
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <Path d="M12 14l9-5-9-5-9 5 9 5z" />
                <Path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </Svg>

              <Text className="mt-4 text-lg font-bold text-gray-900">
               {title}
              </Text>

              <Text className="mt-1 text-sm text-gray-600">
               {description}
              </Text>
            </TouchableOpacity>
          </View>
        )
     })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

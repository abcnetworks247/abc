import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import Dummy from "../../../../assets/dummy.jpg";

const HeroCarousel = () => {
  const width = Dimensions.get("window").width -10;
  return (
    <View >
      <View className="flex-1 pl-1 mt-2">
        <Carousel
          loop
          width={width}
          height={0}
          autoPlay={true}
          className="h-[450px] w-full"
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={1000}
        //   onSnapToItem={(index) => console.log("current index:", index)}
           
          renderItem={() => (
            <View
              style={{
                flex: 1,
                // borderWidth: 1,
                borderRadius: 20,
                justifyContent: "center",
                paddingRight: 5,
                paddingLeft: 5,
              }}
            >
              <View>
                <View className="">
                  <Image
                    source={Dummy}
                    height={500}
                    width={500}
                    borderRadius={50}
                    className="object-cover w-full h-60  rounded-lg"
                  />
                </View>
                <View>
                  <Text className="my-6 text-xl font-bold leading-tight text-gray-800 ">Amazing Discussion About Africa Economy</Text>
                </View>
                <View>
                    <Text className=" text-sm text-gray-600">
                    Economy of Africa With the exception of South Africa and the countries of North Africa, all of which have diversified production systems, the economy of most of Africa can be characterized as underdeveloped.
                    </Text>
                </View>
                <View>
                    <TouchableOpacity  className=" justify-center flex items-center py-3 mt-2  bg-blue-800 rounded-md w-[120px] ">
                        <Text className="text-white text-[15px]">
                            Read More
                        </Text>
                    </TouchableOpacity>
                </View>
              </View>
              {/* <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text> */}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HeroCarousel;

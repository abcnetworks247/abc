git 
import React from "react";
import { View, Text, ScrollView, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import ProductCard from "../../../components/store/ProductCard";
import ProductCard2 from "../../../components/store/ProductCard2";




const productsData = [
  {
    id: 1,
    name: "REID Lace-Up Shoes Multi",
    brand: "Aldo",
    price: 100,
    image: require("../../../../assets/products/1.png"),
    size: [38, 39, 40, 41, 42, 43, 44],
    colors: ["#FF5A5A", "#2878D5"],
    bigImage:
      "https://unsplash.com/photos/brown-nike-sneaker-on-yellow-textile-NOpsC3nWTzY",
  },
  {
    id: 2,
    name: "Prayrien Low Top Sneakers-Black",
    brand: "Aldo",
    price: 50,
    discount: 10,
    size: [39],
    colors: ["#FF5A5A"],
    image: require("../../../../assets/products/4.png"),
    bigImage:
      "https://unsplash.com/photos/a-person-tying-a-shoelace-on-a-tennis-court-R7PrDF2NLGk",
  },
  {
    id: 3,
    name: "OLIRANG-Genda",
    brand: "Aldo",
    price: 50,
    discount: 10,
    size: [39, 40, 41],
    colors: ["#2878D5", "#FFFFFF"],
    image: require("../../../../assets/products/5.png"),
    bigImage:
      "https://unsplash.com/photos/brown-leather-open-toe-heeled-sandals-S7a1XZ7a2vw",
  },
  {
    id: 4,
    name: "Prayrien Low Top Sneakers-Black",
    brand: "Aldo",
    price: 50,
    discount: 10,
    size: [39, 40, 41],
    colors: ["#2878D5", "#000000", "#FFFFFF"],
    image: require("../../../../assets/products/6.png"),
    bigImage: "https://unsplash.com/photos/flat-screen-tv-ngMtsE5r9eI",
  },
  {
    id: 5,
    name: "Prayrien Low Top Sneakers-Black",
    brand: "Aldo",
    price: 10,
    discount: 10,
    size: [39, 40, 41],
    colors: ["#2878D5", "#000000"],
    image: require("../../../../assets/products/6.png"),
    bigImage:"https://unsplash.com/photos/flat-screen-tv-turned-on-w4znns7NTA0",
  },
];

export default function index() {
  

  return (
    <View>
      <View className=" bg-white h-full flex-1">
        <Text className="text-lg font-light text-left py-7 px-5 tracking-widest">
          All Products
        </Text>
        <View className="flex flex-row justify-between items-center px-5 mb-3">
          <TouchableOpacity
            // onPress={handlePresentModalPress}
            className="border border-black inline-flex w-24 items-center flex-row text-center justify-center p-2 "
          >
            <AntDesign name="filter" size={16} color="black" />
            <Text className="text-sm font-medium text-black ml-2">Filter</Text>
          </TouchableOpacity>
          <View className="flex flex-row justify-between items-center gap-2">
            <TouchableOpacity
              className="bg-black text-white p-2
              border-black"
            >
              <Feather
                name="list"
                size={24}
                color="black"
                // onPress={() => {
                //   dispatch(setProductView("list"));
                // }}
              />
            </TouchableOpacity>
            <TouchableOpacity className="bg-black text-white p-2">
              <Feather name="grid" size={24} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
           className="grid grid-cols-2"
        >
          {productsData.map((product) => (
            <ProductCard2 key={product.id} product={product} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

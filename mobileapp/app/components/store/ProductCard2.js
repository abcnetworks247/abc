import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";

const ProductCard2 = ({ product }) => {
  return (
    <TouchableOpacity className="w-full">
      <View className="relative p-4 bg-white rounded shadow dark:bg-gray-700">
        <View className="block mb-2">
          <View className="relative overflow-hidden">
            <View className="mb-5 overflow-hidden">
              <Image
                className="object-cover w-full mx-auto rounded h-72 "
                source={product.image}
                alt=""
              />
            </View>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              fill="currentColor"
              className="absolute top-3 right-3"
              viewBox="0 0 16 16"
            >
              <Path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </Svg>
            <Text className="absolute px-4 py-1 text-xs text-white rounded top-3 left-3 sale bg-rose-500">
              Sale
            </Text>
          </View>
          <View>
            <Text className="mb-2 text-xl font-bold dark:text-white">
              {product.name}
            </Text>
          </View>
          <View className="text-lg font-bold text-blue-500 dark:text-blue-300 ">
            <Text>${product.price}</Text>
            <Text className="text-xs font-semibold text-gray-400 line-through ">
              ${product.price}
            </Text>
          </View>
          <View className="flex gap-1 mt-2 text-orange-400 rating">
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <Path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </Svg>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <Path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </Svg>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <Path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </Svg>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <Path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </Svg>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <Path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </Svg>
          </View>
          <View className="absolute z-10 flex items-center justify-center p-1 text-center text-gray-100 bg-blue-500 rounded-full shadow-xl bottom-4 right-4 hover:bg-blue-700 w-11 h-11 ">
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="w-7 h-7"
              viewBox="0 0 16 16"
            >
              <Path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
            </Svg>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard2;

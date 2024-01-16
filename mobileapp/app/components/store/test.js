import React from 'react'

const test = () => {
  return (
    <TouchableOpacity
    // onPress={() => navigation.navigate("ProductDetails", { id: product._id })}
    // onPressIn={() => setHoverState(true)}
    >
      <View className="relative bg-white ">
        <View className="relative flex items-center shadow-sm justify-center w-full h-64 mb-4 rounded">
          <Image
            className="object-contain w-[70%] h-full transition-all group-hover:scale-110 bg-transparent"
            source={product.image}
          />
          <View className="absolute flex flex-col top-4 right-4 ">
            <View className="flex items-center">
              <View className="relative flex cursor-pointer items-center justify-center p-3 mb-3">
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 16 16"
                  fill="#FF6666"
                >
                  <Path d="M8 2.748L8 2.748C10.68 0.377 15.36 1.344 15.36 6.792C15.36 9.868 12.206 12.44 8.464 15.665C8.18 15.89 7.82 15.89 7.536 15.665C3.794 12.44 0.64 9.868 0.64 6.792C0.64 1.344 5.32 0.377 8 2.748Z" />
                </Svg>
              </View>
            </View>

            <TouchableOpacity className="flex items-center">
              <View className="relative flex cursor-pointer hover:scale-125 items-center justify-center p-3 mb-3 bg-white rounded"
              >
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20} 
                  height={20}
                  fill="#00f"
                  viewBox="0 0 16 16"
                >
                  <Path d="M0 2.5A.5.5 0 01.5 2H2a.5.5 0 01.485.379L2.89 4H14.5a.5.5 0 01.485.621l-1.5 6A.5.5 0 0113 11H4a.5.5 0 01-.485-.379L1.61 3H.5a.5.5 0 01-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 100 2 1 1 0 000-2zm-2 1a2 2 0 114 0 2 2 0 01-4 0zm9-1a1 1 0 100 2 1 1 0 000-2zm-2 1a2 2 0 114 0 2 2 0 01-4 0z" />
                </Svg>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-3">
          <View>
            <Text className="mb-2 text-sm font-semibold text-gray-800 line-clamp-1">
              {product.name}
            </Text>
          </View>
          <Text className="mb-3 text-lg font-bold text-gray-600 flex gap-3 items-center">
            <Text>$ {product.price}</Text>
            <Text className="text-xs font-semibold text-gray-500 line-through ">
              $ {product.price}
            </Text>
          </Text>
          <AntDesign name={"star"} size={24} color={"black"} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default test
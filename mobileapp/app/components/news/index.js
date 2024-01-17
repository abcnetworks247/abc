import {
  View,
  Text,
  Image,
  StatusBar,
  RefreshControl,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
  Pressable,
} from "react-native";
import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
// import Link from react native
import { Link, useRouter } from "expo-router";

import globalStyels from "../../../styles/globalStyels";
import axios from "axios";

import { useEffect, useState, useCallback } from "react";
// import {  TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const HomeNews = () => {

  const [posts, setPosts] = useState([]);
  const [highlight, setHighlight] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const baseURL = process.env.EXPO_PUBLIC_SERVER_URL;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const colors = ["#00876c", "#f44336", "#ff9800", "#2196f3", "#9c27b0"];
  const route = useRouter();
  //fetch data from api
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${baseURL}admin/blog`);
      setPosts(res.data);
      setHighlight(res.data.highlight);
      // console.log(res.data.highlight);
      setTrending(res.data.trending);
      // console.log(res.data.trending);
      setTopNews(res.data.top);
      // console.log(res.data.topNews);
      setPopular(res.data.popular);
      // console.log(res.data.popular);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  //  const navigation = useNavigation();
  // const nav = (id) => {
  //   console.log(id);
  //   navigation.navigate("/news", { params: id, key: 'news' });
  // };

  if (loading === true) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      <SafeAreaView style={globalStyels.droidSafeArea}>
        <ScrollView
          className="my-2 space-y-8`"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              enabled={true}
              colors={colors}
              size={"large"}
            />
          }
        >
          {/* trending news */}
          <View className=" ">
            <Text className="py-1 text-xl font-bold h-fit">Trending News</Text>

            {trending &&
              trending.map((item, index) => (
                <TouchableHighlight key={index}>
                  <View className="flex flex-col " key={index}>
                    <Link
                      href={{
                        pathname: `../../news/${item._id}`,
                        params: {
                          key: "news",
                          image: item.blogimage,
                          title: item.title,
                          category: item.category,
                          date: item.createdAt,
                          type: item.type,
                        },
                      }}
                      className="flex flex-col "
                      asChild={true}
                    >
                      <Pressable>
                        {() => (
                          <Image
                            alt=""
                            className="object-cover w-full h-52 object-top rounded-t"
                            source={{ uri: item.blogimage }}
                            resizeMode="contain"
                            resizeMethod="resize"
                          />
                        )}
                      </Pressable>
                    </Link>

                    <View className="flex flex-col flex-1 p-1">
                      <Link
                        href={{
                          pathname: `../../news/${item._id}`,
                          params: {
                            key: "news",
                            image: item.blogimage,
                            title: item.title,
                            category: item.category,
                            date: item.createdAt,
                            type: item.type,
                          },
                        }}
                        className="text-xs tracki uppercase hover:underline text-blue-600"
                        asChild={true}
                      >
                        <Pressable>
                          {() => (
                            <Text className="text-xs w-fit  uppercase hover:underline text-blue-600">
                              {item.category}
                            </Text>
                          )}
                        </Pressable>
                      </Link>
                      <Text className="flex-1 py-2 text-lg font-semibold ">
                        {item.title}
                      </Text>
                      <View className="flex flex-wrap justify-between pt-3 text-xs ">
                        {/* <Text className="w-full">{item.shortdescription}</Text> */}
                        {/* <Text className="w-full">{item.longdescription}</Text> */}
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              ))}
          </View>
          <View className="border-b-gray-300 border-b mt-5 mb-5" />

          {/* top news */}
          <View className="">
            <Text className="py-1 text-xl font-bold">Top News</Text>
            {topNews &&
              topNews.map((item, index) => (
                <TouchableHighlight key={index}>
                  <View className="flex flex-col " key={index}>
                    <Link
                      href={{
                        pathname: `../../news/${item._id}`,
                        params: {
                          key: "news",
                          image: item.blogimage,
                          title: item.title,
                          category: item.category,
                          date: item.createdAt,
                          type: item.type,
                        },
                      }}
                      className="flex flex-col "
                      asChild={true}
                    >
                      <Pressable>
                        {() => (
                          <Image
                            alt=""
                            className="object-cover w-full h-52 object-top rounded-t"
                            source={{ uri: item.blogimage }}
                            resizeMode="contain"
                            resizeMethod="resize"
                          />
                        )}
                      </Pressable>
                    </Link>

                    <View className="flex flex-col flex-1 p-1">
                      <Link
                        href={{
                          pathname: `../../news/${item._id}`,
                          params: {
                            key: "news",
                            image: item.blogimage,
                            title: item.title,
                            category: item.category,
                            date: item.createdAt,
                            type: item.type,
                          },
                        }}
                        className="text-xs tracki uppercase hover:underline text-blue-600"
                        asChild={true}
                      >
                        <Pressable>
                          {() => (
                            <Text className="text-xs w-fit  uppercase hover:underline text-blue-600">
                              {item.category}
                            </Text>
                          )}
                        </Pressable>
                      </Link>
                      <Text className="flex-1 py-2 text-lg font-semibold ">
                        {item.title}
                      </Text>
                      <View className="flex flex-wrap justify-between pt-3 text-xs ">
                        {/* <Text className="w-full">{item.shortdescription}</Text> */}
                        {/* <Text className="w-full">{item.longdescription}</Text> */}
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              ))}
          </View>
          <View className="border-b-gray-300 border-b mt-5 mb-5" />

          {/* popular news */}
          <View className=" mb-5">
            <Text className="py-1 text-xl font-bold">Popular News</Text>
            {popular &&
              popular.map((item, index) => (
                <TouchableHighlight key={index}>
                  <View className="flex flex-col " key={index}>
                    <Link
                      href={{
                        pathname: `../../news/${item._id}`,
                        params: {
                          key: "news",
                          image: item.blogimage,
                          title: item.title,
                          category: item.category,
                          date: item.createdAt,
                          type: item.type,
                        },
                      }}
                      className="flex flex-col "
                      asChild={true}
                    >
                      <Pressable>
                        {() => (
                          <Image
                            alt=""
                            className="object-cover w-full h-52 object-top rounded-t"
                            source={{ uri: item.blogimage }}
                            resizeMode="contain"
                            resizeMethod="resize"
                          />
                        )}
                      </Pressable>
                    </Link>

                    <View className="flex flex-col flex-1 p-1">
                      <Link
                        href={{
                          pathname: `../../news/${item._id}`,
                          params: {
                            key: "news",
                            image: item.blogimage,
                            title: item.title,
                            category: item.category,
                            date: item.createdAt,
                            type: item.type,
                          },
                        }}
                        className="text-xs tracki uppercase hover:underline text-blue-600"
                        asChild={true}
                      >
                        <Pressable>
                          {() => (
                            <Text className="text-xs w-fit  uppercase hover:underline text-blue-600">
                              {item.category}
                            </Text>
                          )}
                        </Pressable>
                      </Link>
                      <Text className="flex-1 py-2 text-lg font-semibold ">
                        {item.title}
                      </Text>
                      <View className="flex flex-wrap justify-between pt-3 text-xs ">
                        {/* <Text className="w-full">{item.shortdescription}</Text> */}
                        {/* <Text className="w-full">{item.longdescription}</Text> */}
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeNews;

import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Logo from "../../../assets/AbcstudioNo.png";
import { MyReactNativeForm } from "../../components/form/Formik";
import { Formik } from "formik";
import * as yup from "yup";
import Svg, { Circle, Path } from "react-native-svg";

const userSchema = yup.object({
  password: yup
    .string()
    .min(7, "Password is too short")
    .required("Password is required"),
  confirmpassword: yup
    .string()
    .min(7, "Password is too short")
    .required("Password is required"),
});
export default function index() {
  const initialValue = {  password: "",  confirmpassword: ""  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values)
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={userSchema}
      onSubmit={handleSubmit}
    >
      {({ handleBlur, handleChange, values, errors,handleSubmit }) => (
        <View className="flex items-center justify-center m-auto w-full px-6">
          <View className="gap-4 w-full">
            <View className=" flex items-center justify-center ">
              <Image source={Logo} className="w-40 h-20" resizeMode="cover" />
              <Text className="text-3xl font-extrabold text-blue-900 mb-2 text-center">
              Update Password
              </Text>
              <Text className="text-[14px] text-gray-500">
              Enter your New Password
              </Text>
            </View>

            <View>

  

              <View>
                <TextInput
                  placeholder="Enter password"
                  secureTextEntry={true}
                  className="w-auto px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none  focus:bg-white"
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <Text className="text-red-500 my-1 text-[13px]">
                  {errors.password}
                </Text>
              </View>
            </View>
            <View>

  

              <View>
                <TextInput
                  placeholder="Confirm password"
                  secureTextEntry={true}
                  className="w-auto px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none  focus:bg-white"
                  onChange={handleChange("confirmpassword")}
                  onBlur={handleBlur("confirmpassword")}
                  value={values.confirmpassword}
                />
                <Text className="text-red-500 my-1 text-[13px]">
                  {errors.confirmpassword}
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                title=""
                className=" items-center justify-center tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out  focus:shadow-outline focus:outline-none"
                onPress={handleSubmit}
              >
                <View className="flex flex-row gap-2 items-center">
                  <Svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#ffffff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: 5 }}
                  >
                    <Path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <Circle cx="8.5" cy="7" r="4" />
                    <Path d="M20 8v6M23 11h-6" />
                  </Svg>
                  <Text className="text-white text-center">SignIn</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text className="text-center text-gray-500">
                Remeber your password?{" "}
                <Link href="/auth/signin" className="text-blue-900 font-semibold">
                  Login
                </Link>
              </Text>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}

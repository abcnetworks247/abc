import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const userSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Email is not valid').required('Email is required'),
  password: Yup.string().min(7, 'Password is too short').required('Password is required'),
});

export const MyReactNativeForm = () => {
  const initialValues = { name: '', email: '', password: '' };

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values)
  };

  return (
    <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting,  }) => (
        <View>
          <Text>Name</Text>
          <TextInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          <Text>{errors.name}</Text>

          <Text>Email</Text>
          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
          />
          <Text>{errors.email}</Text>

          <Text>Password</Text>
          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
          />
          <Text>{errors.password}</Text>

          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

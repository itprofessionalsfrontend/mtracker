import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import Main from "./screens/Main";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#ddd",
          },
        }}
      >
        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{ title: "Sign Up" }}
        ></Stack.Screen>

        <Stack.Screen
          name="login"
          component={Login}
          options={({ title: "Login Please" }, { headerLeft: null })}
        ></Stack.Screen>

        <Stack.Screen
          name="main"
          component={Main}
          options={({ title: "Music List" }, { headerLeft: null })}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
});

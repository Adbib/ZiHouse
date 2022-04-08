import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Home";
import Login from "../Login";
import Signup from "../Signup";
import ClientOrSeller from "../ClientOrSeller";
import SellerSignup from "../SellerSignup";
import List from "../List";
import SingleSeller from "../SingleSeller";

const AppStack = createStackNavigator();
export default function MyStack() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <AppStack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={Login}
      />
      <AppStack.Screen
        options={{
          headerShown: false,
        }}
        name="Signup"
        component={Signup}
      />
      <AppStack.Screen
        options={{
          headerShown: false,
        }}
        name="ClientOrSeller"
        component={ClientOrSeller}
      />
      <AppStack.Screen
        options={{
          headerShown: false,
        }}
        name="SellerSignup"
        component={SellerSignup}
      />
      <AppStack.Screen
        options={{
          headerShown: false,
        }}
        name="List"
        component={List}
      />
      <AppStack.Screen
        options={{
          headerShown: false,
        }}
        name="SingleSeller"
        component={SingleSeller}
      />
    </AppStack.Navigator>
  );
}

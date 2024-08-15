import { View, Text } from "react-native";
import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import RequestDetail from "./components/RequestDetail";
import ApplyPass from "./components/ApplyPass";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={{ colors: "white" }}>
      <Stack.Navigator
        initialRouteName="homee"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login" component={Login}></Stack.Screen>
        <Stack.Screen name="register" component={Register}></Stack.Screen>
        <Stack.Screen name="homee" component={Home}></Stack.Screen>
        <Stack.Screen
          name="requestdetail"
          component={RequestDetail}
        ></Stack.Screen>
        <Stack.Screen
          options={{
            presentation: "modal",
          }}
          name="apply"
          component={ApplyPass}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

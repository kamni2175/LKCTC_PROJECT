import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import RequestDetail from "./components/RequestDetail";
import ApplyPass from "./components/ApplyPass";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { dbUrl, secondaryClor } from "./utils";
import {
  setAllRequests,
  setAllUsers,
  setIsAuthenticated,
  setUser,
} from "./store/slices/userSlice";
import VarifiedStatus from "./components/VarifiedStatus";
import * as ScreenOrientation from "expo-screen-orientation";

const Stack = createStackNavigator();

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isRequesting, setisRequesting] = useState(false);

  useEffect(() => {
    // Lock the orientation to portrait mode
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setisRequesting(true);
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setisRequesting(false);
          return console.log(
            "token not found please login to continue fronend message"
          );
        }

        const res = await axios.get(`${dbUrl}/check-authentication`, {
          headers: { Authorization: token },
        });

        if (res.data?.success) {
          dispatch(setUser(res?.data?.user));
          dispatch(setIsAuthenticated(true));
        }

        setisRequesting(false);
      } catch (error) {
        setisRequesting(false);
        console.log(error.message);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    setisRequesting(true);

    const getAllRegisteredUsers = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setisRequesting(false);
          return;
        }

        const res = await axios.get(dbUrl + "/get-all-users", {
          headers: { Authorization: token },
        });

        console.log(res.data);

        if (res.data.success) {
          dispatch(setAllUsers(res.data?.users));
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (user) {
      if (user?.role == "hod" || user?.role == "director") {
        getAllRegisteredUsers();
      }
    }
  }, [user]);

  useEffect(() => {
    setisRequesting(true);

    const getAllRequests = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          setisRequesting(false);
          return;
        }

        const res = await axios.get(dbUrl + "/all-requests", {
          headers: { Authorization: token },
        });

        console.log(res?.data);
        if (res.data?.success) {
          dispatch(setAllRequests(res?.data?.requests));
        }
        setisRequesting(false);
      } catch (error) {
        console.log(error.message);
        setisRequesting(false);
      }
    };

    if (user) {
      if (user?.role == "hod" || user?.role == "director") {
        getAllRequests();
      }
    }
  }, [user]);

  useEffect(() => {
    setisRequesting(true);
    const getAllRequestsOfTeacher = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(dbUrl + "/getall-request-of-teacher", {
          headers: { Authorization: token },
        });

        console.log(res.data);

        if (res?.data?.success) {
          dispatch(setAllRequests(res?.data?.requests));
        }
        setisRequesting(false);
      } catch (error) {
        console.log(error.message);
        setisRequesting(false);
      }
    };

    if (user && user?.role == "teacher") {
      getAllRequestsOfTeacher();
      setisRequesting(false);
    }
    setisRequesting(false);
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
      {isRequesting ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={secondaryClor} size={40} />
        </View>
      ) : (
        <NavigationContainer theme={{ colors: "white" }}>
          {isAuthenticated && user?.isVarified && (
            <Stack.Navigator
              initialRouteName="homee"
              screenOptions={{ headerShown: false }}
            >
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
          )}

          {!isAuthenticated && !user?.isVarified && (
            <Stack.Navigator
              initialRouteName="login"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="login" component={Login}></Stack.Screen>
              <Stack.Screen name="register" component={Register}></Stack.Screen>
            </Stack.Navigator>
          )}

          {isAuthenticated && !user?.isVarified && (
            <Stack.Navigator
              initialRouteName="status"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="status"
                component={VarifiedStatus}
              ></Stack.Screen>
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </View>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

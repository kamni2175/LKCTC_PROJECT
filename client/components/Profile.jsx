import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { secondaryClor } from "../utils";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

const Profile = () => {
  const { height, width } = Dimensions.get("window");
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <StatusBar backgroundColor={secondaryClor} />

      <View
        style={{
          height: "30%",
          backgroundColor: secondaryClor,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      ></View>

      <View
        style={{
          top: 0,
          position: "absolute",
          width,
          height,
        }}
      >
        <ScrollView style={{ flex: 1, zIndex: 40 }}>
          <Text
            style={{
              marginLeft: 20,
              marginTop: 10,
              fontWeight: "500",
              fontSize: 19,
              color: "white",
            }}
          >
            Profile
          </Text>

          <View
            style={{
              width: "80%",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
              backgroundColor: "white",
              paddingVertical: 15,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: secondaryClor, fontWeight: "600" }}>
              Login with :- shivam@gmail.com
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${9417313393}`);
            }}
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginLeft: 20,
              marginTop: 40,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 17 }}>
              {" "}
              Call to Director Mr (Name)
            </Text>
            <Feather name="phone-call" size={24} color="#32CD32" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${9464046810}`);
            }}
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginLeft: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 17 }}>
              {" "}
              Call to head of department (HOD){" "}
            </Text>
            <Feather name="phone-call" size={24} color="#32CD32" />
          </TouchableOpacity>

          <View
            style={{ width: "90%", alignSelf: "center", alignItems: "center" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 70,
                width: "90%",
                // borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: secondaryClor,
                elevation: 5,
                shadowColor: secondaryClor,
                backgroundColor: "white",
                marginBottom: 15,
                gap: 10,
              }}
            >
              <Feather name="user" size={24} color={secondaryClor} />
              <Text>Shivam</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "90%",
                // borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: secondaryClor,
                elevation: 5,
                shadowColor: secondaryClor,
                backgroundColor: "white",
                marginBottom: 15,
                gap: 10,
              }}
            >
              <Feather name="mail" size={24} color={secondaryClor} />
              <Text>Shivam@gmail.com</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "90%",
                // borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: secondaryClor,
                elevation: 5,
                shadowColor: secondaryClor,
                backgroundColor: "white",
                marginBottom: 15,
                gap: 10,
              }}
            >
              <FontAwesome name="building-o" size={24} color={secondaryClor} />
              <Text>IT / Bloack (D)</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <View
                style={{
                  width: "43%",
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: secondaryClor,
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                  }}
                >
                  <Text
                    style={{ color: "white", fontWeight: "500", fontSize: 16 }}
                  >
                    Edit
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "43%",
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: secondaryClor,

                  elevation: 10,
                }}
              >
                <Text
                  style={{
                    color: secondaryClor,
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  Log Out
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* // boxes */}
    </View>
  );
};

export default Profile;

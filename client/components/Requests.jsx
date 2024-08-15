import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { secondaryClor } from "../utils";
import { ScrollView } from "react-native-gesture-handler";

const Requests = () => {
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
            All Requests
          </Text>
          <View style={{ zIndex: 40, marginTop: 40 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <TouchableOpacity
                style={{
                  width: "90%",
                  backgroundColor: "#fff",
                  alignSelf: "center",
                  elevation: 7,
                  borderRadius: 15,
                  marginBottom: 10,
                  padding: 10,
                  shadowColor: secondaryClor,
                }}
                key={i}
              >
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Name:- <Text style={{ color: secondaryClor }}>Shivam</Text>
                </Text>
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  appy at :-{" "}
                  <Text style={{ color: secondaryClor }}>
                    11-2-2024 11:30 PMs
                  </Text>
                </Text>
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Department :-{" "}
                  <Text style={{ color: secondaryClor }}>
                    Engenering block (B)
                  </Text>
                </Text>
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Status :-{" "}
                  <Text style={{ color: secondaryClor }}>pending...</Text>
                </Text>
                <Text></Text>

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: "40%",
                      height: 35,
                      backgroundColor: "red",
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "auto",
                    }}
                  >
                    <Text style={{ color: "white" }}>Cancel</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* // boxes */}
    </View>
  );
};

export default Requests;

import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { dbUrl, formatDate, formatTime, secondaryClor } from "../../utils";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateAllRequests } from "../../store/slices/userSlice";
import axios from "axios";

const PendingRequests_Admin = () => {
  const { height, width } = Dimensions.get("window");
  const { allRequests, user } = useSelector((state) => state.user);
  const [allRequestToMap, setallRequestToMap] = useState([]);
  const [isRequesting, setisRequesting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allRequests?.length > 0) {
      const filterdata = allRequests.filter((request) => {
        if (
          request?.hodStatus == "pending" ||
          request?.directorStatus == "pending"
        ) {
          return request;
        }
      });
      setallRequestToMap(filterdata);
    }
  }, [allRequests]);

  const handleChangeRequest = async (status, id) => {
    try {
      setisRequesting(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setisRequesting(false);
        return;
      }

      const res = await axios.post(
        dbUrl + "/update-status-of-pass",
        {
          status,
          gatepassid: id,
        },
        { headers: { Authorization: token } }
      );

      alert(res?.data?.message);

      if (res.data?.success) {
        let data;
        if (user?.role == "hod") {
          data = { hodStatus: status };
        }
        if (user?.role == "director") {
          data = { directorStatus: status };
        }
        dispatch(updateAllRequests({ id, data }));
      }

      setisRequesting(false);
    } catch (error) {
      setisRequesting(false);
      console.log(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {allRequestToMap?.length ? (
        <ScrollView style={{ flex: 1, zIndex: 40 }}>
          <Text
            style={{
              marginLeft: 20,
              marginTop: 10,
              fontWeight: "500",
              fontSize: 21,
              color: "white",
            }}
          >
            All Requests
          </Text>

          <View style={{ zIndex: 40, marginTop: 0, marginBottom: 70 }}>
            {allRequestToMap?.map((data, i) => (
              <View
                style={{
                  width: "90%",
                  backgroundColor: "#fff",
                  alignSelf: "center",
                  elevation: 10,
                  borderRadius: 15,
                  marginBottom: 10,
                  padding: 10,
                  shadowColor: "black",
                }}
                key={i}
              >
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Name:-{" "}
                  <Text style={{ color: secondaryClor }}>{data?.userName}</Text>
                </Text>
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Apply Date:-{" "}
                  <Text style={{ color: secondaryClor }}>
                    {formatDate(data?.date?.toString())}
                  </Text>
                </Text>
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Exit time:-{" "}
                  <Text style={{ color: secondaryClor }}>
                    {formatTime(data?.exitTime?.toString())}
                  </Text>
                </Text>
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Return time:-{" "}
                  <Text style={{ color: secondaryClor }}>
                    {formatTime(data?.returnTime?.toString())}
                  </Text>
                </Text>
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Department :-{" "}
                  <Text style={{ color: secondaryClor }}>
                    {data?.department}
                  </Text>
                </Text>
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Status :-
                  <Text style={{ color: secondaryClor }}>
                    {user?.role == "hod" ? (
                      user?.role == "hod" && data?.hodStatus == "pending" ? (
                        <Text>Pending</Text>
                      ) : (
                        <Text>Confirm</Text>
                      )
                    ) : user?.role == "director" &&
                      data?.directorStatus == "pending" ? (
                      <Text>Pending</Text>
                    ) : (
                      <Text>Confirm</Text>
                    )}
                  </Text>
                </Text>
                {user?.role == "hod" && data?.hodStatus == "pending" && (
                  <View style={{ flex: 1, marginTop: 10 }}>
                    {isRequesting ? (
                      <ActivityIndicator
                        style={{ marginBottom: 10 }}
                        size={30}
                        color={secondaryClor}
                      />
                    ) : (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: "40%",
                            height: 40,
                            backgroundColor: "white",
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: secondaryClor,
                          }}
                          onPress={() => {
                            handleChangeRequest("cancel", data?._id);
                          }}
                        >
                          <Text
                            style={{
                              color: secondaryClor,
                              fontSize: 16,
                              fontWeight: "500",
                            }}
                          >
                            Cancel
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            width: "40%",
                            height: 40,
                            backgroundColor: secondaryClor,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onPress={() => {
                            handleChangeRequest("confirm", data?._id);
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 16,
                              fontWeight: "500",
                            }}
                          >
                            Confirm
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}

                {user?.role == "director" &&
                  data?.directorStatus == "pending" && (
                    <View style={{ flex: 1, marginTop: 10 }}>
                      {isRequesting ? (
                        <ActivityIndicator
                          style={{ marginBottom: 10 }}
                          size={30}
                          color={secondaryClor}
                        />
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              width: "40%",
                              height: 40,
                              backgroundColor: "white",
                              borderRadius: 10,
                              justifyContent: "center",
                              alignItems: "center",
                              borderWidth: 1,
                              borderColor: secondaryClor,
                            }}
                            onPress={() => {
                              handleChangeRequest("cancel", data?._id);
                            }}
                          >
                            <Text
                              style={{
                                color: secondaryClor,
                                fontSize: 16,
                                fontWeight: "500",
                              }}
                            >
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              width: "40%",
                              height: 40,
                              backgroundColor: secondaryClor,
                              borderRadius: 10,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onPress={() => {
                              handleChangeRequest("confirm", data?._id);
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontSize: 16,
                                fontWeight: "500",
                              }}
                            >
                              Confirm
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  )}
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              height: 100,
              backgroundColor: "#FFF",
              elevation: 10,
              borderRadius: 15,
              alignItems: "center",
              padding: 5,
              justifyContent: "center",
              shadowColor: secondaryClor,
              marginBottom: 60,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                color: secondaryClor,
              }}
            >
              Request list is empty
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default PendingRequests_Admin;

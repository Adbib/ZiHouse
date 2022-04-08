import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image, Input, Button } from "react-native-elements";

export default function ClientOrSeller({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/icon1.png")}
        resizeMode="center"
        style={{
          width: 150,
          height: 150,
          //   alignSelf: "center",
        }}
      />
      <View
        style={{
          flexDirection: "row",

          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Button
          icon={{ name: "work", color: "white" }}
          // loading={LoginData.loading}
          iconLeft
          title="حرافي"
          //   buttonStyle={{width: 200, margin: 10 }}
          onPress={() => navigation.navigate("SellerSignup")}
          containerStyle={{ width: "50%" }}
          buttonStyle={{
            width: "98%",
            alignSelf: "center",
            backgroundColor: "#20D2A3",
            padding: 13,
            borderRadius: 10,
          }}
        />
        <Button
          icon={{ name: "person", color: "white" }}
          // loading={LoginData.loading}
          iconLeft
          title="عميل"
          onPress={() => navigation.navigate("Signup")}
          containerStyle={{ width: "50%" }}
          buttonStyle={{
            width: "98%",
            alignSelf: "center",
            backgroundColor: "#016249",
            padding: 13,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#016249",
    borderWidth: 5,
  },
});

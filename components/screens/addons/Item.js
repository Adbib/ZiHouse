import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { Button, Icon } from "react-native-elements";
export default function Item({
  fName,
  lName,
  email,
  phone,
  id,
  phoneFix,
  address,
  aboutMe,
  imgProfile,
  site,
  navigation,
}) {
  const data = {
    fName,
    lName,
    id,
    site,
    email,
    phone,
    phoneFix,
    address,
    aboutMe,
    imgProfile,
  };
  return (
    <View style={styles.item}>
      <Image
        // source={require("../../assets/doctor.jpg")}
        source={
          !imgProfile
            ? require("../../../assets/doctor1.png")
            : { uri: imgProfile }
        }
        resizeMode="center"
        style={{
          // width: 100,
          width: 100,
          height: 100,
          borderRadius: 100,
          alignSelf: "center",
          // alignSelf: "flex-end",
          marginTop: 5,
          // backgroundColor: "reds",
        }}
      />
      <Text
        style={{
          alignSelf: "center",
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
          paddingTop: 5,
          paddingBottom: 7,
        }}
      >
        {fName + " " + lName}
      </Text>

      <Button
        onPress={() => navigation.navigate("SingleSeller", { data })}
        buttonStyle={{
          //   padding: 0,
          backgroundColor: "#37e1b4",
          //   alignSelf: "flex-start",
        }}
        icon={
          <Icon
            name="send"
            size={23}
            color="white"
            style={{ paddingRight: 5 }}
          />
        }
        title="تواصل"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#20D2A3",
    height: 195, //Dimensions.get("window").height / 1.8,
    width: "80%",
    margin: 4,
    marginBottom: 10,
    borderRadius: 20,
    // padding: 10,
    // flexDirection: "column",
    // shadowColor: "#999",
    // shadowOffset: {
    //   width: 310,
    //   height: 310,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 20,
    // elevation: 50,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
});

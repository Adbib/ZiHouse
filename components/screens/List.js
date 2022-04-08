import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import Item from "./addons/Item";
import Firebased from "../../config/config";

export default function List({ navigation, route }) {
  const [bla, setbla] = useState(false);
  useEffect(() => {
    if (route.params.data) {
      setbla(false);
    } else {
      setbla(true);
      setTimeout(() => {
        setbla(false);
        alert("لا يوجد مهنيين مسجلين بعد.");
        navigation.navigate("Home");
      }, 5000);
    }
  }, []);
  // const [napoo, setnapoo] = useState([]);
  // console.log(route.params.sellerCountry.name);
  // useEffect(() => {
  //   const dbRef = Firebased.database().ref();
  //   dbRef
  //     .child("SellerUsers")
  //     //   .child(response.user.uid)
  //     .get()
  //     .then((snapshot) => {
  //       // console.log(snapshot);
  //       if (snapshot.exists()) {
  //         setnapoo(snapshot.val());
  //       } else {
  //         alert(" ليست هناك أي معلومات");
  //       }
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // }, []);
  return (
    <View style={styles.listContainer}>
      <View style={styles.topView}>
        <Image
          source={require("../../assets/icon1.png")}
          resizeMode="center"
          // width={50}
          // height={50}
          style={{
            width: 80,
            height: 85,
            alignSelf: "center",
            top: 20,
            zIndex: 1000,
            // transform: [{ rotate: "315deg" }],
          }}
          //   style={styles.avatar}
        />
      </View>
      <ScrollView contentContainerStyle={styles.buttomView}>
        {route.params.data ? (
          Object.values(route.params.data).map((childSnapshot, i) => {
            if (route.params.sellerCountry.name == childSnapshot.country) {
              return (
                <Item
                  key={i}
                  fName={childSnapshot.fName}
                  id={childSnapshot.id}
                  lName={childSnapshot.lName}
                  email={childSnapshot.email}
                  phone={childSnapshot.phone}
                  phoneFix={childSnapshot.phoneFix}
                  address={childSnapshot.address}
                  aboutMe={childSnapshot.aboutMe}
                  imgProfile={childSnapshot.imgProfile}
                  site={childSnapshot.site}
                  navigation={navigation}
                />
              );
            }
          })
        ) : (
          <ActivityIndicator animating={bla} color={"red"} size="large" />
        )}
        {/* <Text>fdsdf</Text> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    // alignContent: "center",
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: 50,
    height: "100%",
    backgroundColor: "#016249",
    // flexWrap: "wrap",
  },
  topView: {
    height: "8%",
    zIndex: 1000,
    // marginTop:
    // backgroundColor: "red",
    backgroundColor: "#016249",
    justifyContent: "flex-end",
    // borderBottomRightRadius: 100,
    // borderBottomEndRadius: 100,
    // borderBottomLeftRadius: 100,
    // borderRadius: 100,
  },
  buttomView: {
    backgroundColor: "white",
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    justifyContent: "center",
    paddingTop: 70,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 100,
    // borderRadius: 100,
  },
  item: {
    backgroundColor: "#20D2A3",
    height: 180, //Dimensions.get("window").height / 1.8,
    width: Dimensions.get("window").width / 3.3,
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

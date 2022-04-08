import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import { Image, Input, Button, Icon } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import Firebased from "../../config/config";

export default function Signup({ navigation }) {
  const [userData, setuserData] = useState({
    fName: null,
    lName: null,
    email: null,
    phone: null,
    password: null,
    cpassword: null,
    error: false,
    errorMsg: "",
  });
  const [Loading, setLoading] = useState({ load: false, done: false });
  const doSignup = (data) => {
    if (
      !data.fName &&
      !data.lName &&
      !data.email &&
      !data.phone &&
      !data.password &&
      !data.cpassword
    ) {
      alert("المرجو ملأ كل الخنات المطلوبة");
    } else {
      if (data.password !== data.cpassword) {
        alert("المرجو التأكد من تطابق كلمة السر");
      } else {
        setLoading({ ...Loading, load: true });
        Firebased.auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then((response) => {
            response.user.updateProfile({
              displayName: `${data.fName} ${data.lName}`,
            });
            Firebased.database()
              .ref("Users/" + response.user.uid)
              .set({
                id: response.user.uid,
                fName: data.fName,
                lName: data.lName,
                email: response.user.email,
                phone: data.phone,
                type: "normale",
              });
            navigation.navigate("Home");
          })
          .finally(() => {
            setLoading({ done: true, load: false });
            setTimeout(() => {
              setLoading({ ...Loading, done: false });
            }, 500);
          })
          .catch((error) => {
            alert(error);
          });
      }
    }
  };
  const getdata = () => {
    // const dbRef = Firebased.database().ref();
    // dbRef
    //   .child("SellerUsers")
    //   // .child(userId)
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot);
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val());
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    var userId = Firebased.auth().currentUser;
    console.log(userId);
  };
  return (
    <ScrollView contentContainerStyle={styles.loginContainer}>
      <StatusBar
        animated={true}
        backgroundColor="#016249"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        hidden={false}
      />
      <Modal
        transparent={true}
        animationType={"slide"}
        visible={Loading.done}
        onRequestClose={() => {}}
        statusBarTranslucent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <Icon name="done" color="green" size={55} />
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              تم التسجيل بنجاح
            </Text>
          </View>
        </View>
      </Modal>
      <View
        style={{
          // backgroundColor: "#eee",
          alignItems: "center",
          alignContent: "center",
          // width: 110,
          // height: 100%,
          borderRadius: 10,
          alignSelf: "center",
          // transform: [{ rotate: "45deg" }],
          marginBottom: 50,
          marginTop: 30,
        }}
      >
        <Image
          source={require("../../assets/icon1.png")}
          resizeMode="center"
          // width={50}
          // height={50}
          style={{
            width: 150,
            height: 150,
            alignSelf: "center",
            // transform: [{ rotate: "315deg" }],
          }}
          //   style={styles.avatar}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          width: "100%",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Input
          leftIcon={{ name: "person", color: "#20D2A3" }}
          placeholder="الاسم"
          containerStyle={{ width: "50%" }}
          inputContainerStyle={{
            borderBottomWidth: 0,
            backgroundColor: "#ddd",
            borderRadius: 10,
            paddingLeft: 10,
            paddingTop: 3,
            paddingBottom: 3,
            alignItems: "center",
            alignContent: "center",
          }}
          inputStyle={{
            textAlign: "right",
          }}
          // value={LoginData.username}
          onChangeText={(e) => setuserData({ ...userData, fName: e })}
        />
        <Input
          leftIcon={{ name: "person", color: "#20D2A3" }}
          containerStyle={{ width: "50%" }}
          placeholder="النسب"
          inputContainerStyle={{
            borderBottomWidth: 0,
            backgroundColor: "#ddd",
            borderRadius: 10,
            paddingLeft: 10,
            paddingTop: 3,
            paddingBottom: 3,
            alignItems: "center",
            alignContent: "center",
          }}
          inputStyle={{
            textAlign: "right",
          }}
          // value={LoginData.username}
          onChangeText={(e) => setuserData({ ...userData, lName: e })}
        />
      </View>

      <Input
        leftIcon={{ name: "email", color: "#20D2A3" }}
        placeholder="الاميل"
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: "#ddd",
          borderRadius: 10,
          paddingLeft: 10,
          paddingTop: 3,
          paddingBottom: 3,
          alignItems: "center",
          alignContent: "center",
        }}
        inputStyle={{
          textAlign: "right",
        }}
        // value={LoginData.username}
        onChangeText={(e) => setuserData({ ...userData, email: e })}
      />
      <Input
        leftIcon={{ name: "phone", color: "#20D2A3" }}
        placeholder="رقم الاهاتف"
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: "#ddd",
          borderRadius: 10,
          paddingLeft: 10,
          paddingTop: 3,
          paddingBottom: 3,
          alignItems: "center",
          alignContent: "center",
        }}
        inputStyle={{
          textAlign: "right",
        }}
        // value={LoginData.username}
        onChangeText={(e) => setuserData({ ...userData, phone: e })}
      />
      <Input
        leftIcon={{ name: "security", color: "#20D2A3" }}
        placeholder="كلمة السر"
        secureTextEntry={true}
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: "#ddd",
          borderRadius: 10,
          paddingLeft: 10,
          paddingTop: 3,
          paddingBottom: 3,
          alignItems: "center",
          alignContent: "center",
          // justifyContent: "center",
          // textAlign: "center",
        }}
        inputStyle={{
          textAlign: "right",
        }}
        // value={LoginData.password}
        onChangeText={(e) => setuserData({ ...userData, password: e })}
      />
      <Input
        leftIcon={{ name: "security", color: "#20D2A3" }}
        placeholder="اعادة كلمة السر"
        secureTextEntry={true}
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: "#ddd",
          borderRadius: 10,
          paddingLeft: 10,
          paddingTop: 3,
          paddingBottom: 3,
          alignItems: "center",
          alignContent: "center",
          // justifyContent: "center",
          // textAlign: "center",
        }}
        inputStyle={{
          textAlign: "right",
        }}
        // value={LoginData.password}
        onChangeText={(e) => setuserData({ ...userData, cpassword: e })}
      />
      {/* {LoginData.error && (
        <Text style={{ color: "red", margin: 5 }}>{LoginData.error}</Text>
      )} */}
      <Button
        icon={{ name: "person-add", color: "white" }}
        loading={Loading.load}
        iconLeft
        title="تسجيل"
        buttonStyle={{ width: 200, margin: 10 }}
        onPress={() => doSignup(userData)}
        containerStyle={{ width: "100%" }}
        buttonStyle={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: "#016249",
          padding: 13,
          borderRadius: 10,
        }}
      />

      <View>
        <Text style={{ color: "#555", marginBottom: 50, marginTop: 30 }}>
          لديك حساب مسبقا؟<Text> </Text>
          <Text
            style={{
              color: "#016249",
              margin: 50,
              fontWeight: "bold",
              // paddingLeft: 5,
            }}
            onPress={() =>
              navigation.navigate("Login", {
                // name: "SignUp",
                withAnimation: true,
              })
            }
          >
            دخول
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 150,
    width: 200,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

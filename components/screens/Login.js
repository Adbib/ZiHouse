import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import { Image, Input, Button, Icon } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import SelectDropdown from "react-native-select-dropdown";
import Firebased from "../../config/config";
import { mainContext } from "../../config/context";
export default function Login({ navigation }) {
  const [userData, setuserData] = useState({
    email: null,
    password: null,
    type: null,
    error: false,
    errorMsg: "",
  });
  const [Loading, setLoading] = useState({ load: false, done: false });
  const [name, setname] = useState("");
  const { User, setUser, isLogged, setIsLogged } = useContext(mainContext);
  const doLogin = (data) => {
    if (data.email && data.password && data.type) {
      setLoading({ ...Loading, load: true });
      Firebased.auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((response) => {
          // console.log(response);
          if (data.type == "عميل") {
            const dbRef = Firebased.database().ref();
            dbRef
              .child("Users")
              .child(response.user.uid)
              .get()
              .then((snapshot) => {
                // console.log(snapshot);
                if (snapshot.exists()) {
                  // console.log(snapshot.val());
                  // console.log(snapshot.address);
                  const user = snapshot.val();
                  // setname(user.lName);
                  setUser(user);
                  setIsLogged(true);
                  setLoading({ done: true, load: false });
                  setTimeout(() => {
                    setLoading({ ...Loading, done: false });
                    navigation.navigate("home");
                  }, 500);
                } else {
                  setLoading({ done: false, load: false });
                  alert("أنت لست مسجل كعميل");
                }
              })
              .catch((error) => {
                console.error(error);
              });
            // var userId = Firebased.auth().currentUser;
            // console.log(userId);
          }
          if (data.type == "حرفي") {
            const dbRef = Firebased.database().ref();
            dbRef
              .child("SellerUsers")
              .child(response.user.uid)
              .get()
              .then((snapshot) => {
                // console.log(snapshot);
                if (snapshot.exists()) {
                  const user = snapshot.val();
                  // console.log(snapshot.val());
                  // console.log(user.type);
                  // snapshot.map((e) => console.log(e));
                  // snapshot.exportVal;
                  // setname(user.lName);
                  setUser(user);
                  // console.log(User);
                  setIsLogged(true);
                  setLoading({ done: true, load: false });
                  setTimeout(() => {
                    setLoading({ ...Loading, done: false });
                    navigation.navigate("Home");
                  }, 500);
                } else {
                  setLoading({ done: false, load: false });
                  alert("أنت لست مسجل كحرفي");
                }
              })
              .catch((error) => {
                alert(error);
              });
            // var userId = Firebased.auth().currentUser;
            // console.log(userId);
          }
        })
        // .finally(() => {
        //   setLoading({ done: true, load: false });
        //   setTimeout(() => {
        //     setLoading({ ...Loading, done: false });
        //   }, 500);
        // })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("المرجو ملأ كل الخنات المطلوبة");
    }
  };
  const countries = ["عميل", "حرفي"];
  return (
    <ScrollView contentContainerStyle={styles.loginContainer}>
      <StatusBar
        animated={true}
        backgroundColor="#016249"
        style="auto"
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
              مرحبا بك
              {User ? User.lName : " "}
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

      <SelectDropdown
        defaultButtonText="هل أنت ؟"
        dropdownStyle={{ borderRadius: 10, width: "100%" }}
        buttonStyle={{
          // backgroundColor: "red",
          marginLeft: 5,
          borderRadius: 20,
          width: "50%",
          //   height: "50%",
          borderColor: "#20D2A3",
          borderWidth: 2,
          marginBottom: 10,
        }}
        renderDropdownIcon={() => (
          <Icon name="arrow-drop-down" size={35} color="#20D2A3" />
        )}
        data={countries}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          setuserData({ ...userData, type: selectedItem });
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        renderCustomizedRowChild={(item, index) => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              {/* <Image source={item.image} style={styles.dropdownRowImage} /> */}
              <Icon name="person" size={15} color="#20D2A3" />
              <Text style={{ color: "black", fontSize: 15 }}>{item}</Text>
            </View>
          );
        }}
      />

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
      {/* {LoginData.error && (
        <Text style={{ color: "red", margin: 5 }}>{LoginData.error}</Text>
      )} */}
      <Button
        icon={{ name: "login", color: "white" }}
        loading={Loading.load}
        iconLeft
        title="دخول"
        buttonStyle={{ width: 200, margin: 10 }}
        onPress={() => doLogin(userData)}
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
          ليس لديك حساب ؟<Text> </Text>
          <Text
            style={{
              color: "#016249",
              margin: 50,
              fontWeight: "bold",
              // paddingLeft: 5,
            }}
            onPress={() =>
              navigation.navigate("ClientOrSeller", {
                // name: "SignUp",
                withAnimation: true,
              })
            }
          >
            أنشئ واحدا
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

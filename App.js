import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, I18nManager } from "react-native";
import Firebased from "./config/config";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import MyStack from "./components/screens/addons/MyStack";
import { mainContext } from "./config/context";
export default function App() {
  useEffect(() => {
    // return () => {
    I18nManager.forceRTL(true);
    // console.log(I18nManager.isRTL);
    // };
  }, []);

  // .get()

  // .then((snapshot) => {
  //   // console.log(snapshot);
  //   if (snapshot.exists()) {
  //     setnapoo(snapshot.val());
  //   } else {
  //     alert(" ليست هناك أي معلومات");
  //   }
  // })
  // .catch((error) => {
  //   alert(error);
  // });

  // const dbRef = Firebased.database().ref();

  // dbRef
  //   .child("SellerUsers")
  //   .orderByChild("specialty")
  //   .equalTo("طبيب أسنان")
  //   .on("value", function (snapshot) {
  //     console.log(snapshot.val());
  //     snapshot.forEach(function (data) {
  //       console.log(data);
  //     });
  //   });

  // let email = "sdfsd@fdsf5.fr";
  // let pass = "password";
  // let fullName = "youssef adbib";

  // const signup = () => {
  //   Firebase.auth()
  //     .createUserWithEmailAndPassword(email, pass)
  //     .then((e) => {
  //       // const uid = response.user.uid;
  //       const data = {
  //         id: e.user.uid,
  //         email,
  //         fullName,
  //       };
  //       const usersRef = Firebase.firestore().collection("users");
  //       usersRef
  //         .doc(e.user.uid)
  //         .set(data)
  //         .then((e) => {
  //           console.log(e);
  //           // navigation.navigate('Home', {user: data})
  //         })
  //         .catch((error) => {
  //           alert(error);
  //         });
  //       // console.log(e.user.uid)
  //       // Firebase.database()
  //       //   .ref("users/" + e.user.uid)
  //       //   .set({
  //       //     highscore: "12314",
  //       //   })
  //       //   .then((e) => console.log(e));
  //     });
  // };

  // const signin = () => {
  //   Firebase.auth()
  //     .signInWithEmailAndPassword(email, pass)
  //     .then((e) => console.log(e))
  //     .catch((error) => console.log(error));
  // };
  const [isLogged, setIsLogged] = useState(false);
  const [User, setUser] = useState({});
  return (
    <mainContext.Provider
      value={{
        User,
        setUser,
        isLogged,
        setIsLogged,
      }}
    >
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </mainContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

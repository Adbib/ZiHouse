import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import { Image, Input, Button, Icon } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import SelectDropdown from "react-native-select-dropdown";
import CountryPicker, { FlagButton } from "react-native-country-picker-modal";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Firebased from "../../config/config";
import jobs from "./addons/jobs";

export default function SellerSignup({ navigation }) {
  const [profileImage, setprofileImage] = useState(null);
  const [userData, setuserData] = useState({
    fName: null,
    lName: null,
    email: null,
    phone: null,
    phoneFix: null,
    specialty: null,
    country: {
      callingCode: ["966"],
      cca2: "SA",
      currency: ["SAR"],
      flag: "flag-sa",
      name: "Saudi Arabia",
      region: "Asia",
      subregion: "Western Asia",
    },
    address: null,
    aboutme: null,
    imgUri: null,
    site: null,
    password: null,
    cpassword: null,
    error: false,
    errorMsg: "",
  });
  const [Loading, setLoading] = useState({ load: false, done: false });
  const doSignupSeller = (data) => {
    if (
      !data.fName &&
      !data.lName &&
      !data.email &&
      !data.phone &&
      !data.aboutme &&
      !data.address &&
      !data.aboutme &&
      // !data.address &&
      !data.specialty &&
      !data.password &&
      !data.cpassword
    ) {
      alert("المرجو ملأ كل الخنات المطلوبة");
    } else {
      if (data.password !== data.cpassword) {
        alert("المرجو التأكد من تطابق كلمة السر");
      } else {
        // console.log(data);
        // console.log("fdsf");
        _uploadImg(userData);
      }
    }
  };

  // const countries = ["طبيب اسنان", "نجار", "عامل تنشيف", "مصبنة"];

  const chooseFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setuserData({ ...userData, imgUri: result.uri });
      // setprofileImage(result.uri);
    }
  };

  const _uploadImg = async (data) => {
    setLoading({ ...Loading, load: true });
    console.log(data.imgUri);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        setuserData({ ...userData, imgUri: null });
        setLoading({ ...Loading, load: false });
        alert("حدث خطأ في رفع الصورة! المرجو اعادة تحديد الصورة");
        // console.log(e);
        // reject(new TypeError("Network request failed"));
        // console.log("yeeds");
      };
      xhr.responseType = "blob";
      xhr.open("GET", data.imgUri, true);
      xhr.send(null);
    });
    // if (blob) {
    //   console.log("yedes");
    // } else {
    //   console.log("no");
    // }
    // console.log(blob);

    var storageRef = Firebased.storage()
      .ref("")
      .child(`userImgs/${data.email}.jpg`);
    const snapshot = await storageRef.put(blob);
    const imgurl = await snapshot.ref.getDownloadURL();
    setprofileImage(imgurl);
    console.log(imgurl);
    blob.close();
    if (imgurl.length > 15) {
      Firebased.auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((response) => {
          response.user.updateProfile({
            displayName: `${data.fName} ${data.lName}`,
          });
          Firebased.database()
            .ref("SellerUsers/" + response.user.uid)
            .set({
              id: response.user.uid,
              fName: data.fName,
              lName: data.lName,
              email: response.user.email,
              phone: data.phone,
              phoneFix: data.phoneFix,
              type: "seller",
              specialty: data.specialty,
              address: data.address,
              aboutMe: data.aboutme,
              imgProfile: imgurl,
              country: data.country.name,
              site: data.site,
            });
          // setuserData({ ...userData, fName: e });
        })
        .finally(() => {
          // console.log("hhhhh");
          setLoading({ done: true, load: false });
          setTimeout(() => {
            setLoading({ ...Loading, done: false });
          }, 500);
        })
        .catch((error) => {
          alert(error);
          setuserData({ ...userData, imgUri: null });
        });
    } else {
      setLoading({ ...Loading, load: false });
    }

    // console.log(bla);

    return imgurl;
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

      {/* {userData.imgUri && ( */}
      <Image
        source={
          !userData.imgUri
            ? require("../../assets/doctor1.png")
            : { uri: userData.imgUri }
        }
        style={{
          width: 150,
          height: 150,
          borderRadius: 50,
          resizeMode: "center",
          marginBottom: 10,
        }}
      />
      {/* )} */}
      <Button
        iconRight
        buttonStyle={styles.secdryBtn}
        titleStyle={{ color: "#20D2A3", fontSize: 18, padding: 5 }}
        icon={<Icon name="image" size={25} color="#20D2A3" />}
        title="اختر صورة"
        onPress={() => chooseFile()}
      />
      <SelectDropdown
        defaultButtonText="مجال العمل"
        dropdownStyle={{ borderRadius: 10, width: "100%" }}
        buttonStyle={{
          // backgroundColor: "red",
          marginLeft: 5,
          borderRadius: 20,
          width: "90%",
          //   height: "50%",
          borderColor: "#20D2A3",
          borderWidth: 2,
          marginBottom: 10,
        }}
        renderDropdownIcon={() => (
          <Icon name="arrow-drop-down" size={35} color="#20D2A3" />
        )}
        data={jobs}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          setuserData({ ...userData, specialty: selectedItem });
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
        leftIcon={{ name: "phone", color: "#20D2A3" }}
        placeholder="رقم الجوال"
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
        leftIcon={{ name: "support-agent", color: "#20D2A3" }}
        placeholder="رقم الاهاتف التابث"
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
        onChangeText={(e) => setuserData({ ...userData, phoneFix: e })}
      />
      <Input
        leftIcon={{ name: "support-agent", color: "#20D2A3" }}
        placeholder="الموقع الالكتروني"
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
        onChangeText={(e) => setuserData({ ...userData, site: e })}
      />
      <View style={styles.topCadr}>
        <CountryPicker
          containerButtonStyle={{
            flexDirection: "row",
            // backgroundColor: "red",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
          withFilter
          placeholder="الدولة"
          placeholder={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center" }}>
                {userData.country ? userData.country.name : " السعودية"}
              </Text>
              <FlagButton
                countryCode={userData.country ? userData.country.cca2 : "SA"}
              />
            </View>
          }
          onSelect={(item) => setuserData({ ...userData, country: item })}
          withEmoji
        />
      </View>
      <Input
        leftIcon={{ name: "business", color: "#20D2A3" }}
        placeholder="العنوان"
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
        onChangeText={(e) => setuserData({ ...userData, address: e })}
      />
      <Input
        leftIcon={{ name: "comment", color: "#20D2A3" }}
        placeholder="تحدث قليلا عنك"
        // containerStyle={{ width: "50%" }}
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
        multiline
        numberOfLines={5}
        // value={LoginData.username}
        onChangeText={(e) => setuserData({ ...userData, aboutme: e })}
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
        // onPress={() => doLogin(LoginData.username, LoginData.password)}
        containerStyle={{ width: "100%" }}
        buttonStyle={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: "#016249",
          padding: 13,
          borderRadius: 10,
        }}
        onPress={() => doSignupSeller(userData)}
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
            onPress={() => {
              navigation.navigate("Login", {
                // name: "SignUp",
                withAnimation: true,
              });
            }}
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
  topCadr: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 50,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "90%",
    paddingRight: 3,
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#20D2A3",
  },
  secdryBtn: {
    backgroundColor: "#eee",
    borderColor: "#20D2A3",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
});

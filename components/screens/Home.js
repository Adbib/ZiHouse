import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image, Icon, Button } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import { StatusBar } from "expo-status-bar";
import CountryPicker, {
  getAllCountries,
  getCallingCode,
  FlagButton,
} from "react-native-country-picker-modal";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import Firebased from "../../config/config";
import { mainContext } from "../../config/context";
import jobs from "./addons/jobs";

export default function Home({ navigation }) {
  // useEffect(() => {
  //   const blad = Font.loadAsync({
  //     myfon: require("../../assets/fonts/1.ttf"),
  //   });
  // }, []);
  // let [fontsLoaded] = useFonts({
  //   myfoi: "http://qimahost.com/1.ttf",
  // });
  // const countries = ["طبيب اسنان", "نجار", "عامل تنشيف", "مصبنة"];
  //const [selectedCountry, setselectedCountry] = useState(null);
  const [SearchValues, setSearchValues] = useState({
    specialty: "طبيب اسنان",
    country: {
      callingCode: ["966"],
      cca2: "SA",
      currency: ["SAR"],
      flag: "flag-sa",
      name: "Saudi Arabia",
      region: "Asia",
      subregion: "Western Asia",
    },
  });
  const { User, setUser, isLogged, setIsLogged } = useContext(mainContext);

  const getSearch = (country, specialty) => {
    const dbRef = Firebased.database().ref();
    dbRef
      .child("SellerUsers")
      //   .child(response.user.uid)
      .orderByChild("specialty")
      // .orderBy("specialty")
      // .startAt('comedy').endAt('comedy')
      .equalTo(specialty)
      // .orderBy("country")
      // .equalTo("Aruba")
      .on("value", function (snapshot) {
        const data = snapshot.val();
        navigation.navigate("List", { data: data, sellerCountry: country });
        // console.log(snapshot);
        // snapshot.forEach(function (data) {
        //   console.log(data);
        // });
      });
  };

  const Logout = () => {
    Firebased.auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        setIsLogged(false);
        setUser({});
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <View style={{ backgroundColor: "#016249" }}>
      <StatusBar
        animated={true}
        backgroundColor="#016249"
        // style="light"
        // barStyle={{ paddingTop: 40, margin: 20 }}
        // showHideTransition={statusBarTransition}
        hidden={false}
      />
      <View style={styles.viewTop}>
        <View
          style={[
            styles.topCadr,
            {
              backgroundColor: "white",
              flexDirection: "row",
              borderRadius: 50,
              height: "50%",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              // width: "33%",
              paddingRight: 3,
              // paddingLeft: 40,
            },
          ]}
        >
          <CountryPicker
            containerButtonStyle={{
              flexDirection: "row",
              // backgroundColor: "red",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
            withFilter
            // placeholder="الدولة"
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
                  {SearchValues.country
                    ? SearchValues.country.name
                    : " السعودية"}
                </Text>
                <FlagButton
                  countryCode={
                    SearchValues.country ? SearchValues.country.cca2 : "SA"
                  }
                />
              </View>
            }
            onSelect={(item) =>
              setSearchValues({ ...SearchValues, country: item })
            }
            withEmoji
          />
          {/* <Image
            style={{ width: 30, height: 20, margin: 5 }}
            source={require("../../assets/Flags/ksa.webp")}
          />
          <Text
          // style={{
          //   backgroundColor: "white",
          //   padding: 10,
          //   borderRadius: 10,
          //   borderColor: "#20D2A3",
          //   borderWidth: 2,
          // }}
          >
            السعودية
          </Text> */}
        </View>
        <View style={styles.topCadr}>
          <Text
            style={{
              color: "white",
              fontSize: 40,
              fontWeight: "bold",
              // fontFamily: "myfon",
            }}
          >
            مرحبا
          </Text>
        </View>
        <View
          style={[
            // styles.topCadr,
            {
              width: "35%",
              // height: "20%",
              // backgroundColor: "red",
            },
          ]}
        >
          <SelectDropdown
            defaultButtonText="طبيب أسنان"
            dropdownStyle={{ borderRadius: 10, width: "100%" }}
            buttonStyle={{
              // backgroundColor: "red",
              marginLeft: 5,
              borderRadius: 20,
              width: "100%",
              height: "50%",
              // fontFamily: "myfon",
            }}
            renderDropdownIcon={() => (
              <Icon name="arrow-drop-down" size={35} color="#20D2A3" />
            )}
            data={jobs}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setSearchValues({ ...SearchValues, specialty: selectedItem });
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
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      // fontFamily: "myfon",
                    }}
                  >
                    {item}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>

      <View style={styles.viewMidl}>
        <Image
          source={require("../../assets/icon1.png")}
          style={styles.mainImg}
        />
        <Text
          style={{
            color: "white",
            fontSize: 23,
            textAlign: "center",
            marginTop: 10,
            // fontFamily: "myfon",
          }}
        >
          دليلك الشامل في كل مكان
        </Text>
        <Button
          iconRight
          buttonStyle={{
            backgroundColor: "white",
            marginTop: 20,
            borderRadius: 100,
          }}
          titleStyle={{
            color: "#20D2A3",
            fontSize: 18,
            padding: 5,
            textAlign: "center",
            // fontFamily: "myfon",
            // alignSelf: "center",
          }}
          icon={<Icon name="search" size={25} color="#20D2A3" />}
          title="ابحث"
          // onPress={() => navigation.navigate("List")}
          onPress={() =>
            getSearch(SearchValues.country, SearchValues.specialty)
          }
        />
      </View>

      <View style={styles.viewBottom}>
        {!isLogged ? (
          <>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "50%", margin: 5 }}>
                <Button
                  iconRight
                  buttonStyle={styles.secdryBtn}
                  titleStyle={{
                    color: "#20D2A3",
                    fontSize: 18,
                    padding: 5,
                    // fontFamily: "myfon",
                  }}
                  icon={<Icon name="login" size={25} color="#20D2A3" />}
                  title="دخول"
                  onPress={() => navigation.navigate("Login")}
                />
              </View>

              <View style={{ width: "50%", margin: 5 }}>
                <Button
                  iconRight
                  buttonStyle={styles.primaryBtn}
                  titleStyle={{ fontSize: 18, padding: 5 }}
                  icon={<Icon name="person-add" size={25} color="white" />}
                  title="تسجيل"
                  onPress={() => navigation.navigate("ClientOrSeller")}
                />
              </View>
            </View>
            <View
              style={{
                width: "100%",
                padding: 5,
              }}
            >
              {/* <Text style={{ fontSize: 15 }}>نسيت كلمة المرور ؟</Text> */}
            </View>
          </>
        ) : (
          <View style={{ width: "50%", margin: 5 }}>
            <Button
              iconRight
              buttonStyle={styles.primaryBtn}
              titleStyle={{ fontSize: 18, padding: 5 }}
              icon={<Icon name="logout" size={25} color="white" />}
              title="تسجيل خروج"
              onPress={() => Logout()}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewTop: {
    // backgroundColor: "#016249",
    height: "20%",
    flexDirection: "row",
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  viewMidl: {
    // backgroundColor: "#016249",
    height: "55%",
    paddingTop: 50,
    // justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  viewBottom: {
    backgroundColor: "white",
    height: "25%",
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    width: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-end",
    paddingRight: 20,
    paddingLeft: 20,
  },
  topCadr: {
    // backgroundColor: "red",
    width: "30%",
    height: "100%",
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainImg: {
    width: 160,
    height: 160,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // elevation: 5,
  },
  primaryBtn: {
    backgroundColor: "#20D2A3",
    borderRadius: 10,
    borderColor: "#20D2A3",
    borderWidth: 2,
  },
  secdryBtn: {
    backgroundColor: "white",
    borderColor: "#20D2A3",
    borderWidth: 2,
    borderRadius: 10,
  },
});

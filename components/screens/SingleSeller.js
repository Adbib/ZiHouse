import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import {
  Icon,
  Rating,
  ListItem,
  Avatar,
  SocialIcon,
  Input,
  Button,
} from "react-native-elements";
import "react-native-vector-icons";
import Firebased from "../../config/config";
import { mainContext } from "../../config/context";
export default function SingleSeller({ route }) {
  // console.log(route.params.data);
  const { User, setUser, isLogged, setIsLogged } = useContext(mainContext);
  const [Comments, setComments] = useState([]);
  useEffect(() => {
    Firebased.firestore()
      .collection(`Comments`)
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs
          .filter((doc) => doc.data().sellerid === route.params.data.id)
          .map((doc) => {
            return { id: doc.id, ...doc.data() };
            // console.log(doc.data().sellerid);
          });
        // console.log(posts);
        setComments(posts);
      });
  }, []);
  const [Comment, setComment] = useState({
    user: "",
    comment: "",
    sellerId: route.params.data.id,
  });
  const addComment = (username, comment, sellerid, id) => {
    Firebased.firestore()
      .collection(`Comments`)
      .add({
        username,
        id,
        comment,
        sellerid,
      })
      .catch((err) => {
        console.error("error adding comment: ", err);
      });
  };
  // const list = [
  //   {
  //     name: "يوسف أضبيب",
  //     avatar_url:
  //       "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
  //     subtitle: "تعليق تععليق تعليق تعليق تعليق",
  //   },
  //   {
  //     name: "يوسف أضبيب",
  //     avatar_url:
  //       "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
  //     subtitle: "تعليق تععليق تعليق تعليق تعليق",
  //   },
  // ];
  return (
    <View style={styles.listContainer}>
      <View style={styles.topView}>
        <Image
          source={require("../../assets/icon1.png")}
          resizeMode="center"
          style={{
            width: 80,
            height: 85,
            alignSelf: "center",
            top: 20,
            zIndex: 1000,
          }}
        />
      </View>
      <ScrollView contentContainerStyle={styles.buttomView}>
        <View
          style={{
            // backgroundColor: "red",
            width: "100%",
            height: 150,
            flexDirection: "row",
          }}
        >
          <View style={{ width: "30%", height: "100%" }}>
            <Image
              // source={require("../../assets/doctor.jpg")}
              source={
                !route.params.data.imgProfile
                  ? require("../../assets/doctor1.png")
                  : { uri: route.params.data.imgProfile }
              }
              resizeMode="center"
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                alignSelf: "center",
                marginTop: 5,
              }}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "bold",
                padding: 10,
              }}
            >
              {route.params.data.fName + " " + route.params.data.lName}
            </Text>

            {/* <Rating
              type="custom"
              ratingColor="orange"
              ratingBackgroundColor="#c8c7c8"
              ratingCount={5}
              imageSize={15}
            /> */}
          </View>
          <View
            style={{
              //   backgroundColor: "green",
              width: "70%",
              height: "100%",
              //   textAlign: "center",
              //   alignContent: "center",
              //   alignItems: "center"
              //   justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Text> {route.params.data.phone}</Text>
              <Icon name="phone" color="#20D2A3" />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Text> {route.params.data.email}</Text>
              <Icon name="email" color="#20D2A3" />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Text> {route.params.data.site}</Text>
              <Icon name="language" color="#20D2A3" />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Text> {route.params.data.address}</Text>
              <Icon name="place" color="#20D2A3" />
            </View>
          </View>
        </View>

        <View style={{ width: "100%", height: 400 }}>
          <Image
            // source={require("../../assets/doctor.jpg")}
            source={
              !route.params.data.imgProfile
                ? require("../../assets/doctor1.png")
                : { uri: route.params.data.imgProfile }
            }
            // resizeMode="contain"
            style={{
              width: "80%",
              height: 250,
              borderRadius: 5,
              alignSelf: "center",
              resizeMode: "contain",
              marginTop: 10,
            }}
          />
          <Text style={{ textAlign: "center", padding: 10 }}>
            {route.params.data.aboutMe}
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            height: 500,
            borderWidth: 2,
            borderColor: "#20D2A3",
            borderRadius: 5,
            padding: 10,
          }}
        >
          {/* <Text>
            التقيمات
            <Rating
              type="custom"
              ratingColor="orange"
              ratingBackgroundColor="#c8c7c8"
              ratingCount={5}
              imageSize={15}
            />
          </Text> */}

          <View>
            {Comments.length > 0 ? (
              Comments.map((l, i) => (
                <ListItem key={i} bottomDivider>
                  <Avatar
                    source={require("../../assets/doctor1.png")}
                    rounded
                  />
                  <ListItem.Content>
                    <ListItem.Title>{l.username}</ListItem.Title>
                    <ListItem.Subtitle>{l.comment}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))
            ) : (
              <Text>لا تعليقات </Text>
            )}
          </View>
          {isLogged && (
            <View style={{ marginTop: 20 }}>
              <Input
                leftIcon={{ name: "comment", color: "#20D2A3" }}
                placeholder="التعليق"
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
                onChangeText={(e) =>
                  setComment({
                    comment: e,
                    user: `${route.params.data.fName} ${route.params.data.lName}`,
                    sellerId: route.params.data.id,
                  })
                }
              />
              <Button
                iconLeft
                buttonStyle={styles.primaryBtn}
                titleStyle={{ fontSize: 18, padding: 5 }}
                icon={<Icon name="add" size={25} color="white" />}
                title="أضف"
                onPress={() =>
                  addComment(
                    Comment.user,
                    Comment.comment,
                    Comment.sellerId,
                    User.id
                  )
                }
              />
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            justifyContent: "center",
            // backgroundColor: "red",
            alignItems: "center",
          }}
        >
          <SocialIcon
            style={{ backgroundColor: "#20D2A3", borderRadius: 5, padding: 5 }}
            type="twitter"
            iconSize={15}
            // light
            raised={false}
          />
          <SocialIcon
            style={{ backgroundColor: "#20D2A3", borderRadius: 5, padding: 5 }}
            type="facebook"
            iconSize={15}
            // light
            raised={false}
          />
          <SocialIcon
            style={{ backgroundColor: "#20D2A3", borderRadius: 5, padding: 5 }}
            type="instagram"
            iconSize={15}
            // light
            raised={false}
          />
          <SocialIcon
            type="youtube"
            iconSize={15}
            // light
            style={{ backgroundColor: "#20D2A3", borderRadius: 5, padding: 5 }}
            raised={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 50,
    height: "100%",
    backgroundColor: "#016249",
  },
  topView: {
    height: "8%",
    zIndex: 1000,
    backgroundColor: "#016249",
    justifyContent: "flex-end",
  },
  buttomView: {
    backgroundColor: "white",
    justifyContent: "center",
    paddingTop: 70,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 100,
    borderRadius: 100,
    paddingLeft: 20,
    paddingRight: 20,
  },
  primaryBtn: {
    backgroundColor: "#20D2A3",
    borderRadius: 10,
    borderColor: "#20D2A3",
    borderWidth: 2,
    width: "50%",
  },
});

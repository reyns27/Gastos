import React,{useContext} from "react";
import {
  Avatar,
  Button,
  Card,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import { View, StyleSheet, ImageBackground } from "react-native";
import { UserContext } from "../context/userContext";
const Home = ({ navigation }) => {
  const [userData,setUserData] = useContext(UserContext);
  return (
    <View>
      <ImageBackground
        source={require("../../assets/Fondo3.jpg")}
        resizeMode="cover"
        style={{ height: 750 }}
      >
        <Card style={Styles.Card}>
          <Card.Content>
            <Text>{userData.email}</Text>
            <Text>{userData.username}</Text>
          </Card.Content>
        </Card>
      </ImageBackground>
    </View>
  );
};

const Styles = StyleSheet.create({
  Card: {
    height: 550,
    backgroundColor:'transparent'
  },
});

export default Home;

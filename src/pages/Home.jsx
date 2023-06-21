import React from "react";
import {
  Avatar,
  Button,
  Card,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import Footer from "../components/Footer";
import { View, StyleSheet, ImageBackground } from "react-native";

const Home = ({ route, navigation }) => {
  const { credential } = route.params;
  return (
    <View>
      <ImageBackground
        source={require("../../assets/Fondo3.jpg")}
        resizeMode="cover"
        style={{ height: 750 }}
      >
        <Card style={Styles.Card}>
          <Card.Content>
            <Text>{credential.email}</Text>
            <Text>{credential.password}</Text>
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

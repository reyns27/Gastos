import React from "react";
import { ImageBackground, View } from "react-native";

const Statud = ({ route, navigation }) => {
  return (
    <View>
      <ImageBackground
        source={require("../../assets/Fondo3.jpg")}
        resizeMode="cover"
        style={{ height: 750 }}
      >
      </ImageBackground>
    </View>
  );
};

export default Statud;

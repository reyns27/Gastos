import React, { useState } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ModalDetailsComponent from "../components/ModalDetailsComponent";

const Styles = StyleSheet.create({
  Card: {
    backgroundColor: "transparent",
    margin: 10,
    color: "white",
    padding: 10,
  },
  buttonIcon: {
    backgroundColor: "#9023F2",
  },
});
const StatudDetails = ({ route, navigation }) => {
  const { statud } = route.params;
  const [visible, setVisible] = useState(false);
  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        source={require("../../assets/Fondo3.jpg")}
        resizeMode="cover"
        style={{ height: 750 }}
      >
        <View>
          <Card style={Styles.Card}>
            <Card.Title
              subtitleStyle={{ color: "white" }}
              titleStyle={{ color: "white", fontWeight: "bold" }}
              title={statud.description}
              subtitle={statud.createdAt}
              right={(props) => (
                <IconButton
                  style={Styles.buttonIcon}
                  mode="contained"
                  {...props}
                  icon="calendar-plus"
                  iconColor="white"
                  onPress={() => setVisible(!visible)}
                />
              )}
            />
          </Card>
          <ModalDetailsComponent visible={visible} setVisible={setVisible} />
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default StatudDetails;

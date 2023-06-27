import React from "react";
import { Modal, Portal, TextInput, IconButton, Card } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import axios from "axios";

const Styles = StyleSheet.create({
  ModalContaine: {
    display: "flex",
    backgroundColor: "transparent",
    alignSelf: "center",
    padding: 20,
    width: 350,
    height: 350,
  },
});
const ModalDetailsComponent = ({ visible, setVisible }) => {
  return (
    <View>
      <Portal>
        <Modal visible={visible} contentContainerStyle={Styles.ModalContaine}>
          <Card>
            <Card.Title title={"Nuevo detalle"} />
            <Card.Content>
              <TextInput label={"Descrición"} mode={"outlined"} />
              <TextInput label={"Precio"} mode={"outlined"} />
            </Card.Content>
            <Card.Actions>
              <IconButton
                style={{ backgroundColor: "red" }}
                iconColor={"white"}
                mode="contained"
                icon={"close-circle"}
                onPress={() => setVisible(!visible)}
              />
              <IconButton
                style={{ backgroundColor: "green" }}
                iconColor={"white"}
                mode="contained"
                icon={"content-save"}
                onPress={() => setVisible(!visible)}
              />
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
    </View>
  );
};

export default ModalDetailsComponent;

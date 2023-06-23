import { useState } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import {
  Card,
  Avatar,
  IconButton,
  Modal,
  Portal,
  Text,
  Button,
  TextInput,
} from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const Styles = StyleSheet.create({
  Card: {
    margin: 10,
    backgroundColor: "transparent",
  },
  Title: {
    color: "white",
  },
  buttonIcon: {
    backgroundColor: "#9023F2",
  },
  modal: {
    display: "flex",
    backgroundColor: "transparent",
    alignSelf: "center",
    padding: 20,
    width: 350,
    height: 350,
  },
});

const CreateStatusModalComponent = ({ visible, setVisible }) => {
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <KeyboardAwareScrollView>
      <View>
        <Portal>
          <Modal
            dismissable={false}
            visible={visible}
            contentContainerStyle={Styles.modal}
          >
            <Card>
              <Card.Title title={"Nuevo estado"} />
              <Card.Content>
                <TextInput label={"Nombre de estado"} />
              </Card.Content>
              <Card.Actions>
                <IconButton
                  mode="contained"
                  icon={"close-circle"}
                  onPress={() => hideModal()}
                />
                <IconButton mode="contained" icon={"content-save"} />
              </Card.Actions>
            </Card>
          </Modal>
        </Portal>
      </View>
    </KeyboardAwareScrollView>
  );
};

const Statud = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  return (
    <View>
      <ImageBackground
        source={require("../../assets/Fondo3.jpg")}
        resizeMode="cover"
        style={{ height: 750 }}
      >
        <Card style={Styles.Card}>
          <Card.Content>
            <Card.Title
              style={Styles.Title}
              title={"Mis Estados"}
              subtitle="Card Subtitle"
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
              right={(props) => (
                <IconButton
                  style={Styles.buttonIcon}
                  mode="contained"
                  {...props}
                  icon="book-plus"
                  iconColor="white"
                  onPress={() => showModal()}
                />
              )}
            ></Card.Title>
          </Card.Content>
        </Card>
        <CreateStatusModalComponent visible={visible} setVisible={setVisible} />
      </ImageBackground>
    </View>
  );
};

export default Statud;

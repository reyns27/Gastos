import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { ImageBackground, View, StyleSheet, Alert } from "react-native";
import {
  Card,
  Avatar,
  IconButton,
  Modal,
  Portal,
  Text,
  Button,
  TextInput,
  Divider,
  List,
} from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { baseUrl } from "../constant";
const Styles = StyleSheet.create({
  Card: {
    margin: 10,
    backgroundColor: "transparent",
  },
  CardArray: {
    margin: 10,
    backgroundColor: "transparent",
    padding: 10,
    display: "flex",
  },
  Title: {
    color: "white",
    fontWeight: "bold",
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
  ViewTotal: {
    alignSelf: "flex-start",
  },
  CardActions: {
    display: "flex",
  },
});

const CreateStatusModalComponent = ({
  visible,
  setVisible,
  userData,
  setChange,
  change,
}) => {
  const hideModal = () => setVisible(false);
  const [data, setData] = useState({
    description: "",
    userId: userData.id,
    expenses: 0,
    income: 0,
    balance: 0,
  });

  const createNewStatud = () => {
    if (data.description == "")
      return Alert.alert(
        "Advertencia",
        "Escriba un nombre para el nuevo estado!",
        [
          {
            text: "Ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      );
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.Token}`;
    axios.post(`${baseUrl}statud`, data).then(({ data }) => {
      if (data.description != undefined) {
        return Alert.alert("Advertencia", `Nuevo estado ${data.description}`, [
          {
            text: "Ok",
            onPress: () => setChange(!change),
            style: "cancel",
          },
        ]);
      }
      return Alert.alert("Advertencia", `No se pudo crear el estado!`, [
        {
          text: "Ok",
          onPress: () => null,
          style: "cancel",
        },
      ]);
    });
  };
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
                <TextInput
                  label={"Nombre de estado"}
                  onChangeText={(e) => setData({ ...data, description: e })}
                />
              </Card.Content>
              <Card.Actions>
                <IconButton
                  mode="contained"
                  icon={"close-circle"}
                  onPress={() => hideModal()}
                />
                <IconButton
                  mode="contained"
                  icon={"content-save"}
                  onPress={() => createNewStatud()}
                />
              </Card.Actions>
            </Card>
          </Modal>
        </Portal>
      </View>
    </KeyboardAwareScrollView>
  );
};

const Statud = ({ route, navigation }) => {
  //ESTADOS
  const [userData, setUserData] = useContext(UserContext);
  const [change, setChange] = useState(false);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const [data, setData] = useState([]);
  //FUNCIONES
  const GetData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.Token}`;
    await axios
      .get(`${baseUrl}statud/getuserid/${userData.id}`)
      .then(({ data }) => {
        setData(data);
      });
  };

  useEffect(() => {
    GetData();
  }, [change]);

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
              titleStyle={Styles.Title}
              subtitleStyle={{ color: "white" }}
              title={"Mis Estados"}
              subtitle="Card Subtitle"
              left={(props) => (
                <Avatar.Icon {...props} icon="calendar-blank-multiple" />
              )}
              right={(props) => (
                <IconButton
                  style={Styles.buttonIcon}
                  mode="contained"
                  {...props}
                  icon="calendar-plus"
                  iconColor="white"
                  onPress={() => showModal()}
                />
              )}
            ></Card.Title>
          </Card.Content>
        </Card>
        {data.length != null ? (
          data.map((ele, i) => (
            <Card key={i} style={Styles.CardArray}>
              <Card.Title
                titleStyle={{ color: "white", fontWeight: "bold" }}
                title={ele.description}
                subtitleStyle={{ color: "white" }}
                subtitleVariant="labelMedium"
                subtitle={`Inicio: ${ele.createdAt}`}
                left={(props) => (
                  <Avatar.Icon {...props} icon="calendar-check" />
                )}
                right={(props) => (
                  <IconButton
                    style={Styles.buttonIcon}
                    mode="contained"
                    {...props}
                    icon="calendar-edit"
                    iconColor="white"
                    onPress={() =>
                      navigation.navigate("StatudDetails", { statud: ele })
                    }
                  />
                )}
              />
              <Divider theme={{ colors: { primary: "green" } }} />
              <Card.Actions style={Styles.CardActions}>
                <View style={Styles.ViewTotal}>
                  <Text style={{ color: "green", fontWeight: "bold" }}>
                    Ingresos: {ele.expenses}
                  </Text>
                  <Text style={{ color: "red", fontWeight: "bold" }}>
                    Gastos: {ele.income}
                  </Text>
                  <Text style={{ color: "blue", fontWeight: "bold" }}>
                    Balance: {ele.balance}
                  </Text>
                </View>
              </Card.Actions>
            </Card>
          ))
        ) : (
          <Card>
            <Card.Content>
              <Text>Cargando......</Text>
            </Card.Content>
          </Card>
        )}
        <CreateStatusModalComponent
          visible={visible}
          setVisible={setVisible}
          userData={userData}
          setChange={setChange}
          change={change}
        />
      </ImageBackground>
    </View>
  );
};

export default Statud;

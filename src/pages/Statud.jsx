import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
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
  Divider,
} from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import TableComponent from "../components/Table";
import { baseUrl } from "../constant";
const Styles = StyleSheet.create({
  Card: {
    margin: 10,
    backgroundColor: "transparent",
  },
  CardArray: {
    margin: 10,
    backgroundColor: "transparent",
    padding: 10
  },
  Title: {
    color: "white",
    fontWeight: 'bold'
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

  //ESTADOS
  const [userData, setUserData] = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const [data, setData] = useState([])
  //FUNCIONES
  const GetData = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.Token}`
    await axios.get(`${baseUrl}statud/getuserid/${userData.id}`).then(({ data }) => {
      setData(data)
    })
  }

  useEffect(() => {
    GetData();
  }, []);



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
              subtitleStyle={{ color: 'white' }}
              title={"Mis Estados"}
              subtitle="Card Subtitle"
              left={(props) => <Avatar.Icon {...props} icon="calendar-blank-multiple" />}
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
        {
          data.length != null ?
            (data.map((ele, i) => (
              <Card key={i} style={Styles.CardArray}>
                <Card.Title
                  titleStyle={{ color: 'white', fontWeight: 'bold' }}
                  title={ele.description}
                  subtitleStyle={{ color: 'white' }}
                  subtitleVariant="labelMedium"
                  subtitle={`Balance: ${ele.balance}`}
                  left={(props) => <Avatar.Icon {...props} icon="calendar-check" />}
                  right={(props) => (
                    <IconButton
                      style={Styles.buttonIcon}
                      mode="contained"
                      {...props}
                      icon="calendar-edit"
                      iconColor="white"
                      onPress={() => showModal()}
                    />
                  )} />
                   <Divider theme={{ colors: { primary: 'green' } }}/>
                <Card.Actions>
                  <IconButton
                    style={Styles.buttonIcon}
                    mode="contained"
                    icon="calendar-edit"
                    iconColor="white"
                    onPress={() => showModal()}
                  />
                </Card.Actions>
              </Card>
            )))
            :
            <Card>
              <Card.Content><Text>Cargando......</Text></Card.Content>
            </Card>
        }
        <CreateStatusModalComponent visible={visible} setVisible={setVisible} />
      </ImageBackground>
    </View>
  );
};

export default Statud;

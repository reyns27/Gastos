import { useState, useContext, useEffect } from "react";
import { StyleSheet, View, ImageBackground, Alert } from "react-native";
import { Avatar, Button, Text, TextInput } from "react-native-paper";
import axios, { AxiosError } from "axios";
import { UserContext } from "../context/userContext";
import { baseUrl } from "../constant";

const Styles = StyleSheet.create({
  view: {
    display: "flex",
    height: 550,
  },
  input: {
    top: 300,
    margin: 10,
  },
  btn: {
    top: 300,
    width: 200,
    marginLeft: 10,
  },
  ViewsTwo: {
    position: "absolute",
    top: 820,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    backgroundColor: "transparent",
  },
  Title: {
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  Text: {
    color: "white",
  },
});

const Login = ({ navigation }) => {
  const [userData, setUserData] = useContext(UserContext);
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const Access = (parameters) => {
    const { email, password } = parameters;
    if (email == "")
      return Alert.alert("Advertencia", "Digite un correo", [
        {
          text: "Ok",
          style: "destructive",
          onPress: () => console.log("press"),
        },
      ]);
    if (password == "")
      return Alert.alert("Advertencia", "Digite una contraseña", [
        {
          text: "Ok",
          style: "destructive",
          onPress: () => console.log("press"),
        },
      ]);
    axios
      .post(`${baseUrl}login`, parameters)
      .then(({ status, data }) => {
        if (data.user) {
          setUserData({
            id: data.user.Id,
            username: data.user.userName,
            name: data.user.Name,
            lastname: data.user.lastName,
            email: data.user.email,
            rol: data.user.rolId,
            Token: data.Token,
          });
          setCredential({
            email: "",
            password: "",
          });
          navigation.navigate("Drawer");
        }
        if (data.response == "PASSWORD_INCORRECT")
          Alert.alert("Advertencia", "Usuario y/o contraseña incorrecta!", [
            {
              text: "Ok",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ]);
      })
      .catch(Axios => {
        console.log(Axios);
        return Alert.alert("Error de conexión", "Revise su conexión a internet", [
          {
            text: "Ok",
            style: "destructive",
            onPress: () => console.log("press"),
          },
        ]);
      });
  };

  return (
    <View style={Styles.view}>
      <ImageBackground
        source={require("../../assets/Fondo3.jpg")}
        resizeMode="cover"
        style={{ height: 950 }}
      >
        <Avatar.Image
          size={100}
          source={require("../../assets/Gastos2.png")}
          style={{ alignSelf: "center", position: "absolute", top: 150 }}
        />
        <TextInput
          label={"Email"}
          maxLength={30}
          style={Styles.input}
          value={credential.email}
          onChangeText={(e) =>
            setCredential({ password: credential.password, email: e })
          }
        />
        <TextInput
          label={"Contraseña"}
          maxLength={30}
          style={Styles.input}
          value={credential.password}
          onChangeText={(e) =>
            setCredential({ email: credential.email, password: e })
          }
          secureTextEntry={true}
        />
        <Button
          style={Styles.btn}
          icon="login"
          mode="contained"
          onPress={() => Access(credential)}
        >
          Ingresar
        </Button>
        <View style={Styles.ViewsTwo}>
          <Text style={Styles.Title}>Gastos</Text>
          <Text style={Styles.Text}>version 0.1</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

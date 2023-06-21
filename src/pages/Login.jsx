import { useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import {
  Avatar,
  Button,
  Text,
  TextInput,
} from "react-native-paper";
import * as SQLite from 'expo-sqlite';
const DB = SQLite.openDatabase('Gastos.db');
const Styles = StyleSheet.create({
  view:{
    display:'flex',
    height:550,
  },
  input: {
    top:300,
    margin: 10,

  },
  btn:{
    top:300,
    width:200,
    marginLeft:10
  },
  ViewsTwo: {
    position:'absolute',
    top:820,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    backgroundColor: "transparent",
  },
  Title: {
    fontWeight: "bold",
  },
});

const Login = ({ navigation }) => {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const Access = () => {
    DB.transaction((sql) => {
      sql.executeSql('SELECT *FROM Usuario',[],(_,{rows:{_array}}) => console.log(JSON.stringify(_array)),
      () => console.log('error', error))
    });
  }

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
          onPress={() => Access}
        >
          Ingresar
        </Button>
        <View style={Styles.ViewsTwo}>
          <Text style={Styles.Title}>Gastos</Text>
          <Text>version 0.1</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

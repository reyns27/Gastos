import React, { useContext, useState } from "react";
import { Card, IconButton, Text, TextInput } from "react-native-paper";
import { View, StyleSheet, ImageBackground } from "react-native";
import { UserContext } from "../context/userContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
const BaseUrl = "http://172.25.1.80:3000/user/";

const Styles = StyleSheet.create({
  Card: {
    margin: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnCancel:{
    backgroundColor:'red'
  }
});

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useContext(UserContext);
  const [data, setData] = useState({
    name:userData.name,
    lastname:userData.lastname,
  });
  const config ={
    headers:{
      Autorization:`Bearer ${userData.Token}`
    }
  };
  const UpdateProfile =() => {
    axios.patch(BaseUrl + `${userData.id}`,data,config).then(({data}) => {
      if(data)
        setUserData({...userData, name:data.name,lastname:data.lastname})
    })
  };

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
              title={"Mi perfil"}
              subtitle={`${userData.name} ${userData.lastname}`}
            />
            <Card.Content>
              <TextInput
                value={data.name}
                onChangeText={(e) => setData({...data, name:e})}
                label={"Nombre"}
                mode={"outlined"}
                style={Styles.input}
              />
              <TextInput
                value={data.lastname}
                onChangeText={(e) => setData({...data, lastname:e})}
                label={"Apellido"}
                mode={"outlined"}
                style={Styles.input}
              />
              <TextInput
                value={userData.username}
                label={"Usuario"}
                mode={"outlined"}
                style={Styles.input}
              />
              <TextInput
                value={userData.email}
                label={"Email"}
                mode={"outlined"}
                style={Styles.input}
              />
              <TextInput
                label={"Contraseña"}
                mode={"outlined"}
                style={Styles.input}
              />
              <TextInput
                label={"Confirmar contraseña"}
                mode={"outlined"}
                style={Styles.input}
              />
            </Card.Content>
            <Card.Actions>
              <IconButton
                mode="contained"
                icon={"close-circle"}
                iconColor={'red'}
                onPress={() => navigation.navigate("Home")}
                size={35}
              />
              <IconButton mode="contained" icon={"content-save"} size={35} onPress={() => UpdateProfile()}/>
            </Card.Actions>
          </Card>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default Profile;

import React, { useContext, useState } from "react";
import { Card, IconButton, Text, TextInput } from "react-native-paper";
import { View, StyleSheet, ImageBackground } from "react-native";
import { UserContext } from "../context/userContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { baseUrl } from "../constant";

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
    userName:userData.username,
    Name:userData.name,
    lastName:userData.lastname,
    email:userData.email,
    password:''
  });
 
  const UpdateProfile =() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.Token}` 
    axios.patch(`${baseUrl}user/${userData.id}`,data).then(({data}) => {
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
                value={data.Name}
                onChangeText={(e) => setData({...data, Name:e})}
                label={"Nombre"}
                mode={"outlined"}
                style={Styles.input}
              />
              <TextInput
                value={data.lastName}
                onChangeText={(e) => setData({...data, lastName:e})}
                label={"Apellido"}
                mode={"outlined"}
                style={Styles.input}
              />
              <TextInput
                value={data.userName}
                onChangeText={(e) => setData({...data, userName:e})}
                label={"Usuario"}
                mode={"outlined"}
                style={Styles.input}
              />
              <TextInput
                value={data.email}
                onChangeText={(e) => setData({...data, email:e})}
                label={"Email"}
                mode={"outlined"}
                style={Styles.input}
              />
              <TextInput
              onChangeText={(e) => setData({...data, password:e})}
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

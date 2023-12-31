import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { Alert } from "react-native";
import Statud from "../pages/Statud";
import StatudDetails from "../pages/StatudDetails";
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const AlertMessage = () => {
    return Alert.alert("Advertencia", "Desea salir de la aplicación?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => props.navigation.navigate("Login"),
      },
    ]);
  };

  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <DrawerItem label="Exit" onPress={() => AlertMessage()} />
    </DrawerContentScrollView>
  );
};

const DrawerComponent = ({ route, navigation }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ title: "Inicio" }}
      />
      <Drawer.Screen
        name="Statud"
        component={Statud}
        options={{ title: "Estados" }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Perfil" }}
      />
      <Drawer.Screen
        name="StatudDetails"
        component={StatudDetails}
        options={{ title: "Detalle", drawerType:"slide", drawerItemStyle: { display: "none"}}}
      />
    </Drawer.Navigator>
  );
};
export default DrawerComponent;

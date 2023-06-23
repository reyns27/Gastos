import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-native-paper";
import Login from "./src/pages/Login";
import DrawerComponent from "./src/components/Drawer";
import { UserProvider } from "./src/context/userContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <UserProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Drawer"
              component={DrawerComponent}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </UserProvider>
      </NavigationContainer>
    </Provider>
  );
}

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserList from "./views/UserList";
import UserForm from "./views/UserForm";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { UsersProvider } from "./context/UsersContext";

const Stack = createNativeStackNavigator();

export default (props) => {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="UserList"
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name="UserList"
            component={UserList}
            options={({ navigation }) => ({
              title: "Usuários",
              headerRight: () => (
                <Button
                  icon={<Icon name="add" size={35} color="#000" />}
                  onPress={() => navigation.navigate("UserForm")}
                  type="clear"
                />
              ),
            })}
          />

          <Stack.Screen
            name="UserForm"
            component={UserForm}
            options={{
              title: "Formulário",
              headerStyle: {
                backgroundColor: "#ff6833",
              },
              headerTintColor: "#000",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UsersProvider>
  );
};

const screenOptions = {
  headerStyle: {
    backgroundColor: "#ff6833",
  },
  headerTintColor: "#000",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

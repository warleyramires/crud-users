import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useCallback, useEffect, useState } from 'react';
import { View, StatusBar } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import UserList from "./views/UserList";
import UserForm from "./views/UserForm";
import UserDetails from "./views/UserDetails";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { UsersProvider } from "./context/UsersContext";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();
export default (props) => {


  const [appIsReady, setAppIsReady] = useState(false);



  useEffect(() => {
    async function prepare() {
      try {
       
        await Font.loadAsync(Entypo.font);
      
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
   
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="auto" /> 
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
            <Stack.Screen
            name="UserDetails"
            component={UserDetails}
            options={{
              title: "Detalhes do Usuário",
              headerStyle: {
                backgroundColor: "#ff6833",
              },
              headerTintColor: "#000",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UsersProvider>
      </View>


    
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

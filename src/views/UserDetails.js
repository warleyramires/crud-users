import React, { useContext, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import UsersContext from "../context/UsersContext";
import { Icon } from "@rneui/themed";

export default ({ route }) => {
    const [user] = useState(route.params ? route.params : {});
    const { dispatch } = useContext(UsersContext);
  
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon name="person" color="#ff6833" size={60} style={styles.icon} />
          <Text style={styles.text}>Nome: {user.nome}</Text>
        </View>
  
        <View style={styles.row}>
          <Icon name="email" color="#ff6833" size={60} style={styles.icon} />
          <Text style={styles.text}>Email: {user.email}</Text>
        </View>
  
        <View style={styles.row}>
          <Icon name="lock" color="#ff6833" size={60} style={styles.icon} />
          <Text style={styles.text}>Senha: {user.senha}</Text>
        </View>
  
        <View style={styles.row}>
          <Icon name="work" color="#ff6833" size={60} style={styles.icon} />
          <Text style={styles.text}>Cargo: {user.cargo}</Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#124064",
      justifyContent: "flex-start",
      paddingHorizontal: 30,
    },
    row: {
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 24,
      marginTop: 50,
    },
    icon: {
      marginRight: 10,
    },
    text: {
      fontSize: 28,
      color: "#fff",
    },
  });
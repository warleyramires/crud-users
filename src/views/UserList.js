import React, { useContext } from "react";
import { Alert, FlatList, View, Text } from "react-native";

import users from "../data/users";
import { Button, ListItem } from "@rneui/themed"
import { Icon } from "@rneui/themed";
import UsersContext from "../context/UsersContext";

export default (props) => {
  const { state, dispatch } = useContext(UsersContext);

  function confirmUserDeletion(user) {
    Alert.alert("Excluir Usuário", `Deseja excluir o usuário ${user.nome}?`, [
      {
        text: "Sim",
        onPress() {
          dispatch({
            type: "deleteUser",
            payload: user,
          });
        },
      },
      {
        text: "Não",
      },
    ]);
  }

  function getUserItem({ item: user }) {
    return (
      <ListItem
        key={user.id}
        title={user.nome}
        subtitle={user.email}
        bottomDivider
        containerStyle={{ backgroundColor: "#124064" }}
        onPress={() => props.navigation.navigate("UserDetails", user)}
      >
        <ListItem.Content>
          <ListItem.Title style={{ color: "#fff", fontSize: 18 }}>
            {user.nome}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "#fff" }}>
            {user.email}{" "}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={{ color: "#fff", fontWeight: "bold" }}>
            {user.cargo}{" "}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Button
          icon={<Icon name="edit" size={25} color="#fff" />}
          onPress={() => props.navigation.navigate("UserForm", user)}
          type="clear"
        />
        <Button
          icon={<Icon name="delete" size={25} color="#fff" />}
          onPress={() => confirmUserDeletion(user)}
          type="clear"
        />
      </ListItem>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(user) => user.id.toString()}
        data={state.users}
        renderItem={getUserItem}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#124064",
  },
  btn: {
    zIndex: 999,
  },
};

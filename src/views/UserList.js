import React from 'react';
import { Alert, FlatList, View } from 'react-native';

import users from '../data/users'  
import { Button, Icon, ListItem } from 'react-native-elements';

export default props => {

    function confirmUserDeletion(user){
        Alert.alert("Excluir Usuário", `Deseja excluir o usuário ${user.nome}?`, [
            {
                text: 'Sim',
                onPress(){
                    console.warn('Usuário excluído!' + user.id)
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getActions(user){
        return (
            <>
                <Button
                    onPress={()=> props.navigation.navigate('UserForm', user)}
                    icon={
                    <Icon
                        name="edit"
                        type="font-awesome"
                        size={25}
                        color="#fff"
                    />}
                    type="clear"
                />
                <Button
                    onPress={()=> confirmUserDeletion(user)}
                    icon={
                    <Icon
                        name="delete"
                        type="font-awesome"
                        size={25}
                        color="#fff"
                    />}
                    type="clear"
                />
            </>
    )
    }



    
    function getUserItem({item: user}){
        return (
            <ListItem 
                key={user.id}
                title={user.nome}
                subtitle={user.email}
                bottomDivider
                onPress={() => props.navigation.navigate('UserForm', user)}
                rightElement={getActions(user)}
                />
        )
    }
    return( 
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={users}
                renderItem={getUserItem}
            />
               
            
        </View>
    )
}
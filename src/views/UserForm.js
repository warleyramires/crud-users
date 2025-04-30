import React, { useContext, useState } from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import UsersContext from '../context/UsersContext';

export default ({route, navigation}) => {
    const [user, setUser]= useState (route.params ? route.params : {})
    const {dispatch} = useContext(UsersContext)

    return( 
       <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
            style={styles.input}
            onChangeText={text => setUser({...user, nome: text})}
            value={user.nome}
            placeholder="Insira seu nome"
            placeholderTextColor="#fff"
            />
        
        <Text style={styles.label}>Email</Text>
        <TextInput
            style={styles.input}
            onChangeText={text => setUser({...user, email: text})}
            value={user.email}
            placeholder="Insira seu email"
            placeholderTextColor="#fff"
            />
           
        <Text style={styles.label}>Senha</Text>
        <TextInput
            style={styles.input}
            onChangeText={text => setUser({...user, senha: text})}
            value={user.senha}
            placeholder="Insira sua senha(mínimo 8 caracteres)"
            placeholderTextColor="#fff"
            />

        <Text style={styles.label}>Cargo</Text>
        <TextInput
            style={styles.input}
            onChangeText={text => setUser({...user, cargo: text})}
            value={user.cargo}
            placeholder="Insira seu cargo"
            placeholderTextColor="#fff"
            
        />

        <Button 
            title="Salvar"
            onPress={() => {
                dispatch({
                    type: user.id ? 'updateUser' : 'createUser',
                    payload: user,
                })
                navigation.goBack()
            }}
           
        />
           
       </View>

       
    )
}

const styles = StyleSheet.create({

    form:{
        flex: 1,
        padding: 12,
        backgroundColor: "#000000",
        color: "#fff",
    },

    label:{
        fontSize: 20,
        color: "#fff",    
    },
    input:{
        height: 50,
        borderColor: '#fff',
        color: '#fff',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
        paddingLeft: 10,

    }

})
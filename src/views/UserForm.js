import React, { useState } from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default ({route, navigation}) => {

    const [user, setUser]= useState (route.params ? route.params : {})

    return( 
       <View style={styles.form}>
        <Text>Name</Text>
        <TextInput
            style={styles.input}
            onChangeText={text => setUser({...user, name: text})}
            value={user.name}
            placeholder="Insira seu nome"
            />
        
        <Text>Email</Text>
        <TextInput
            style={styles.input}
            onChangeText={text => setUser({...user, email: text})}
            value={user.email}
            placeholder="Insira seu email"
            />
           
        <Text>Senha</Text>
        <TextInput
            style={styles.input}
            onChangeText={text => setUser({...user, senha: text})}
            value={user.senha}
            placeholder="Insira sua senha(mínimo 8 caracteres)"
            />

        <Text>Cargo</Text>
        <TextInput
            style={styles.input}
            onChangeText={text => setUser({...user, cargo: text})}
            value={user.cargo}
            placeholder="Insira seu cargo"
        />

        <Button 
            title="Criar Usuário"
            onPress={() => {
                navigation.goBack()
            }}
        />
           
       </View>

       
    )
}

const styles = StyleSheet.create({

    form:{
        padding: 12,
    },
    input:{
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 10,
    }

})
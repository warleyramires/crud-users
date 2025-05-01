import React, { act, useContext, useEffect, useState } from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";
import { Button } from "@rneui/themed";
import UsersContext from "../context/UsersContext";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ActivityIndicator } from "react-native";



const validationSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      "Sua senha deve conter letras e números"
    )
    .required("Senha é obrigatória"),
  cargo: yup.string().required("Cargo é obrigatório"),
});

export default ({ route, navigation }) => {
  const [user, setUser] = useState(route.params ? route.params : {});
  const { dispatch } = useContext(UsersContext);
  const [loading, setLoading] = useState(false);
  const [btnTexto, setBtnTexto] = useState("Cadastrar");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: user,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setBtnTexto("Salvando...");
    
    setTimeout(() => {
      dispatch({
        type: user.id ? "updateUser" : "createUser",
        payload: data,
      });
      setLoading(false);
      setBtnTexto("Cadastrar");
      navigation.goBack();
    }, 1500); 
  };


  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Nome</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Insira seu nome"
            placeholderTextColor="#fff"
          />
        )}
        name="nome"
      />
      {errors.nome && <Text style={styles.error}>{errors.nome.message}</Text>}

      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            inputMode="email"
            style={styles.input}
            onChangeText={(text) => {
              const emailLowerCase =
                text.charAt(0).toLowerCase() + text.slice(1);
              onChange(emailLowerCase);
            }}
            value={value}
            placeholder="Insira seu email"
            placeholderTextColor="#fff"
            type="email"
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.label}>Senha</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Insira sua senha (mínimo 8 caracteres)"
            placeholderTextColor="#fff"
            secureTextEntry={true}
          />
        )}
        name="senha"
      />
      {errors.senha && <Text style={styles.error}>{errors.senha.message}</Text>}

      <Text style={styles.label}>Cargo</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            placeholder="Insira seu cargo"
            placeholderTextColor="#fff"
          />
        )}
        name="cargo"
      />
      {errors.cargo && <Text style={styles.error}>{errors.cargo.message}</Text>}

      {loading ? (
  <ActivityIndicator size="large" color="#fff" style={styles.activityIndicator} />
) : (
  <Button titleStyle={styles.btnTitle} buttonStyle={styles.btn} style={styles.btn} title={btnTexto} onPress={handleSubmit(onSubmit)} />
)}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 12,
    backgroundColor: "#000000",
    color: "#fff",
  },
  label: {
    fontSize: 20,
    color: "#fff",
  },
  input: {
    height: 50,
    borderColor: "#fff",
    color: "#fff",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  error: {
    color: "red",
    fontSize: 14,
  },
  btn: {
    backgroundColor: "#ff6833",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 10,
  },
  btnTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  
  activityIndicator: {
    backgroundColor: "#ff6833",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
});

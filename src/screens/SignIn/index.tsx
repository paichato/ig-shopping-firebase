import React, { useState } from "react";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInAnonym = async () => {
    const { user } = await auth().signInAnonymously();
  };

  const handleCreateUserAccount = async () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert("Usuario criado com sucesso!"))
      .catch((error) => {
        console.log(error.message);
        Alert.alert("Erro ao criar conta", JSON.stringify(error.message));
      });
  };

  const handleSignInWithEmail = async () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          // Alert.alert("Usuario criado com sucesso!");
        }
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert("Erro ao criar conta", JSON.stringify(error.message));
      });
  };
  const handleForgotPassword = async () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "Enviamos-lhe um email",
          `Verique a sua caixa de entrada para o email: ${email}`
        );
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert("Erro ao resetar password", JSON.stringify(error.message));
      });
  };

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleSignInWithEmail} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUserAccount}
        />
      </Account>
    </Container>
  );
}

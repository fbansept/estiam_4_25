import { SafeAreaContainer } from "@/components/SafeAreaContainer";
import { Button, ButtonGroup, Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "expo-router";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

export default function Login() {
  const [jwt, setJwt] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();

  useEffect(() => {
    setJwt(SecureStore.getItem("jwt"));
  }, []);

  function onDeconnexion() {
    SecureStore.deleteItemAsync("jwt");
    setJwt(null);
  }

  if (!jwt) {
    function fetchWithTimeout(url: string, options: Object, timeout = 3000) {
      return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), timeout)
        )
      ]);
    }

    const onFormValid = (donneesFormulaire: any) => {
      fetchWithTimeout("http://192.168.216.193:3000/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(donneesFormulaire)
      })
        .then((resultat: any) => {
          if (resultat.status == 403) {
            Alert.alert(
              "Connexion refusée",
              "Les identifiants sont incorrects"
            );
            throw Error("403");
          }

          return resultat.text();
        })
        .then(async (jwt) => {
          await SecureStore.setItemAsync("jwt", jwt);
          setJwt(jwt);
        })
        .catch((erreur) => {
          //l'erreur 403 a déjà été affichée
          if (erreur.message == "403") {
            return;
          }

          Alert.alert(
            "Connexion impossible",
            "Impossible de se connecter, vérifiez votre connexion internet"
          );
        });
    };

    return (
      <SafeAreaContainer>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={(value: any) => onChange(value)}
              value={value}
              label="Email"
              errorStyle={{ color: "red" }}
              errorMessage={
                errors.email ? errors.email.message?.toString() : ""
              }
            />
          )}
          name="email"
          rules={{
            required: {
              value: true,
              message: "Ce champs est obligatoire"
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Veuillez entrer une adresse email valide."
            }
          }}
          defaultValue="a@a.com"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={(value: any) => onChange(value)}
              value={value}
              label="Mot de passe"
              errorStyle={{ color: "red" }}
              errorMessage={
                errors.password ? errors.password.message?.toString() : ""
              }
            />
          )}
          name="password"
          rules={{
            required: {
              value: true,
              message: "Ce champs est obligatoire"
            }
          }}
          defaultValue="root"
        />
        <Button title="Envoyer" onPress={handleSubmit(onFormValid)} />;
      </SafeAreaContainer>
    );
  } else {
    return (
      <SafeAreaContainer>
        <Text>Donnee de l'utilisateur</Text>

        <Button onPress={onDeconnexion}>Deconnexion</Button>
      </SafeAreaContainer>
    );
  }
}

const styles = StyleSheet.create({});

import { SafeAreaContainer } from "@/components/SafeAreaContainer";
import { Button, Input } from "@rneui/themed";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";

export default function TabTwoScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();

  function fetchWithTimeout(url: string, options: Object, timeout = 3000) {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeout)
      )
    ]);
  }

  const onFormValid = (donneesFormulaire: any) => {
    fetchWithTimeout("http://192.168.43.59:3000/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(donneesFormulaire)
    })
      .then((resultat: any) => {
        if (resultat.status == 403) {
          Alert.alert("Connexion refusée", "Les identifiants sont incorrects");
          throw Error("403");
        }

        console.log("toto");

        return resultat.text();
      })
      .then((jwt) => console.log(jwt))
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
            errorMessage={errors.email ? errors.email.message?.toString() : ""}
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
        defaultValue=""
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
        defaultValue=""
      />
      <Button title="Envoyer" onPress={handleSubmit(onFormValid)} />;
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});

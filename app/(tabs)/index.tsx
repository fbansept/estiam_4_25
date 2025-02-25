import { StyleSheet, View, FlatList } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { SafeAreaContainer } from "@/components/SafeAreaContainer";
import { useEffect, useState } from "react";
import { Card, CardItem } from "@/components/Card";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export default function HomeScreen() {
  const [data, setData] = useState<CardItem[]>([]);

  useEffect(() => {
    SecureStore.getItemAsync("jwt").then((jwt) => {
      fetch("http://192.168.216.193:3000/posts", {
        headers: { Authorization: "Bearer " + jwt }
      })
        .then((resultat) => {
          if (resultat.status == 403) {
            router.replace("/login");
          }

          return resultat.json();
        })
        .then((posts) => setData(posts));
    });
  }, []);

  return (
    <SafeAreaContainer>
      <View style={styles.header}>
        <ThemedText type="title">Pour vous</ThemedText>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <Card item={item}></Card>}
      ></FlatList>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10
  }
});

import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  GestureResponderEvent,
  ScrollView,
  FlatList
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSafeAreaStyle } from "@/hooks/useSafeAreaStyle";
import { SafeAreaContainer } from "@/components/SafeAreaContainer";
import { useEffect, useState } from "react";
import { Card, CardItem } from "@/components/Card";

export default function HomeScreen() {
  const [data, setData] = useState<CardItem[]>([]);

  useEffect(() => {
    fetch("http://192.168.43.59:3000/posts")
      .then((resultat) => resultat.json())
      .then((posts) => setData(posts));
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

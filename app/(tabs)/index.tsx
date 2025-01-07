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
import { useState } from "react";
import { Card, CardItem } from "@/components/Card";

export default function HomeScreen() {
  const data: CardItem[] = [
    {
      title: "Article 1",
      uri: "https://placehold.jp/200x500.png?text=VIDEO",
      author: {
        pseudo: "Tom",
        avatar: "https://placehold.jp/3d4070/ffffff/50x50.png"
      },
      like: 1123456,
      mediaKind: "movie"
    },
    {
      title: "Article 2",
      uri: "https://placehold.jp/200x500.png?text=PHOTO",
      author: {
        pseudo: "Titi",
        avatar: "https://placehold.jp/ab6742/ffffff/50x50.png"
      },
      like: 5678,
      mediaKind: "picture"
    }
  ];

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

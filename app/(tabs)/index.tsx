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
      uri: "https://placehold.jp/200x500.png?text=article_1",
      author: {
        pseudo: "Tom",
        avatar: "https://placehold.jp/3d4070/ffffff/50x50.png"
      },
      like: 1123456
    },
    {
      title: "Article 2",
      uri: "https://placehold.jp/200x500.png?text=article_2",
      author: {
        pseudo: "Titi",
        avatar: "https://placehold.jp/ab6742/ffffff/50x50.png"
      },
      like: 5678
    }
  ];

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Card item={item}></Card>}
    ></FlatList>

    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    //   headerImage={
    //     <Image
    //       source={require("@/assets/images/partial-react-logo.png")}
    //       style={styles.reactLogo}
    //     />
    //   }
    // >
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">Welcome!</ThemedText>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit{" "}
    //       <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
    //       to see changes. Press{" "}
    //       <ThemedText type="defaultSemiBold">
    //         {Platform.select({
    //           ios: "cmd + d",
    //           android: "cmd + m",
    //           web: "F12"
    //         })}
    //       </ThemedText>{" "}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //     <ThemedText>
    //       Tap the Explore tab to learn more about what's included in this
    //       starter app.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       When you're ready, run{" "}
    //       <ThemedText type="defaultSemiBold">
    //         npm run reset-project
    //       </ThemedText>{" "}
    //       to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
    //       directory. This will move the current{" "}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
    //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  helloWorld: {
    height: "100%"
  }
});

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute"
//   }
// });

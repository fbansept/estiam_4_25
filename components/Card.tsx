import { Image, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

export function Card() {
  return (
    <View style={styles.container}>
      <Image
        style={{ height: 500, objectFit: "cover" }}
        source={{
          uri: "https://placehold.jp/200x500.png"
        }}
      ></Image>
      <View style={[styles.row, styles.actionButtonsContainer]}>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={36}
            color="black"
          />
          <Ionicons name="chatbubble-outline" size={36} color="black" />
          <Feather name="send" size={36} color="black" />
        </View>
        <FontAwesome6 name="bookmark" size={30} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 600,
    backgroundColor: "#FFFFFF"
  },
  actionButtonsContainer: {
    justifyContent: "space-between",
    margin: 5
  },
  row: {
    flexDirection: "row"
  }
});
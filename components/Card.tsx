import { Button, Image, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { useRef, useState } from "react";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";

export type CardItem = {
  title: string;
  uri: string;
  author: {
    pseudo: string;
    avatar: string;
  };
  like: number;
  mediaKind: "movie" | "picture";
};

export function Card({ item }: { item: CardItem }) {
  const player: any = useVideoPlayer(
    "https://videocdn.cdnpk.net/videos/92662fc6-7559-5644-9421-33e37c382bbd/vertical/previews/clear/large.mp4?token=exp=1736244390~hmac=7a4ccdfdae72686e1d07d6f887b5b65b6936e62bc13df97990b4fa7207ec2e85",
    (player) => {
      player.loop = true;
      player.play();
    }
  );

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing
  });

  const content =
    item.mediaKind == "movie" ? (
      <View>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
        <View style={styles.controlsContainer}>
          <Button
            title={isPlaying ? "Pause" : "Play"}
            onPress={() => {
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
            }}
          />
        </View>
      </View>
    ) : (
      <Image
        style={{ height: 500, objectFit: "cover" }}
        source={{
          uri: item.uri
        }}
      ></Image>
    );

  return (
    <View style={styles.container}>
      <View>
        {content}
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
        <Text>{item.like} J'aime</Text>
      </View>
      <View
        style={[
          styles.header,
          styles.row,
          item.mediaKind == "picture" ? styles.headerPicture : null
        ]}
      >
        <View style={styles.row}>
          <Image
            style={styles.avatar}
            source={{ uri: item.author.avatar }}
          ></Image>
          <Text>{item.author.pseudo}</Text>
        </View>
        <View>
          <View
            style={
              item.mediaKind == "picture"
                ? styles.outlineButtonPicture
                : styles.outlineButtonMovie
            }
          >
            <Text style={styles.outlineButtonText}>Suivre</Text>
          </View>
        </View>
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

  video: {
    height: 500
  },
  controlsContainer: {
    padding: 10
  },

  actionButtonsContainer: {
    justifyContent: "space-between",
    margin: 5
  },
  row: {
    flexDirection: "row"
  },
  header: {
    position: "absolute",
    justifyContent: "space-between",
    width: "100%",
    padding: 10
  },
  headerPicture: {
    backgroundColor: "#FFFFFF"
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  outlineButtonMovie: {
    padding: 6,
    borderColor: "#FFFFFF",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10
  },
  outlineButtonPicture: {
    padding: 6,
    backgroundColor: "#CCCCCC",
    borderRadius: 10
  },
  outlineButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
});

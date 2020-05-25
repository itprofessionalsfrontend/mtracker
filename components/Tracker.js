import React from "react";
import useTrackPlayer from "../hooks/useTrackPlayer";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tracker = () => {
  const { isPlaying, currentIndex, playTrack, trackList } = useTrackPlayer();

  return (
    <View style={styles.container}>
      <Image
        style={styles.albumCover}
        source={{
          uri:
            "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
        }}
      />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.control}>
          <Ionicons name="ios-skip-backward" size={48} color="#444"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity style={styles.control} onPress={playTrack}>
          {isPlaying ? (
            <Ionicons name="ios-pause" size={48} color="#444"></Ionicons>
          ) : (
            <Ionicons name="ios-play-circle" size={48} color="#444"></Ionicons>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.control}>
          <Ionicons name="ios-skip-forward" size={48} color="#444"></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  albumCover: {
    width: 250,
    height: 250,
  },
  trackInfo: {
    padding: 40,
    backgroundColor: "#fff",
  },
  trackInfoText: {
    textAlign: "center",
    flexWrap: "wrap",
    color: "#550088",
  },
  largeText: {
    fontSize: 22,
  },
  smallText: {
    fontSize: 16,
  },
  control: {
    margin: 20,
  },
  controls: {
    flexDirection: "row",
  },
});

export default Tracker;

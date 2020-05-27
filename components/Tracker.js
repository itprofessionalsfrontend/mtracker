import React from "react";
import useTrackPlayer from "../hooks/useTrackPlayer";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tracker = () => {
  const {
    isPlaying,
    currentIndex,
    playTrack,
    trackList,
    playNext,
    playPrevious,
    playerInstance,
  } = useTrackPlayer();

  const Item = ({ title, imageSource, selected }) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          { backgroundColor: selected ? "#ff9966" : "#cc9900" },
        ]}
      >
        <View style={styles.listItemView}>
          <Image source={{ uri: imageSource }} style={styles.listAlbumCover} />
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTrackInfo = () => {
    return playerInstance ? (
      <View style={styles.trackInfo}>
        <Text style={[styles.trackInfoText, styles.largeText]}>
          {trackList[currentIndex].title}
        </Text>

        <Text style={[styles.trackInfoText, styles.smallText]}>
          {trackList[currentIndex].author}
        </Text>

        <Text style={[styles.trackInfoText, styles.smallText]}>
          {trackList[currentIndex].source}
        </Text>
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.albumCover}
        source={{
          uri: trackList[currentIndex]
            ? trackList[currentIndex].imageSource
            : "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
        }}
      />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.control} onPress={playPrevious}>
          <Ionicons name="ios-skip-backward" size={48} color="#444"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity style={styles.control} onPress={playTrack}>
          {isPlaying ? (
            <Ionicons name="ios-pause" size={48} color="#444"></Ionicons>
          ) : (
            <Ionicons name="ios-play-circle" size={48} color="#444"></Ionicons>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.control} onPress={playNext}>
          <Ionicons name="ios-skip-forward" size={48} color="#444"></Ionicons>
        </TouchableOpacity>
      </View>
      {renderTrackInfo()}
      <FlatList
        data={trackList}
        keyExtractor={(item) => item.id}
        extraData={currentIndex}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            imageSource={item.imageSource}
            title={item.title}
            selected={Number(item.id) === Number(currentIndex + 1)}
          ></Item>
        )}
      ></FlatList>
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
  listItemView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 25,
  },
  listAlbumCover: {
    width: 50,
    height: 50,
  },
  itemTitle: {
    fontSize: 30,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomColor: "#fff",
  },
});

export default Tracker;

import React, { useContext, useState, useEffect } from "react";
import { TrackContext } from "../context/TrackerContext";
import { Audio } from "expo-av";

const useTrackPlayer = () => {
  const trackList = useContext(TrackContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerInstance, setPlayerInstance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [isBuffering, setIsBuffering] = useState(false);

  async function loadAudio(index) {
    try {
      if (trackList.length > 0) {
        const player = new Audio.Sound();

        const onPlaybackStatusUpdate = (status) => {
          setIsBuffering(status.isBuffering);
        };
        player.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

        console.log("trackList", trackList);
        const status = {
          uri: trackList[index].uri,
        };

        const initialStatus = {
          shouldPlay: isPlaying,
          volume: volume,
        };

        if (playerInstance) {
          await playerInstance.unloadAsync();
        }

        await player.loadAsync(status, initialStatus, false);

        await setPlayerInstance(player);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadAudio(0);
    return () => {
      setPlayerInstance(null);
    };
  }, [trackList]);

  const play = async () => {
    isPlaying ? playerInstance.pauseAsync() : playerInstance.playAsync();

    await setIsPlaying(!isPlaying);
  };

  const handleNextTrack = async () => {
    if (playerInstance) {
      let currIndex = currentIndex;
      currIndex < trackList.length - 1 ? (currIndex += 1) : (currIndex = 0);
      //TODO:play track
      console.log(currIndex);
      await setCurrentIndex(currIndex);

      await loadAudio(currIndex);
    }
  };

  const handlePreviousTrack = async () => {
    if (playerInstance) {
      let currIndex = currentIndex;
      currentIndex === 0 ? (currIndex = 0) : (currIndex -= 1);
      //TODO:play track
      console.log(currIndex);
      await setCurrentIndex(currIndex);

      await loadAudio(currIndex);
    }
  };

  return {
    playTrack: play,
    playNext: handleNextTrack,
    playPrevious: handlePreviousTrack,
    isPlaying: isPlaying,
    trackList: trackList,
    currentIndex: currentIndex,
    playerInstance,
  };
};

export default useTrackPlayer;

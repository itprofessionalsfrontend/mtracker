import React, { useContext, useState, useEffect } from "react";
import { TrackContext } from "../context/TrackerContext";
import { Audio } from "expo-av";

const useTrackPlayer = () => {
  const [trackState, setTrackState] = useContext(TrackContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerInstance, setPlayerInstance] = useState(null);

  async function loadAudio() {
    try {
      const player = new Audio.Sound();

      const onPlaybackStatusUpdate = (status) => {
        setTrackState({
          ...trackState,
          isBuffering: status.isBuffering,
        });
      };
      player.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setPlayerInstance(player);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadAudio();
    return () => {
      setPlayerInstance(null);
    };
  }, []);

  const play = async () => {
    const status = {
      uri: trackState.trackList[trackState.currentIndex].uri,
    };

    const initialStatus = {
      shouldPlay: isPlaying,
      volume: trackState.volume,
    };

    await playerInstance.unloadAsync();
    await playerInstance.loadAsync(status, initialStatus, false);

    isPlaying ? playerInstance.pauseAsync() : playerInstance.playAsync();

    await setIsPlaying(!isPlaying);
  };

  return {
    playTrack: play,
    isPlaying: isPlaying,
    trackList: trackState.trackList,
    currentIndex: trackState.currentIndex,
  };
};

export default useTrackPlayer;

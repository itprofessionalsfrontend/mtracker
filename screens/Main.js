import React, { useContext } from "react";
import { View, Text } from "react-native";
import { TrackProvider } from "../context/TrackerContext";
import Tracker from "../components/Tracker";

const Main = () => {
  return (
    <TrackProvider>
      <Tracker />
    </TrackProvider>
  );
};

export default Main;

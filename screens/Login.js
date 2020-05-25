import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import firebase from "../firebase";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const login = () => {
    if (email === "" && password === "") {
      Alert.alert("Email and password required");
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          setIsLoading(false);
          console.log(props);
          props.navigation.navigate("main");
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }
  };

  if (isLoading) {
    console.log("isLoading", isLoading);
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        ></TextInput>
        <TextInput
          style={styles.inputStyle}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry={true}
        ></TextInput>
        <Button
          onPress={() => {
            login();
          }}
          title="Login"
        ></Button>
        <Text
          style={styles.loginText}
          onPress={() => {
            props.navigation.navigate("signup");
          }}
        >
          Don't have an account?Click here to Signup
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    // padding: 30,
  },
  loginText: {
    color: "#374dec",
    marginTop: 35,
    textAlign: "center",
  },
  loader: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;

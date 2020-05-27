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

import { auth } from "../firebase";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" && password === "") {
      Alert.alert("Email and password required");
    } else {
      setIsLoading(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user.updateProfile({ displayName: username });
          setIsLoading(false);
          console.log(props);
          props.navigation.navigate("login");
          //TODO:navigate to Login screen
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }
  };

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#33333" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          value={username}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        ></TextInput>
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
            register();
          }}
          title="Sign Up"
        ></Button>
        {/* TODO:navigate to Login screen */}
        <Text
          style={styles.loginText}
          onPress={() => {
            props.navigation.navigate("login");
          }}
        >
          Already registered? Click here to Login
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
});

export default SignUp;

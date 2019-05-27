/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/prop-types */
import React from "react";
import { Image, View, TouchableOpacity, Text } from "react-native";
import { Container } from "native-base";
import { SafeAreaView } from "react-navigation";
import { light, dark } from "./styles";
import { Banner } from "../constants";

export default class Splash extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    header: null
  };

  nerve = () => {
    this.props.navigation.navigate("World");
  };

  render() {
    return (
      <Container style={light.Splash.container}>
        <SafeAreaView />
        <View style={light.Splash.body}>
          <Image
            source={Banner}
            resizeMode="contain"
            style={light.Splash.banner}
          />
        </View>
        <View style={light.Splash.footer}>
          <View style={light.Splash.trigger}>
            <TouchableOpacity
              style={light.Splash.otrigger}
              onPress={this.nerve}
            >
              <Text style={light.Splash.ltrigger}>Start Mooving</Text>
            </TouchableOpacity>
          </View>
          <View style={light.Splash.link}>
            <TouchableOpacity>
              <Text style={light.Splash.llink}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <SafeAreaView />
      </Container>
    );
  }
}

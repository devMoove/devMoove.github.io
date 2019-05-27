/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { View } from "react-native";
import { Container } from "native-base";
import { createAppContainer, createStackNavigator } from "react-navigation";
import Splash from "./src/pages/Splash";
import World from "./src/pages/world";
import { light } from "./src/pages/styles";

// Nerve
const Nerve = createStackNavigator(
  {
    Splash: Splash,
    World: World
  },
  {
    initialRouteName: "Splash"
  }
);
const Shell = createAppContainer(Nerve);

export default class App extends React.Component {
  render() {
    return <Shell />;
  }
}

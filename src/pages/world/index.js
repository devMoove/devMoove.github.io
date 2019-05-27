/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React from "react";
import { View } from "react-native";
import { Container } from "native-base";
import { MapView, Location, Permissions } from "expo";
import { SafeAreaView } from "react-navigation";
import { light, dark } from "../styles";
import Journey from "./journey";
import { TitleBar } from "../components";
import { Feather } from "@expo/vector-icons";

export default class World extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      location: null
    };
  }

  static navigationOptions = {
    header: null
  };

  tracker = async () => {
    // Permissions
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== "granted") {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        return;
      }
    }

    // Tracking Location
    const location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    this.setState({
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    });
  };

  componentDidMount() {
    this.tracker();
  }

  statusBar = () => {
    return (
      <View
        style={{
          height: light.statusBarHeight,
          width: "100%",
          backgroundColor: "#FF4E6A"
        }}
      />
    );
  };

  titleBar = () => {
    return (
      <TitleBar
        color="transparent"
        leftIcoName="md-arrow-back"
        action={() => {
          this.props.navigation.goBack();
        }}
        right={
          <View style={light.toolTip.wrapper}>
            <Feather name="settings" size={light.wp(6)} color="black" />
          </View>
        }
      />
    );
  };

  World = () => {
    return (
      <View style={light.World.wWorld}>
        <MapView
          style={light.World.map}
          initialRegion={
            this.state.location
              ? {
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }
              : null
          }
        />
      </View>
    );
  };

  Journey = () => {
    return (
      <View style={light.Journey.jWrapper}>
        <Journey />
      </View>
    );
  };

  render() {
    return (
      <Container style={light.World.container}>
        <this.statusBar />
        <SafeAreaView />
        <Container>
          <this.World />
          <this.titleBar />
          <this.Journey />
        </Container>
        <SafeAreaView />
      </Container>
    );
  }
}

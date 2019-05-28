/* eslint-disable react/jsx-handler-names */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Container, Card } from "native-base";
import { MapView, Location, Permissions } from "expo";
import { SafeAreaView } from "react-navigation";
import { light, dark } from "../styles";
import Journey from "./journey";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Pointer } from "../../constants";
// import { journey } from "../../models";
import { Polyline } from "react-native-maps";

export default class World extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      pickup: null,
      destination: null,
      action: null,
      mapping: null
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

  mapper = props => {
    this.setState({
      action: props.action,
      mapping: props.mapping ? props.mapping : null
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

  toolTip = () => {
    return (
      <View style={light.ToolTip.wrapper}>
        <TouchableOpacity
          onPress={() => {
            let region = {
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            };

            this.setState({ region });
          }}
        >
          <Card style={light.ToolTip.trace}>
            {/** Vector icon here */}
            <Ionicons name="md-locate" color="black" size={22} />
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.setState({ action: null, mapping: null });
          }}
        >
          <Card style={light.ToolTip.cancel}>
            {/** Vector icon here */}
            <MaterialIcons name="cancel" color="black" size={22} />
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (this.state.mapping === "Pickup") {
              this.setState({
                pickup: this.state.zone ? this.state.zone : null,
                action: null,
                mapping: null
              });
            } else if (this.state.mapping === "Destination") {
              this.setState({
                destination: this.state.zone ? this.state.zone : null,
                action: null,
                mapping: null
              });
            }
          }}
        >
          <Card style={light.ToolTip.proceed}>
            {/** Vector icon here */}
            <Ionicons name="md-arrow-forward" color="black" size={30} />
          </Card>
        </TouchableOpacity>
      </View>
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
          region={this.state.region}
          onRegionChange={region => {
            this.setState({ region: null, zone: region });
          }}
        >
          {this.state.location && this.state.action ? (
            <MapView.Marker
              coordinate={{
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude
              }}
              title="My Location"
            />
          ) : null}
          {this.state.pickup && this.state.destination ? (
            <Polyline
              coordinates={[this.state.pickup, this.state.destination]}
              strokeColor="rgb(68,168,88)" // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={[
                "rgb(125,184,64)",
                "rgb(68,168,88)", // no color, creates a "long" gradient between the previous and next coordinate
                "rgb(4,151,116)"
              ]}
              strokeWidth={6}
            />
          ) : null}
        </MapView>
        {this.state.action && this.state.action === "Select" ? (
          <View style={light.World.center}>
            <Image source={Pointer} style={light.World.pointer} />
          </View>
        ) : null}
        {this.state.action ? <this.toolTip /> : null}
      </View>
    );
  };

  Journey = () => {
    return (
      <View style={light.Journey.jWrapper}>
        <Journey
          mapper={this.mapper}
          pickup={this.state.pickup}
          destination={this.state.destination}
        />
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
          {this.state.action ? null : <this.Journey />}
        </Container>
        <SafeAreaView />
      </Container>
    );
  }
}

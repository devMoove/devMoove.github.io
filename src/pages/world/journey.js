/* eslint-disable react/jsx-no-bind */
import React from "react";
import {
  DatePickerAndroid,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  DeviceEventEmitter,
  BackHandler
} from "react-native";
import { Card, Container } from "native-base";
import { light, dark } from "../styles";
import { withNavigation } from "react-navigation";
import { Dropdown } from "react-native-material-dropdown";
import { TextField } from "react-native-material-textfield";
import { TitleBar } from "../components";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

class journey extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      pickupOptions: [
        { value: "My Location" },
        { value: "Select on Map" },
        { value: "Search" }
      ],
      destinationOptions: [{ value: "Select on Map" }, { value: "Search" }],
      movingOptions: [{ value: "Moving Today" }, { value: "Moving Later" }],
      moving: null,
      movingDateOptions: [{ value: "Select Date" }],
      stage1: {
        pickupLocation: null,
        destination: null,
        date: new Date().toDateString()
      },
      stage2: {
        type: null,
        description: null
      },
      stage3: {
        carType: null
      }
    };
  }

  UNSAFE_componentWillMount() {
    DeviceEventEmitter.removeAllListeners("hardwareBackPress");
    DeviceEventEmitter.addListener("hardwareBackPress", () => {
      if (this.state.tab && this.state.tab > 0) {
        this.switch(this.state.tab - 1);
      } else {
        BackHandler.exitApp();
      }
    });

    let stage1 = this.state.stage1;
    stage1.pickupLocation = this.props.pickup
      ? String(
          `${this.props.pickup.latitude} lat, ${
            this.props.pickup.longitude
          } long`
        )
      : this.state.pickupOptions[0].value;
    stage1.date = stage1.date ? stage1.date : new Date().toDateString();
    stage1.destination = this.props.destination
      ? String(
          `${this.props.destination.latitude} lat, ${
            this.props.destination.longitude
          } long`
        )
      : "";
    this.setState({
      stage1: stage1,
      moving: this.state.movingOptions[0].value
    });
  }

  switch = index => {
    this.setState({ tab: index });
    let dimension = light.DeviceWidth;
    this.Tab.scrollTo({
      x: index * dimension,
      y: 0,
      animated: true
    });
  };

  titleBar = () => {
    return (
      <TitleBar
        color="transparent"
        left={
          this.state.tab > 0 ? (
            <TouchableOpacity
              style={light.titleBar.navBackOpacity}
              onPress={() => {
                this.switch(this.state.tab - 1);
              }}
            >
              <Ionicons name={"md-arrow-back"} color="black" size={22} />
            </TouchableOpacity>
          ) : null
        }
        right={
          <View style={light.MenuBarRight.wrapper}>
            <Feather name="settings" size={light.wp(6)} color="black" />
          </View>
        }
      />
    );
  };

  stageOne = () => {
    return (
      <View style={light.Journey.containers}>
        <Card style={light.Journey.stageWrapper}>
          <View style={light.Journey.dotWrapper}>
            {/** Run algorithm to generate dots here */}
          </View>
          <View style={light.Journey.inputWrapper}>
            {/** Input fields here */}
            <Dropdown
              style={light.Journey.dropDown}
              label={"Pickup Location?"}
              value={this.state.stage1.pickupLocation}
              data={this.state.pickupOptions}
              labelTextStyle={light.Journey.dropDownLabelStyle}
              itemTextStyle={light.Journey.dropDownTextStyle}
              onChangeText={text => {
                let stage1 = this.state.stage1;

                switch (text) {
                  case "My Location":
                    stage1.pickupLocation = "My Location";
                    this.setState({ stage1 });
                    break;
                  case "Select on Map":
                    this.props.mapper({ action: "Select", mapping: "Pickup" });
                    break;
                  case "Search":
                    this.search();
                    break;
                }
              }}
            />
            <Dropdown
              style={light.Journey.dropDown}
              label={"Where are you moving to?"}
              value={
                this.state.stage1.destination
                  ? this.state.stage1.destination
                  : ""
              }
              data={this.state.destinationOptions}
              labelTextStyle={light.Journey.dropDownLabelStyle}
              itemTextStyle={light.Journey.dropDownTextStyle}
              onChangeText={text => {
                switch (text) {
                  case "Select on Map":
                    this.props.mapper({
                      action: "Select",
                      mapping: "Destination"
                    });
                    break;
                  case "Search":
                    this.search();
                    break;
                }
              }}
            />
            <Dropdown
              style={light.Journey.dropDown}
              label={"When are you moving?"}
              value={this.state.moving}
              data={this.state.movingOptions}
              labelTextStyle={light.Journey.dropDownLabelStyle}
              itemTextStyle={light.Journey.dropDownTextStyle}
              onChangeText={text => {
                let stage1 = this.state.stage1;
                if (text === "Moving Today") {
                  stage1.date = new Date().toDateString();
                }
                this.setState({ moving: text, stage1: stage1 }, () => {
                  this.forceUpdate();
                });
              }}
            />
            {this.state.moving && this.state.moving === "Moving Later" ? (
              <Dropdown
                style={light.Journey.dropDown}
                label={"Moving Date?"}
                value={this.state.stage1.date}
                data={this.state.movingDateOptions}
                labelTextStyle={light.Journey.dropDownLabelStyle}
                itemTextStyle={light.Journey.dropDownTextStyle}
                onChangeText={async text => {
                  if (text === "Select Date") {
                    try {
                      const {
                        action,
                        year,
                        month,
                        day
                      } = await DatePickerAndroid.open({
                        // Use `new Date()` for current date.
                        date: new Date()
                      });
                      if (action !== DatePickerAndroid.dismissedAction) {
                        // Selected year, month (0-11), day
                        if (new Date() > new Date(year, month, day)) {
                          alert("Kindly select a day in the future");
                        } else {
                          let stage1 = this.state.stage1;
                          stage1.date = new Date(
                            year,
                            month,
                            day
                          ).toDateString();
                          this.setState({ stage1 }, () => {
                            this.forceUpdate();
                          });
                        }
                      }
                    } catch ({ code, message }) {
                      console.warn("Cannot open date picker", message);
                      alert(message);
                    }
                  }
                }}
              />
            ) : null}
          </View>
        </Card>
        {this.state.stage1.pickupLocation &&
        this.state.stage1.destination &&
        this.state.stage1.date ? (
          <TouchableOpacity
            onPress={() => {
              this.switch(1);
            }}
          >
            <View
              style={[
                light.Button.wrapper,
                { backgroundColor: light.Colors.primary, width: "90%" }
              ]}
            >
              <Text style={light.Button.label}>Next</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  stageTwo = () => {
    return (
      <View style={light.Journey.containers}>
        <Card style={light.Journey.stageWrapper}>
          <View style={light.Journey.dotWrapper}>
            {/** Run algorithm to generate dots here */}
          </View>
          <View style={light.Journey.inputWrapper}>
            {/** Input fields here */}
            <Dropdown
              style={light.Journey.dropDown}
              label={"Select Type of Move"}
              value={""}
              data={[{ value: "Permanent" }, { value: "Temporary" }]}
              labelTextStyle={light.Journey.dropDownLabelStyle}
              itemTextStyle={light.Journey.dropDownTextStyle}
              onChangeText={text => {
                let stage2 = this.state.stage2;
                stage2.type = text;
                this.setState({ stage2 }, () => {
                  this.forceUpdate();
                });
              }}
            />
            <View style={light.Journey.listWrapper}>
              <Text
                style={light.Journey.stageLabel}
                ref={input => {
                  this.itList = input;
                }}
              >
                List your item(s). If they are many, just list the bulky ones
                e.g 5-seater sofa, fridge, bed, e.t.c
              </Text>
              <TextInput multiline />
            </View>
          </View>
        </Card>
        {this.state.stage2.type ? (
          <TouchableOpacity
            onPress={() => {
              this.switch(2);
            }}
          >
            <View
              style={[
                light.Button.wrapper,
                { backgroundColor: light.Colors.primary, width: "90%" }
              ]}
            >
              <Text style={light.Button.label}>Next</Text>
            </View>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            this.switch(0);
          }}
        >
          <View
            style={[
              light.Button.wrapper,
              { backgroundColor: light.Colors.secondary, width: "90%" }
            ]}
          >
            <Text style={light.Button.label}>Previous</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  car = props => {
    return (
      <TouchableOpacity
        onPress={() => {
          let stage3 = this.state.stage3;
          stage3.carType = props.title;
          this.setState({ stage3 }, () => {
            this.forceUpdate();
          });
        }}
      >
        <View
          style={[
            {
              width: light.wp(25),
              height: light.wp(25),
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center"
            },
            {
              backgroundColor:
                this.state.stage3.carType === props.title
                  ? light.Colors.primary
                  : light.Colors.secondary
            }
          ]}
        >
          <Text allowFontScaling style={{ fontSize: 16, color: "white" }}>
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  stageThree = () => {
    return (
      <View style={light.Journey.containers}>
        <View
          style={{
            width: "100%",
            padding: 20,
            position: "absolute",
            bottom: 0,
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              height: light.wp(10),
              width: "100%",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontSize: 16, color: "black" }}>
              Select preffered car type:
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: light.wp(30),
              wrapMode: "flex-wrap",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <this.car title="Motor Bike" />
            <this.car title="Pick up" />
            <this.car title="Truck" />
          </View>
          <View
            style={{
              width: "100%",
              height: light.wp(30),
              wrapMode: "flex-wrap",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <this.car title="TuckTuck" />
            <this.car title="Trailer" />
            <this.car title="Freight" />
          </View>
          {this.state.stage3.carType ? (
            <TouchableOpacity
              onPress={() => {
                this.switch(2);
              }}
            >
              <View
                style={[
                  light.Button.wrapper,
                  { backgroundColor: light.Colors.primary, width: "100%" }
                ]}
              >
                <Text style={light.Button.label}>{`Confirm ${
                  this.state.stage3.carType
                }`}</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <this.titleBar />
        <View
          style={{
            width: "100%",
            position: "absolute",
            top: light.hp(8),
            bottom: 0
          }}
        >
          <ScrollView
            ref={view => {
              this.Tab = view;
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
            scrollEnabled={false}
            pagingEnabled
          >
            <this.stageOne />
            <this.stageTwo />
            <this.stageThree />
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default withNavigation(journey);

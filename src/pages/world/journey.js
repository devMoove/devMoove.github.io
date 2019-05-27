/* eslint-disable react/jsx-no-bind */
import React from "react";
import { View, ScrollView } from "react-native";
import { Card } from "native-base";
import { withNavigation } from "react-navigation";
import { light, dark } from "../styles";

class journey extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stage: 1
    };
  }

  stageOne = () => {
    return (
      <View style={light.Journey.containers}>
        <Card style={light.Journey.stageOne} />
      </View>
    );
  };

  render() {
    return (
      <View style={light.Journey.containers}>
        <ScrollView
          ref={view => {
            this.Tab = view;
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEnabled
          pagingEnabled
        >
          <this.stageOne />
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(journey);

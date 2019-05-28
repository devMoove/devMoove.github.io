import React from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { light, dark } from "../styles";

/**
 * Title Bar
 * @param {Object} props : actionBack(), children, right
 */
/* eslint-disable react/prop-types */
const TitleBar = props => {
  let action = props.action;
  let Right = props.right;
  let Left = props.left;
  let children = props.children;

  return (
    <View style={[light.titleBar.titleBar, { backgroundColor: props.color }]}>
      {/** Item Left, Item Center, Item Right */}
      <View style={light.titleBar.titleLeft}>
        {/** Action Tool component here */}
        {Left}
      </View>
      <View style={light.titleBar.titleCenter}>
        {/** Title goes here */}
        {children}
      </View>
      <View style={light.titleBar.titleRight}>
        {/** Menu item goes here */}
        {Right}
      </View>
    </View>
  );
};

export default TitleBar;

/* eslint-disable react-native/no-color-literals */
/* eslint-disable import/prefer-default-export */
import { StyleSheet, Dimensions, Platform, NativeModules } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
const { StatusBarManager } = NativeModules;
export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;
const { width, height } = Dimensions.get("window");
export const DeviceWidth = width,
  DeviceHeight = height;

export const statusBarHeight =
  Platform.OS === "ios" ? 35 : StatusBarManager.HEIGHT;

export const Colors = {
  primary: "#FF4E6A",
  secondary: "black"
};

export const titleBar = StyleSheet.create({
  titleBar: {
    position: "absolute",
    width: "95%",
    height: hp(8),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10
  },
  titleLeft: {
    height: "100%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center"
  },
  navBackOpacity: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  titleCenter: {
    height: "100%",
    width: "60%",
    justifyContent: "center",
    alignItems: "center"
  },
  titleRight: {
    height: "100%",
    width: "25%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  }
});

export const MenuBarRight = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});

export const Splash = StyleSheet.create({
  // View size - application container
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center"
  },
  body: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  banner: {
    width: wp(80),
    height: wp(80),
    resizeMode: "contain"
  },
  trigger: {
    height: hp(6.5),
    width: wp(80),
    backgroundColor: "#FF4E6A",
    borderRadius: hp(1.4),
    marginBottom: wp(5)
  },
  otrigger: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  ltrigger: {
    color: "white",
    fontSize: wp(4)
  },
  llink: {
    color: "gray",
    fontSize: wp(4)
  }
});

export const World = StyleSheet.create({
  container: {
    flex: 1
  },
  wWorld: {
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  map: {
    height: "100%",
    width: "100%"
  },
  center: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  pointer: { width: 35, height: 35, resizeMode: "contain" }
});

export const Journey = StyleSheet.create({
  jWrapper: {
    flex: 1
  },
  containers: {
    width: DeviceWidth,
    height: "100%"
  },
  stageWrapper: {
    width: "90%",
    padding: wp(8),
    alignSelf: "center",
    borderRadius: 8,
    flexDirection: "row",
    marginBottom: 5
  },
  dotWrapper: {
    height: "100%",
    width: "15%",
    backgroundColor: "transparent"
  },
  inputWrapper: { width: "85%" },
  dropDown: { height: 30, width: "100%" },
  dropDownLabelStyle: {
    fontSize: 7,
    color: "rgba(0, 0, 0, 0.38)"
  },
  dropDownTextStyle: {
    textAlign: "left",
    fontSize: 14
  },
  stageLabel: {
    fontSize: 12,
    color: "gray",
    marginBottom: 5
  },
  listWrapper: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: "lightgray",
    width: "100%",
    height: (1 / 2) * DeviceWidth,
    overflow: "hidden"
  }
});

export const ToolTip = StyleSheet.create({
  wrapper: {
    position: "absolute",
    elevation: 10,
    width: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
    bottom: 15,
    right: 15
  },
  trace: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35
  },
  cancel: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35
  },
  proceed: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35
  }
});

export const Button = StyleSheet.create({
  wrapper: {
    height: 50,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 50
  },
  label: {
    fontSize: 14,
    color: "white"
  }
});

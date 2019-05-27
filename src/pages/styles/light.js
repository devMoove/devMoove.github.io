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
    justifyContent: "center"
  }
});

export const toolTip = StyleSheet.create({
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
  }
});

export const Journey = StyleSheet.create({
  jWrapper: {
    position: "absolute",
    top: hp(8),
    width: "100%",
    bottom: 0
  },
  containers: {
    width: DeviceWidth,
    height: "100%"
  },
  stageOne: {
    width: "90%",
    height: "40%",
    padding: wp(10),
    alignSelf: "center",
    borderRadius: 8
  }
});

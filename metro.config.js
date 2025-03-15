const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Get the default Expo Metro config
const config = getDefaultConfig(__dirname);

// Wrap with NativeWind and Reanimated
module.exports = wrapWithReanimatedMetroConfig(
  withNativeWind(config, {
    input: "./app/globals.css", 
  })
);

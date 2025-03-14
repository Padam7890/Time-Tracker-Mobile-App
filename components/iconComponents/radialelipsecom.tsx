import React from 'react';
import { View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // or import LinearGradient from 'react-native-linear-gradient'
import tw from 'twrnc'; // Import twrnc

export default function RadialEllipse() {
  const size = 20; 
  const borderWidth = 2;

  return (
    <View>
      {/* Container with transparent background to ensure transparency shows through */}
      <View style={tw`relative`}>
        {/* Only render the ring using a masked view approach */}
        <View style={[
          tw`rounded-full overflow-hidden`,
          { width: size, height: size }
        ]}>
          <LinearGradient
            colors={['#7012CE',  '#FFFFFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              tw`absolute inset-0`,
              { width: size, height: size }
            ]}
          />
                    <View 
            style={[
              tw`absolute rounded-full bg-black`,
              { 
                width: size - (borderWidth * 2),
                height: size - (borderWidth * 2),
                top: borderWidth,
                left: borderWidth
              }
            ]}
          />
        </View>
      </View>
    </View>
  );
}
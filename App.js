import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { State } from 'react-native-gesture-handler';
import { TextInput, Button } from 'react-native-paper';
import Animated, { Easing, sub } from 'react-native-reanimated';
import { useTransition } from  "react-native-redash/lib/module/v1";
import ViewShot from "react-native-view-shot";
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-native';
import { useSpring, animated } from 'react-spring/native';


const MAPBOX_API_KEY = 'pk.eyJ1IjoibmFzc2ltY2hlbm91ZiIsImEiOiJja2R1NjE2amMzYnl4MzByb3c5YmxlMGY5In0.cBj3YeAh0UMxinxOfhDLIw';
MapboxGL.setAccessToken(MAPBOX_API_KEY);


const App = () => {
  return (
    <View style={styles.appContainer}>
      <MapboxGL.MapView style = {styles.map} >

      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  map: {
    height: '50%',
    width: '50%',
  }
});

export default App;

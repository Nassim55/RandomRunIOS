import React, { useRef } from 'react';
import { StyleSheet, View, Text  } from 'react-native';
import { useSelector } from 'react-redux';
import ViewShot from "react-native-view-shot";

// Custom components:
import MapboxMap from './MapboxMap';
import SearchRouteForm from './SearchRouteForm';
import RouteInfoCard from './RouteInfoCard';
import UserInfoMenu from './UserInfoMenu';
import SavedRouteCards from './SavedRouteCards';


const AuthorisedUserView = (props) => {
  // Reference to the view shot:
  const viewShotRef = useRef(null);

  // Has user allowed location permission, true or false:
  const isLocationPermissionGranted = useSelector(state => state.isLocationPermissionGranted);

  // Getting input route characteristics from the user:
  const originLongitude = useSelector(state => state.userLongitude);
  const originLatitude =  useSelector(state => state.userLatitude);
  const routeDistanceMeters = useSelector(state => state.routeDistanceMeters);

  // Generated route characteristics that will be rendered to the user: 
  const calculatedRouteDistance = useSelector(state => state.calculatedRouteDistance);

  // Getting state to determine if UI components should be rendered:
  const isRouteCardsShown = useSelector(state => state.isRouteCardsShown);




  return (
    <View style = {styles.pageContent}>
        <ViewShot
        style={styles.viewshot}
        ref={viewShotRef}
        options={{ format: "jpg", quality: 1 }}
        >
          <MapboxMap
          originLongitude={originLongitude}
          originLatitude={originLatitude}
          />
        </ViewShot>
        <View style={styles.formAndMenuContainer}>
          <View style={styles.formContainer}>
            <SearchRouteForm
            isLocationPermissionGranted={isLocationPermissionGranted}
            originLongitude={originLongitude}
            originLatitude={originLatitude}
            routeDistanceMeters={routeDistanceMeters}
            displayRouteDistance={calculatedRouteDistance}
            viewShotRef={viewShotRef}
            />
          </View>
        </View>
        {
          isRouteCardsShown ?
          <SavedRouteCards />
          :
          <RouteInfoCard 
          displayRouteDistance={calculatedRouteDistance}
          />
        }
    </View>
  );
};

const styles = StyleSheet.create({
  viewshot: {
    width: '100%',
    height: '100%',
  },
  pageContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  link: {
    position: 'absolute'
  },
  formAndMenuContainer: {
    position: 'absolute',
    top: '7.5%',
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,

  },
  formContainer: {
    flex: 8
  },
  menuContainer: {
  },
});

export default AuthorisedUserView;
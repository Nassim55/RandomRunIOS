import { PermissionsAndroid, Platform } from 'react-native';
//import Geolocation from '@react-native-community/geolocation';
import { isLocationPermissionGranted, setUserLocation } from '../../store/actions';

const setUserLongitudeAndLatitude = async (dispatch) => {
  // if (Platform.OS === 'android') {
  //   // Checking to see if the Android location permission is granted:
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
  //         title: "Random Run Location Permission",
  //         message: "Random Run needs access to your location in order to generate a route",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK"
  //       }
  //     );

  //     // If the Android location permission is granted, get the users location and update state:
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       dispatch(isLocationPermissionGranted(true));
  //       Geolocation.getCurrentPosition(position => {
  //         dispatch(setUserLocation([position.coords.longitude, position.coords.latitude]));
  //       }, 
  //       err => console.error(err),
  //       {enableHighAccuracy: true, timeout: 60000, maximumAge: 0}
  //       );
  //     } else { 
  //       dispatch(isLocationPermissionGranted(false));
  //     };

  //   } catch (err) { if (console) console.error(err) };

  // } else if (Platform.OS === 'ios') {
  //   // Sets IOS permissions and upadates the user location in state accordingly:
  //   Geolocation.getCurrentPosition(position => {
  //     dispatch(isLocationPermissionGranted(true));
  //     dispatch(setUserLocation([position.coords.longitude, position.coords.latitude]));
  //     }, 
  //     err => {
  //       dispatch(isLocationPermissionGranted(false));
  //       console.error(err);
  //     },
  //     {enableHighAccuracy: true, timeout: 60000, maximumAge: 0}
  //   );
  // }
};

export default setUserLongitudeAndLatitude;
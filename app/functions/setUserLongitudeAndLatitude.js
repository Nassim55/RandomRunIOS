import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { isLocationPermissionGranted, setUserLocation } from '../../store/actions';

const setUserLongitudeAndLatitude = async (dispatch) => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: "Random Run Location Permission",
          message: "Random Run needs access to your location in order to generate a route",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        dispatch(isLocationPermissionGranted(true));
        try {
            Geolocation.getCurrentPosition(position => {
              dispatch(setUserLocation([position.coords.longitude, position.coords.latitude]));
            }, 
            err => console.error(err),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0, }
            );
        } catch (err) { if (console) console.error(err) };
      } else {
        dispatch(isLocationPermissionGranted(false));
      };
    } catch (err) {
      if (console) {
        console.error(err);
      };
    };
  } else if (Platform.OS === 'ios') {
    dispatch(isLocationPermissionGranted(true));
    dispatch(setUserLocation([-1.6178, 54.9783]));
  }
};

export default setUserLongitudeAndLatitude;
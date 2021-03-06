import { 
  setFinalRouteLineString,
  setCalculateRouteDistance,
  setMostNorthEasternCoordinates,
  setMostSouthWesternCoordinates
} from '../../store/actions';
import setUserLongitudeAndLatitude from './setUserLongitudeAndLatitude';
import RNSInfo from 'react-native-sensitive-info';

const fetchRouteCoords = async ( isLocationPermissionGranted, dispatch, originLongitude, originLatitude, routeDistanceMeters) => {
  // Chencking that form input is valid:
  if (Number.isNaN(routeDistanceMeters) != true && routeDistanceMeters > 0) {

    // Fetching data from the backend API and updating Redux state:
    try {
        await setUserLongitudeAndLatitude(dispatch);
        if (isLocationPermissionGranted === true) {
          // Retreiving token from secure storage:
          token = await RNSInfo.getItem('token', {});

          // Checking token exists before fetching data from API:
          if (token) {
            const response = await fetch(`http://127.0.0.1:8000/route/getroute?longitude=${originLongitude}&latitude=${originLatitude}&routeDistance=${routeDistanceMeters}`, {
              method: 'GET',
              headers: {
                'Authorization': `Token ${token}`
              }
            });
            const data = await response.json();

            // Updating Redux state:
            dispatch(setFinalRouteLineString({ 'type': 'LineString', 'coordinates': data.coordinates }));
            dispatch(setCalculateRouteDistance(data.distanceMeters));
            dispatch(setMostNorthEasternCoordinates(data.mostNorthEastCoordinates));
            dispatch(setMostSouthWesternCoordinates(data.mostSouthWestCoordinates));
          } else {
            console.log('no token');
          }
        }
    } catch (err) { if (console) console.error(err) };
  };
};

export default fetchRouteCoords;
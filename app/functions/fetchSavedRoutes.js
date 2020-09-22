import { AsyncStorage } from 'react-native';
import { setSavedRoutesResponse } from '../../store/actions';

const fetchSavedRoutes = async (dispatch) => {
  try {
    // Retreiving the auth token from storage:
    if (Platform.OS === 'android') {
      token = await AsyncStorage.getItem('token');
    } else if (Platform.OS === 'ios') {
      token = '05c8bdcfc8605a0b5566bf8343bfcdcf3bb29c45';
    }
    
    // If a token exists then get saved routes from the database:
    if (token) {
      const response = await fetch(`http://127.0.0.1:8000/route/getsavedroutes`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      const data = await response.json();

      // Update the redux state:
      dispatch(setSavedRoutesResponse(data.response));
    }
  } catch (err) { if (console) console.error(err) };
};


export default fetchSavedRoutes;
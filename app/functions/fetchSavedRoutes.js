import { setSavedRoutesResponse } from '../../store/actions';
import RNSInfo from 'react-native-sensitive-info';

const fetchSavedRoutes = async (dispatch) => {
  try {
    // Retreiving the auth token from storage:
    token = await RNSInfo.getItem('token', {});
    
    // If a token exists then get saved routes from the database:
    if (token) {
      const response = await fetch(`http://127.0.0.1:8000/route/routes/`, {
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
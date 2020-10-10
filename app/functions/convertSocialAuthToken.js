import RNSInfo from 'react-native-sensitive-info';
import saveData from '../authentication/saveData';
import pushUserToMapView from '../functions/pushUserToMapView';
import { setUserAuthenticated } from '../../store/actions';

const convertSocialAuthToken = async (accessToken, dispatch, history) => {
    try {
        // Form data that will be posted to the conver-token endpoint:
        const uploadData = new FormData();
        uploadData.append('grant_type', 'convert_token');
        uploadData.append('client_id', '363738605007781')
        uploadData.append('client_secret', 'cc3f3807d85815995383fbe55917fd59')
        uploadData.append('backend', 'facebook')
        uploadData.append('token', accessToken)

        // Defining the POST response and converting data to json:
        const response = await fetch('http://127.0.0.1:8000/socialauth/convert-token', {
            method: 'POST',
            headers: {
            'Content-Type': 'multipart/form-data',
            },
            body: uploadData
        });
        const data = await response.json();

        // If there is a token in the response then allow the user to see the map:
        if (data.access_token) {
            // The social auth access token becomes the auth token for this user. They will use this
            // token like a regular user would use the rest framework auth token:
            tokenStorage = await saveData(data.access_token);

            // Updating the authentication in state:
            dispatch(setUserAuthenticated(true));

            // Need to do a get request to get user account details...

            // Pushing to the map view on successfull login:
            //ushUserToMapView(dispatch, history);
        } else {
            // Keeping the user at the home page:
            history.push('/');
        }
    } catch (err) { if (console) console.error(err) }
};


export default convertSocialAuthToken;

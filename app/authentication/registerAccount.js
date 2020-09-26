// Redux action imports:
import { setUserAuthenticated, setUserAccountDetails } from '../../store/actions';

// Custom function imports:
import saveData from '../authentication/saveData';



const registerAccount = async (first_name, last_name, username, email, password, password2, dispatch, history) => {
    try {
        // Registering a new user and defining the server response:
        const response = await fetch('http://127.0.0.1:8000/account/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                username,
                first_name,
                last_name,
                password,
                password2,
            }), 
        });
        const data = await response.json();

        // The user is pushed to the map view if they registered successfully:
        if (data.token) {
            // Saving the auth token in secure storage and updating authentication state:
            saveData(data.token);
            dispatch(setUserAuthenticated(true));
            
            // Deleting the auth token and storing the remaing user account details in state:
            delete data.token
            dispatch(setUserAccountDetails(data))

            // Pushing the user to the map view:
            history.push('/usermap');
        } else {
            history.push('/');
        }
    } catch (err) { if (console) console.error(err) }
};


export default registerAccount;
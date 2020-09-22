import saveData from '../authentication/saveData';
import { setUserAuthenticated } from '../../store/actions';

const userAuthentication = async (username, password, dispatch, history) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/auth/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}), 
        });
        const data = await response.json();
        console.log(data.token)
        if (data.token) {
            saveData(data.token);
            dispatch(setUserAuthenticated(true));
            history.push('/usermap');
        } else {
            history.push('/');
        }
    } catch (err) { if (console) console.error(err) }
};

export default userAuthentication;
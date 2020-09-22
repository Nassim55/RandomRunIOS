import { AsyncStorage, Platform } from 'react-native';
import { setUserAuthenticated } from '../../store/actions';

const getData = async (dispatch, history) => {
    if (Platform.OS === 'android') {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                dispatch(setUserAuthenticated(true));
                console.log('token exists')
                //history.push('/usermap');
            } else {
                console.log('token doesnt exist')
                dispatch(setUserAuthenticated(false));
                //history.push('/');
            };
        } catch (err) { if (console) console.error(err) };
    } else if (Platform.OS === 'ios') {
        console.log('platform is ios');
    }
};

export default getData;
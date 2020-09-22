import { AsyncStorage, Platform } from 'react-native';
import { setUserAuthenticated } from '../../store/actions';

const deleteData = async (dispatch) => {
    if (Platform.OS === 'android') {
        try {
            await AsyncStorage.removeItem('token');
            dispatch(setUserAuthenticated(false));
        } catch (err) { if (console) console.error(err) };
    } else if (Platform.OS === 'ios') {
        console.log('platform is ios');
    }
};

export default deleteData;
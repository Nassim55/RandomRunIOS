import { setUserAuthenticated } from '../../store/actions';
import RNSInfo from 'react-native-sensitive-info';

const deleteData = async (dispatch) => {
    try {
        await RNSInfo.deleteItem('token', {});
        dispatch(setUserAuthenticated(false));
    } catch (err) { if (console) console.error(err) };
};

export default deleteData;
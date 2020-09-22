import { Platform, AsyncStorage } from 'react-native';

const saveData = async (token) => {
    if (Platform.OS === 'android') {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (err) { if (console) console.error(err) };
    } else if (Platform.OS === 'ios') {
        console.log('platform is ios');
    }
};

export default saveData;
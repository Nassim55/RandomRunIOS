import { AsyncStorage } from 'react-native';

const getApiKey = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const response = await fetch(`http://127.0.0.1:8000/api/mapkey`, {
                method: 'GET',
                headers: {
                  'Authorization': `Token ${token}`
                }
            })
            const data = await response.json();
            return data.MAPBOX_API_KEY
        }
    } catch (err) { if (console) console.error(err) }
} 

export default getApiKey;
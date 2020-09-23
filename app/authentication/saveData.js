import SInfo from 'react-native-sensitive-info';

const saveData = async (token) => {
    return SInfo.setItem('token', token, {});
};

export default saveData;
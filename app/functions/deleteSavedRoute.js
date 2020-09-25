import RNSInfo from 'react-native-sensitive-info';

const deleteSavedRoute = async () => {
    // Try deleting a route from the database: 
    try {
        // Checking to see if token exists in sensitive info storage:
        const token = await RNSInfo.getItem('token', {});

        // Deleting saved route from the database and defining the response: 
        const response = await fetch(`http://127.0.0.1:8000/route/routes/89/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` }
        });
  
        // Converting response to JSON data:
        const data = await response.json();
        console.log(data);

    } catch (err) {
        if (console) console.error(err)
    };
}

export default deleteSavedRoute;
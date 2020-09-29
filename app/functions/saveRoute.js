import RNSInfo from 'react-native-sensitive-info';

const saveRoute = async (routeDistance, routeCoordinates, mapImageURI, userID, timeString, mostNorthEasternCoordinates, mostSouthWesternCoordinates) => {
  // Try posting a route to the database: 
  try {
    // Checking to see if token exists in sensitive info storage:
    const token = await RNSInfo.getItem('token', {});

    // Converting list form data into a format that the postgresql database array field will accept:
    routeCoordinates = (JSON.stringify(routeCoordinates)).replaceAll('[', '{').replaceAll(']', '}');
    mostNorthEasternCoordinates = (JSON.stringify(mostNorthEasternCoordinates)).replaceAll('[', '{').replaceAll(']', '}');
    mostSouthWesternCoordinates = (JSON.stringify(mostSouthWesternCoordinates)).replaceAll('[', '{').replaceAll(']', '}');

    // Form data about the route that will be posted to the database: 
    const uploadData = new FormData();
    uploadData.append('account', userID);
    uploadData.append('coordinates', routeCoordinates);
    uploadData.append('distance', routeDistance);
    uploadData.append('image', { uri: mapImageURI, name: mapImageURI.slice(-40), type: 'image/jpg' });
    uploadData.append('duration', timeString);
    uploadData.append('mostNorthEasternCoordinates', mostNorthEasternCoordinates);
    uploadData.append('mostSouthWesternCoordinates', mostSouthWesternCoordinates);

    // Posting the form data to database and defining the response: 
    const response = await fetch(`http://127.0.0.1:8000/route/routes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${token}`,
      },
      body: uploadData
    });

    const data = await response.json();
    console.log(data)


  } catch (err) {
    if (console) console.error(err)
  };
};

export default saveRoute;
import RNSInfo from 'react-native-sensitive-info';

const saveRoute = async (routeDistance, routeCoordinates, mapImageURI, userID, timeString, mostNorthEasternCoordinates, mostSouthWesternCoordinates) => {
  // Try posting a route to the database: 
  try {
    // Checking to see if token exists in sensitive info storage:
    const token = await RNSInfo.getItem('token', {});

    // Defining the image file:
    const mapImageFileIOS = {
      uri: '/Users/nassim/Documents/RandomRunIOS/images/A63139FF-8EA2-406F-9578-30245FEAEAE9.jpg',
      name: 'F404F070-E3E4-4EB0-8F4E-6823B35B2B8C.jpg',
      type: 'image/jpg'
    }

    const mapImageFileAndroid = {
      uri: 'file:///data/user/0/com.randomrunios/cache/ReactNative-snapshot-image8991587337273482.jpg',
      name: 'F404F070-E3E4-4EB0-8F4E-6823B35B2B8C.jpg',
      type: 'image/jpg'
    }

    const mapImageFileActual = {
      uri: mapImageURI,
      name: mapImageURI.slice(-40),
      type: 'image/jpg'
    }

    // Converting list form data into a format that the postgresql database array field will accept:
    routeCoordinates = (JSON.stringify(routeCoordinates)).replaceAll('[', '{').replaceAll(']', '}');
    mostNorthEasternCoordinates = (JSON.stringify(mostNorthEasternCoordinates)).replaceAll('[', '{').replaceAll(']', '}');
    mostSouthWesternCoordinates = (JSON.stringify(mostSouthWesternCoordinates)).replaceAll('[', '{').replaceAll(']', '}');

    // Form data about the route that will be posted to the database: 
    const uploadData = new FormData();
    uploadData.append('account', userID);
    uploadData.append('coordinates', routeCoordinates);
    uploadData.append('distance', routeDistance);
    uploadData.append('image', mapImageFileIOS);
    uploadData.append('duration', timeString);
    uploadData.append('mostNorthEasternCoordinates', mostNorthEasternCoordinates);
    uploadData.append('mostSouthWesternCoordinates', mostSouthWesternCoordinates);

    console.log(uploadData);

    // Posting the form data to database and defining the response: 
    const response = await fetch(`http://127.0.0.1:8000/route/routes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${token}`,
      },
      body: uploadData
      });

      // Converting response to JSON data:
      const data = await response.json();

      console.log(data)
  } catch (err) {
    if (console) console.error(err)
  };
};

export default saveRoute;
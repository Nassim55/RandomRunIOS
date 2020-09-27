import RNSInfo from 'react-native-sensitive-info';

const saveRoute = async (routeDistance, routeCoordinates, mapImageURI, userID) => {
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

    console.log(mapImageURI)
    console.log(token)

    console.log(userID)

    console.log(routeCoordinates)
    console.log(typeof routeCoordinates)

    routeCoordinates.toString()

    console.log(routeCoordinates)

    // Form data about the route that will be posted to the database: 
    const uploadData = new FormData();
    uploadData.append('account', userID);
    uploadData.append('coordinates', routeCoordinates.toString());
    uploadData.append('distance', routeDistance);
    uploadData.append('image', mapImageFileIOS);

    // Posting to database and defining the response: 
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
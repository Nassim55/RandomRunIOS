import RNSInfo from 'react-native-sensitive-info';

const saveRoute = async (routeDistance, routeCoordinates, mapImageURI) => {
  // Try posting route to darabase: 
  try {
    // Checking to see if token exists in sensitive info storage:
    const token = await RNSInfo.getItem('token', {});
    console.log(token)

    console.log(mapImageURI)


    // Defining the image file:
    const mapImageFile = {
      uri: '/Users/nassim/Documents/RandomRunIOS/images/F404F070-E3E4-4EB0-8F4E-6823B35B2B8C.jpg',
      name: 'F404F070-E3E4-4EB0-8F4E-6823B35B2B8C.jpg',
      type: 'image/jpg'
    }

    const mapImageFileActual = {
      uri: '/Users/nassim/Library/Developer/CoreSimulator/Devices/F70A075B-53A5-4A4F-874E-A88A9CDEAE63/data/Containers/Data/Application/53FAA886-7BFF-4F58-87F9-BA650D22D415/tmp/ReactNative/8CEBAB6E-FD50-49D4-8027-8840547430ED.jpg',
      name: '8CEBAB6E-FD50-49D4-8027-8840547430ED.jpg',
      type: 'image/jpg'
    }

    // Form data about the route that will be posted to the database: 
    const uploadData = new FormData();
    uploadData.append('account', 1);
    uploadData.append('coordinates', routeCoordinates);
    uploadData.append('distance', routeDistance);
    uploadData.append('image', mapImageFile);

    console.log(uploadData._parts[3])

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
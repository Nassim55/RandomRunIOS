const saveRoute = async (routeDistance, routeCoordinates, mapImageURI) => {
  const uploadData = new FormData();
  uploadData.append('account', 1);
  uploadData.append('coordinates', routeCoordinates);
  uploadData.append('distance', routeDistance);
  uploadData.append('image', mapImageURI);
  try {
    const response = await fetch(`http://127.0.0.1:8000/route/saveroute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${token}`,
      },
      body: uploadData
      });
      const data = await response.json();
  } catch (err) { if (console) console.error(err) };
};

export default saveRoute;
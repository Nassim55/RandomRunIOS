import {
    SET_USER_AUTHENTICATED,
    IS_LOCATION_PERMISSION_GRANTED,
    SET_USER_LOCATION,
    SET_ROUTE_DISTANCE_METERS,
    SET_RANDOM_POLYGON_COORDINATES,
    SET_FINAL_ROUTE_LINESTRING,
    SET_CALCULATED_ROUTE_DISTANCE_METERS,
    SET_MOST_NORTH_EASTERN_COORDINATES,
    SET_MOST_SOUTH_WESTERN_COORDINATES,
    SET_IS_ROUTE_CARDS_SHOWN,
    SET_SAVED_ROUTES_RESPONSE,
    SET_MAP_IMAGE_URI,
    SET_USER_ACCOUNT_DETAILS,
    SET_IS_USER_INFO_MENU_OPEN,
    SET_IS_PROFILE_SHOWN,
} from './actionTypes';

// We now need to build 'action creators', theses are basically just
// functions that point to the action types...so that when the action 
// type is called, our reducers know how to modify the state.

// Defining the action type. All an action is, is a function that returns an object:
export const setUserAuthenticated = isUserAuthenticated => ({
    type: SET_USER_AUTHENTICATED,
    isUserAuthenticated: isUserAuthenticated
});

export const isLocationPermissionGranted = isLocationPermissionGranted => ({
    type: IS_LOCATION_PERMISSION_GRANTED,
    isLocationPermissionGranted: isLocationPermissionGranted
});

export const setUserLocation = userLongitudeAndLatitude => ({
    type: SET_USER_LOCATION,
    userLongitude: userLongitudeAndLatitude[0],
    userLatitude: userLongitudeAndLatitude[1],
    userLongitudeAndLatitude: userLongitudeAndLatitude
});

export const setRouteDistanceMeters = userInputRouteDistanceMeters => ({
    type: SET_ROUTE_DISTANCE_METERS,
    userInputRouteDistanceMeters: userInputRouteDistanceMeters
});

export const setRandomPolygonCoordinates = randomPolygonCoords => ({
    type: SET_RANDOM_POLYGON_COORDINATES,
    randomPolygonCoords: {'coordinates': randomPolygonCoords}
});

export const setFinalRouteLineString = finalRouteLineString => ({
    type: SET_FINAL_ROUTE_LINESTRING,
    finalRouteLineString: finalRouteLineString
});

export const setCalculateRouteDistance = calculatedRouteDistance => ({
    type: SET_CALCULATED_ROUTE_DISTANCE_METERS,
    calculatedRouteDistance: calculatedRouteDistance
});

export const setMostNorthEasternCoordinates = mostNorthEasternCoordinates => ({
    type: SET_MOST_NORTH_EASTERN_COORDINATES,
    mostNorthEasternCoordinates: mostNorthEasternCoordinates
});

export const setMostSouthWesternCoordinates = mostSouthWesternCoordinates => ({
    type: SET_MOST_SOUTH_WESTERN_COORDINATES,
    mostSouthWesternCoordinates: mostSouthWesternCoordinates
});

export const setIsRouteCardsShown = isRouteCardsShown => ({
    type: SET_IS_ROUTE_CARDS_SHOWN,
    isRouteCardsShown: isRouteCardsShown
});

export const setSavedRoutesResponse = savedRoutesResponse => ({
    type: SET_SAVED_ROUTES_RESPONSE,
    savedRoutesResponse: savedRoutesResponse
});

export const setMapImageUri = mapImageUri => ({
    type: SET_MAP_IMAGE_URI,
    mapImageUri: mapImageUri
})

export const setUserAccountDetails = userAccountDetails => ({
    type: SET_USER_ACCOUNT_DETAILS,
    userAccountDetails: userAccountDetails
})

export const setIsUserInfoMenuOpen = isUserInfoMenuOpen => ({
    type: SET_IS_USER_INFO_MENU_OPEN,
    isUserInfoMenuOpen: isUserInfoMenuOpen
})

export const setIsProfileShown = isProfileShown => ({
    type: SET_IS_PROFILE_SHOWN,
    isProfileShown: isProfileShown  
})


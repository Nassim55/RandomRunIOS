import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ProfilePageView = (props) => {
    return (
        <View style={styles.viewContainer}>
            <Pressable
            style={styles.darkenMap}
            onPress={() => dispatch(setIsRouteCardsShown(false))}
            />
            <View style={styles.savedRoutesTitleContainer}>
                <Text style={styles.savedRoutesText}>Saved Routes</Text>
                <Text style={styles.savedRoutesTextInfo}>Swipe the cards to view your routes</Text>
                <Text style={styles.savedRoutesTextInfo}>Tap on a card to load a route</Text>
            </View>
            <View style={styles.deleteMessageView}>
                <Text style={styles.savedRoutesTextInfoDelete}>Swipe down to delete a route</Text>
                <SimpleLineIcons name='trash' size={24} color='white' />
            </View>
            {cards.map(
                ({ index, distance, image, id, coordinates, duration, mostNorthEasternCoordinates, mostSouthWesternCoordinates }) =>
                    currentIndex < index * step + step && (
                        <Card 
                        key={index}
                        position={sub(index * step, aIndex)}
                        distanceMeters={distance}
                        image={image}
                        duration={duration}
                        step={step}
                        onSwipe={() => setCurrentIndex(prev => prev + step)}
                        onPress={() => {
                            setCurrentIndex(prev => prev + step);
                            
                            // Converting from string cooodinates to floats:
                            const coordinatesDecimal = coordinates.map((coordsSet, index) => (
                                coordsSet.map(coord => (parseFloat(coord)))
                            ))
                            const mostNorthEasternCoordinatesDecimal = mostNorthEasternCoordinates.map(element => (parseFloat(element)));
                            const mostSouthWesternCoordinatesDecimal = mostSouthWesternCoordinates.map(element => (parseFloat(element)));

                            // Updating state:
                            dispatch(setFinalRouteLineString({ 'type': 'LineString', 'coordinates': coordinatesDecimal }))
                            dispatch(setMostNorthEasternCoordinates(mostNorthEasternCoordinatesDecimal));
                            dispatch(setMostSouthWesternCoordinates(mostSouthWesternCoordinatesDecimal));
                            dispatch(setIsRouteCardsShown(false));
                            dispatch(setCalculateRouteDistance(parseFloat(distance)))
                        }}
                        onSwipeDown={() => {
                            setCurrentIndex(prev => prev + step);
                            Alert.alert(
                                'Delete this route?',
                                'Are you sure you want to permanently delete this route?',
                                [
                                    { 
                                        text: 'Keep',
                                        style: 'cancel',
                                        onPress: () => setCurrentIndex(prev => prev - step),
                                    },
                                    { 
                                        text: 'Delete',
                                        style: 'destructive',
                                        onPress: () => deleteSavedRoute(id),
                                    }
                                ],
                                { cancelable: false }
                            );
                        }}
                        />
                )
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    viewContainer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    darkenMap: {
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.7,
        height: '100%',
        width: '100%',
    },
    savedRoutesTitleContainer: {
        position: 'absolute',
        top: '5.5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    savedRoutesText: {
        position: 'relative',
        color: 'white',
        fontFamily: 'Raleway-Regular',
        fontSize: 32,
    },
    savedRoutesTextInfo: {
        color: 'white',
        fontFamily: 'Raleway-Regular',
        fontSize: 18,
    },
    savedRoutesTextInfoDelete: {
        color: 'white',
        fontFamily: 'Raleway-Regular',
        fontSize: 18,
        marginBottom: 10
    },
    deleteMessageView: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '4%',
    }
})


export default ProfilePageView
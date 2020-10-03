import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';

// Packages:
import { sub } from 'react-native-reanimated';
import { useTransition } from  "react-native-redash/lib/module/v1";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-native";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// Custom components:
import Card from './Card';

// Custom function imports:
import { 
    setIsRouteCardsShown,
    setFinalRouteLineString,
    setMostNorthEasternCoordinates,
    setMostSouthWesternCoordinates,
    setCalculateRouteDistance,
    setIsMapShown
} from '../../store/actions';
import deleteSavedRoute from '../functions/deleteSavedRoute';




const SavedRouteCards = () => {
    const dispatch = useDispatch();

    // Creating history in order to allow react router re-directs:
    const history = useHistory();


    const savedRoutesResponse = useSelector(state => state.savedRoutesResponse);
    const cards = savedRoutesResponse.map((element, index) => ({...element, index})).reverse();
    const step = 1 / (cards.length - 1);


    const [currentIndex, setCurrentIndex] = useState(0);
    const aIndex = useTransition(currentIndex);


    return (
        <View style={styles.viewContainer}>
            <Pressable
            style={styles.darkenMap}
            onPress={() => {
                dispatch(setIsRouteCardsShown(false));
                dispatch(setIsMapShown(true));
            }}
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
                            dispatch(setIsMapShown(true));
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

export default SavedRouteCards;
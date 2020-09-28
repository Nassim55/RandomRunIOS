import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';

// Packages:
import { sub } from 'react-native-reanimated';
import { useTransition } from  "react-native-redash/lib/module/v1";
import { useDispatch, useSelector } from 'react-redux';

// Custom components:
import Card from './Card';

// Custom function imports:
import { setIsRouteCardsShown, setFinalRouteLineString, setMostNorthEasternCoordinates, setMostSouthWesternCoordinates } from '../../store/actions';
import deleteSavedRoute from '../functions/deleteSavedRoute';
import { useHistory } from "react-router-native";



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
        <View style={styles.containerSavedRouteCards}>
            <Pressable
            style={styles.darkenMap}
            onPress={() => dispatch(setIsRouteCardsShown(false))}
            />
            {cards.map(
                ({ index, distance, image, id, coordinates, duration, mostNorthEasternCoordinates, mostSouthWesternCoordinates }) =>
                    currentIndex < index * step + step && (
                        <Card 
                        key={index}
                        position={sub(index * step, aIndex)}
                        onSwipeLeft={() => setCurrentIndex(prev => prev + step)}
                        distanceMeters={distance}
                        image={image}
                        duration={duration}
                        step={step}
                        onSwipeRight={() => {
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
    containerSavedRouteCards: {
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
        opacity: 0.5,
        height: '100%',
        width: '100%',
    }
})

export default SavedRouteCards;
import React from 'react';
import { StyleSheet, View } from 'react-native';
import NeuronSVG from '../../images/Neuron_Transparent.svg';

// The neuron icon represents disorder in logic 

const NeuronIcon = () => {
    return (
        <View style={styles.neuronContainer}>
            <NeuronSVG />
        </View>
    );
};


const styles = StyleSheet.create({
    neuronContainer: {
        position: 'absolute',
        top: '5%',
        left: '2.5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        opacity: 0.8,
        margin: 5
    },
})


export default NeuronIcon;
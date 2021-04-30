import React from "react";
import {ActivityIndicator, Dimensions, StyleSheet} from "react-native";

export default function Preloader () {
    return (
        <ActivityIndicator style={styles.preloader} size={80} color="#1B4965"/>
    )
}

const styles = StyleSheet.create({
    preloader: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'white',
        opacity: 0.8
    }
})
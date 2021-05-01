import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {RALEWAY_BOLD} from "../fonts/fontsTypes";

export default function Empty() {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>Пусто...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontFamily: RALEWAY_BOLD
    }
})
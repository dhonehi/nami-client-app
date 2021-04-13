import React from 'react'
import {View, Text, Image, StyleSheet} from "react-native";

//const menuItemImg = require('../../assets/menu-item1.png')

const MenuListItem = () => {
    return (
        <View>
            <Text style={styles.label}>Роллы</Text>
        </View>
    )
}

export const ProductsMenuScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu</Text>
            <MenuListItem />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'flex-start'
    },
    title: {
        marginTop: 20,
        fontSize: 14,
        color: '#1B4965'
    },
    img: {
        width: 150,
        height: 90,
        resizeMode: 'cover'
    },
    label: {
        textAlign: 'center',
        fontSize: 12,
        color: '#1B4965'
    }
})
import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableWithoutFeedback, StyleSheet, Button} from "react-native";

import { useNavigationState } from '@react-navigation/native';

import {AntDesign} from '@expo/vector-icons';

import {RALEWAY_BOLD, RALEWAY_REGULAR} from "../fonts/fontsTypes";


const FavouriteBtn = () => {
    const [isClickOnHeart, setIsClickOnHeart] = useState(false)

    return (
        <TouchableWithoutFeedback
            onPress={() => setIsClickOnHeart(!isClickOnHeart)}>
            <View style={{backgroundColor: 'white', padding: 10, width: 45, borderRadius: 8, justifyContent: 'center'}}>
                {isClickOnHeart ?
                    <AntDesign name="heart" size={24} color="red"/> :
                    <AntDesign name="hearto" size={24} color="black"/>}
            </View>
        </TouchableWithoutFeedback>
    )
}

const AddToCardBth = () => {
    return (
        <TouchableWithoutFeedback>
            <View style={styles.addToCardBtn}>
                <Text style={{color: 'white'}}>Добавить в корзину</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export const ProductItemScreen = ({route: {params: {product}}}) => {


    return (
        <View style={styles.productContainer}>
            <View style={{alignItems: 'center', width: '100%'}}>
                <Image style={styles.img} source={{
                    uri: `https://namisushi.ru${product.images[0]}`
                }}/>
            </View>
            <View style={{marginHorizontal: 20, marginTop: 20, flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.productTitle}>{product.title}</Text>
                    <Text style={styles.productWeight}>{product.weight}</Text>
                </View>
                <View style={styles.productContent}>
                    <Text style={styles.productDescription}>{product.description}</Text>
                    <Text style={styles.productPrice}>{product.cost} &#8381;</Text>
                    <View style={styles.actions}>
                        <FavouriteBtn/>
                        <AddToCardBth/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        flex: 1,
        marginTop: 10
    },
    img: {
        width: '80%',
        height: 300
    },
    productContent: {
        flex: 1,
        justifyContent: 'space-between'
    },
    productTitle: {
        fontSize: 19,
        fontFamily: RALEWAY_BOLD,
        color: '#323232'
    },
    productWeight: {
        fontSize: 15,
        fontFamily: RALEWAY_REGULAR,
        color: '#505050'
    },
    productDescription: {
        marginTop: 20,
        fontSize: 15,
        fontFamily: RALEWAY_REGULAR,
        color: '#505050'
    },
    productPrice: {
        fontSize: 28,
        fontFamily: RALEWAY_BOLD,
        color: '#323232'
    },
    actions: {
        marginBottom: 30,
        flexDirection: 'row'
    },
    addToCardBtn: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        fontFamily: RALEWAY_REGULAR,
        paddingVertical: 15,
        fontSize: 15,
        backgroundColor: '#1B4965',
        borderRadius: 12,
        marginLeft: 20,
    }
})

import React, {useState} from "react";
import {View, Text, Image, TouchableWithoutFeedback, StyleSheet} from "react-native";

import {connect} from "react-redux";

import CardBtnGroup from "../components/CardBtnGroup";

import {AntDesign} from '@expo/vector-icons';

import {RALEWAY_BOLD, RALEWAY_REGULAR} from "../fonts/fontsTypes";

const FavouriteBtn = () => {
    const [isClickOnHeart, setIsClickOnHeart] = useState(false)

    return (
        <TouchableWithoutFeedback
            onPress={() => setIsClickOnHeart(!isClickOnHeart)}>
            <View style={{backgroundColor: 'white', padding: 15, width: 55, borderRadius: 8, justifyContent: 'center'}}>
                {isClickOnHeart ?
                    <AntDesign name="heart" size={24} color="red"/> :
                    <AntDesign name="hearto" size={24} color="black"/>}
            </View>
        </TouchableWithoutFeedback>
    )
}

const ProductItemScreen = ({route: {params: {product}}}) => {
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
                    <CardBtnGroup product={product}/>
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        userCard: state.userCard.userCard
    }
}

export default connect(mapStateToProps)(ProductItemScreen)

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
})

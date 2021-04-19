import React, {useEffect, useRef, useState} from "react";
import {View, Text, TouchableWithoutFeedback, StyleSheet, Animated, Easing} from "react-native";

import {Entypo, MaterialCommunityIcons, Ionicons, AntDesign} from '@expo/vector-icons';

import {connect} from "react-redux";

import TranslateAnim from "../animations/TranslateAnim";

import {addToUserCard, removeAllProduct, removeFromUserCard} from "../store/actions/userCard";
import {RALEWAY_MEDIUM, RALEWAY_REGULAR} from "../fonts/fontsTypes";

const FavouriteBtn = () => {
    const [isClickOnHeart, setIsClickOnHeart] = useState(false)

    return (
        <TouchableWithoutFeedback
            onPress={() => setIsClickOnHeart(!isClickOnHeart)}>
            <View style={{
                backgroundColor: 'white',
                height: 50,
                width: 50,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {isClickOnHeart ?
                    <AntDesign name="heart" size={24} color="red"/> :
                    <AntDesign name="hearto" size={24} color="black"/>}
            </View>
        </TouchableWithoutFeedback>
    )
}

const AddToCardBth = ({onClick}) => {
    const animSettings = {
        start: 0,
        end: 100,
        duration: 300,
        translate: [100, 0],
        opacity: [0, 1]
    }

    return (
        <TranslateAnim settings={animSettings} styles={{flex: 1}}>
            <TouchableWithoutFeedback onPress={onClick}>
                <View style={styles.addToCardBtn}>
                    <Text style={styles.addBtnText}>Добавить в корзину</Text>
                </View>
            </TouchableWithoutFeedback>
        </TranslateAnim>
    )
}

export const ProductCountSelect = ({userCard, product, addToCard, removeFromCard}) => {
    const productFromCard = userCard.find(item => item._id === product._id)
    const [productCount, setProductCount] = useState(productFromCard.count)

    const removeFromCardHandler = (product) => {
        setProductCount(productCount - 1)
        removeFromCard(product)
    }

    const addToCardHandler = (product) => {
        setProductCount(productCount + 1)
        addToCard(product)
    }

    return (
        <View style={styles.btnContainer}>
            <TouchableWithoutFeedback onPress={() => removeFromCardHandler(product)}>
                <View style={[styles.btn, {marginRight: 10}]}>
                    <MaterialCommunityIcons name="minus" size={15} color="white"/>
                </View>
            </TouchableWithoutFeedback>
            <Text style={styles.productCount}>{productCount}</Text>
            <TouchableWithoutFeedback onPress={() => addToCardHandler(product)}>
                <View style={[styles.btn, {marginLeft: 10}]}>
                    <Entypo name="plus" size={15} color="white"/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const ActionsWithProduct = (props) => {
    const animSettings = {
        start: 0,
        end: 100,
        duration: 300,
        translate: [100, 0],
        opacity: [0, 1]
    }

    return (
        <>
            <TranslateAnim settings={animSettings}>
                <ProductCountSelect {...props} />
            </TranslateAnim>
            <TranslateAnim settings={animSettings}>
                <TouchableWithoutFeedback onPress={() => props.removeAll(props.product)}>
                    <View style={styles.removeBtn}>
                        <Ionicons name="md-trash-outline" size={24} color="white"/>
                    </View>
                </TouchableWithoutFeedback>
            </TranslateAnim>
        </>
    )
}

const CardBtnGroup = (props) => {
    const isInCard = () => {
        return props.userCard.find(item => item._id === props.product._id) !== undefined
    }

    return (
        <View style={styles.container}>
            <FavouriteBtn/>
            {!isInCard() ? <AddToCardBth onClick={() => props.addToCard(props.product)}/> :
                <ActionsWithProduct {...props}/>}
        </View>
    )
}

const mapStateToProps = state => {
    return {
        userCard: state.userCard.userCard,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCard: (product) => {
            dispatch(addToUserCard(product))
        },
        removeFromCard: (product) => {
            dispatch(removeFromUserCard(product))
        },
        removeAll: (product) => {
            dispatch(removeAllProduct(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardBtnGroup)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#1B4965',
    },
    removeBtn: {
        padding: 14,
        backgroundColor: '#1B4965',
        width: 50,
        height: 50,
        justifyContent: 'center',
        borderRadius: 12
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
    },
    addBtnText: {
        color: 'white',
        fontFamily: RALEWAY_MEDIUM,
        fontSize: 15
    },
    productCount: {
        color: 'black',
        fontSize: 15,
        minWidth: 20,
        textAlign: 'center',
        fontFamily: RALEWAY_MEDIUM
    }
})
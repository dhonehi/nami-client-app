import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, AsyncStorage} from "react-native";
import {headerHeight} from "../components/Header";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {ProductCountSelect} from "../components/CardBtnGroup";
import {RALEWAY_BOLD, RALEWAY_MEDIUM, RALEWAY_REGULAR} from "../fonts/fontsTypes";

const ProductCard = (props) => {
    const [isClickOnHeart, setIsClickOnHeart] = useState(false)

    return (
        <View style={[styles.productCardContainer]}>
            <View style={styles.row}>
                <View style={[styles.imageWrapper, {width: '35%'}]}>
                    <Image style={{width: '100%', height: 90}} source={{
                        uri: `https://namisushi.ru${props.product.images[0]}`
                    }}/>
                </View>
                <View style={{flex: 1, marginLeft: 10}}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.productTitle}>{props.product.title}</Text>
                            <TouchableOpacity onPress={() => setIsClickOnHeart(!isClickOnHeart)}>
                                {isClickOnHeart ?
                                    <AntDesign name="heart" size={24} color="red"/> :
                                    <AntDesign name="hearto" size={24} color="black"/>}
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.productDescription}>{props.product.description}</Text>
                    </View>
                    <Text style={styles.productPrice}>{props.product.cost} &#8381;</Text>
                </View>
            </View>
            <View style={[styles.row, {alignItems: 'center', flex: 1, marginTop: 10}]}>
                <View style={{width: '35%', alignItems: 'center'}}>
                    <ProductCountSelect {...props} />
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',}}>
                    <Text style={styles.productAmount}>{props.product.cost * props.product.count} &#8381;</Text>
                </View>
                <TouchableOpacity
                    onPress={() => props.removeAll(props.product)}
                    style={{backgroundColor: '#F56C6C', padding: 6, borderRadius: 4}}>
                    <Ionicons name="md-trash-outline" size={15} color="white"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function OrdersScreen(props) {
    useEffect(() => {
        AsyncStorage.getItem('orders').then(response => {
            console.log(response)
        })
    })

    return (
        <View style={{flex: 1, marginTop: headerHeight}}>
           {/* <View style={{paddingHorizontal: 15, flex: 1}}>
                <Text style={styles.title}>Корзина</Text>
                <Text style={styles.subtitle}>Сумма: 46546 &#8381;</Text>
                <ScrollView style={{flex: 1, marginBottom: 20, marginTop: 20}}>
                    {props.userCard.map((item, index) => <ProductCard {...props} index={index} product={item}
                                                                      key={item._id}/>)}
                </ScrollView>
            </View>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: headerHeight
    },
    title: {
        marginTop: 15,
        marginRight: 5,
        fontSize: 25,
        fontFamily: RALEWAY_BOLD,
        color: '#1B4965'
    },
    subtitle: {
        marginTop: 14,
        fontSize: 15,
        color: 'black',
        fontFamily: RALEWAY_REGULAR
    },
    productCardContainer: {
        padding: 14,
        backgroundColor: 'white',
        borderRadius: 8
    },
    imageWrapper: {
        padding: 10,
        backgroundColor: '#1B4965',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    productTitle: {
        fontSize: 20,
        fontFamily: RALEWAY_BOLD,
        color: '#1B4965'
    },
    row: {
        flexDirection: 'row'
    },
    productDescription: {
        fontSize: 15,
        marginTop: 6,
        lineHeight: 20,
        fontFamily: RALEWAY_MEDIUM,
        color: '#606060'
    },
    productPrice: {
        marginTop: 8,
        fontSize: 13,
        fontFamily: RALEWAY_BOLD,
        color: '#606060'
    },
    productAmount: {
        fontSize: 30,
        fontFamily: RALEWAY_BOLD,
        color: '#1B4965'
    },
    createOrderBtnWrapper: {
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    createOrderBtn: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B4965',
        borderRadius: 4
    },
    createOrderBtnText: {
        color: 'white',
        fontSize: 14,
        fontFamily: RALEWAY_BOLD
    }
})
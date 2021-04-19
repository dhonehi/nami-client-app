import React, {useEffect, useState} from 'react'
import {View, Text, Image, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity} from "react-native";

import {BoxShadow} from "react-native-shadow";

import {headerHeight} from "../components/Header";

import {RALEWAY_REGULAR, RALEWAY_BOLD} from "../fonts/fontsTypes";

const ProductCard = ({product, index, navigation}) => {
    const checkIndexIsEven = (n) => n % 2 === 0;

    const shadowOpt = {
        width: 250,
        height: 150,
        color: "#e9e9e9",
        border: 2,
        radius: 50,
        opacity: 0.14,
        x: 50,
        y: 180,
        style: {
            width: '42%',
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: 'white',
            borderRadius: 16,
            alignItems: 'center',
            fontFamily: RALEWAY_REGULAR,
            marginHorizontal: 15,
            marginBottom: 10,
            marginTop: index === 0 ? 70 : index === 1 ? 20 : !checkIndexIsEven(index) ? -30 : 20,
            height: 180
        }
    };

    return (
        <BoxShadow setting={shadowOpt}>
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductItem', {product: product})}
                style={[styles.productContainer]}>
                <Image style={{width: 70, height: 70}} source={{
                    uri: `https://namisushi.ru${product.images[0]}`
                }}/>
                <View style={styles.productDescriptionWrapper}>
                    <Text style={styles.productDescription}>{product.title}</Text>
                </View>
                <Text style={styles.productPrice}>{product.cost} &#8381;</Text>
            </TouchableOpacity>
        </BoxShadow>
    )
}


export const MenuItemsScreen = ({route: {params: {_id}}, navigation}) => {
    const [products, setProducts] = useState({loading: true})

    useEffect(() => {
        const url = `https://namisushi.ru/api/products?category=${_id}`
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                setProducts({
                    loading: false,
                    productsList: responseJson.products,
                    count: responseJson.total
                })
            })
    }, [])

    if (products.loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        )
    }

    return (
        <View style={{flex: 1, marginTop: headerHeight}}>
            <FlatList
                ListHeaderComponent={<View style={styles.headerContainer}>
                    <Text style={styles.title}>Роллы</Text>
                    <Text style={styles.subtitle}>Найдено {products.count} товаров</Text>
                </View>}
                numColumns={2}
                horizontal={false}
                data={products.productsList}
                renderItem={({item, index}) => <ProductCard product={item} index={index} navigation={navigation}/>}
                keyExtractor={({_id}) => _id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        position: 'relative',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontFamily: RALEWAY_BOLD,
        fontSize: 25,
        color: '#1B4965'
    },
    subtitle: {
        position: 'absolute',
        top: 40,
        fontSize: 15,
        color: 'black',
        width: 110,
        fontFamily: RALEWAY_REGULAR
    },
    label: {
        textAlign: 'center',
        fontSize: 12,
        color: '#1B4965'
    },
    productsList: {
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 50
    },
    productContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    productDescriptionWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    productDescription: {
        fontSize: 13,
        color: '#323232',
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 18,
        fontFamily: RALEWAY_BOLD,
        color: '#323232',
        marginTop: 10
    }
})
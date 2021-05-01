import React from "react";
import {Text, View, StyleSheet, Image, ScrollView, ToastAndroid, TouchableOpacity} from "react-native";

import {connect} from "react-redux";

import {RALEWAY_BOLD, RALEWAY_MEDIUM, RALEWAY_REGULAR} from "../fonts/fontsTypes";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {removeFromFavourites} from "../store/actions/favourites";
import Empty from "../components/Empty";
import {addToUserCard} from "../store/actions/userCard";

const FavouriteCard = ({product, userCard, removeProductFromFavourites, addToCard}) => {
    const addProductToCard = () => {
        if (userCard.find(cardProduct => cardProduct._id === product._id)) {
            ToastAndroid.show('Товар уже в корзине', ToastAndroid.SHORT)
        } else {
            addToCard(product)
            ToastAndroid.show('Товар добавлен в корзину', ToastAndroid.SHORT)
        }
    }

    return (
        <TouchableOpacity onPress={addProductToCard}>
            <View style={styles.productCardContainer}>
                <View style={styles.row}>
                    <View style={[styles.imageWrapper, {width: '35%'}]}>
                        <Image style={{width: '100%', height: 90}} source={{
                            uri: `https://namisushi.ru${product.images[0]}`
                        }}/>
                    </View>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <View style={{flex: 1}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.productTitle}>{product.title}</Text>
                                <TouchableOpacity onPress={() => removeProductFromFavourites(product)}
                                                  style={{backgroundColor: '#F56C6C', padding: 6, borderRadius: 4}}>
                                    <Ionicons name="md-trash-outline" size={15} color="white"/>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.productDescription}>{product.description}</Text>
                        </View>
                        <Text style={styles.productPrice}>{product.cost} &#8381;</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const FavouritesScreen = ({favourites, userCard, removeProductFromFavourites, addToCard}) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="heart" size={24} color="red"/>
                <Text style={styles.title}>Избранное</Text>
            </View>
            {favourites.length > 0 &&
            <Text style={styles.subtitle}>Всего {favourites.length}</Text> &&
            <ScrollView style={{marginBottom: 10, marginTop: 10}}>
                {favourites.map(product => <FavouriteCard product={product}
                                                          addToCard={addToCard}
                                                          userCard={userCard}
                                                          removeProductFromFavourites={removeProductFromFavourites}
                                                          key={product._id}/>)}
            </ScrollView>}
            {favourites.length === 0 && <Empty/>}
        </View>
    )
}

const mapStateToProps = state => {
    return {
        favourites: state.favourites.favourites,
        userCard: state.userCard.userCard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeProductFromFavourites: (product) => {
            dispatch(removeFromFavourites(product))
        },
        addToCard: (product) => {
            dispatch(addToUserCard(product))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesScreen)

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        paddingHorizontal: 22,
        flex: 1
    },
    title: {
        marginLeft: 12,
        fontSize: 25,
        fontFamily: RALEWAY_BOLD,
        color: '#1B4965'
    },
    subtitle: {
        marginTop: 12,
        color: 'black',
        fontSize: 15,
        fontFamily: RALEWAY_REGULAR
    },
    productCardContainer: {
        marginTop: 14,
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
})
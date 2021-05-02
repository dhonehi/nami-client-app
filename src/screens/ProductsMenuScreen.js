import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, Image, StyleSheet} from "react-native";
import {headerHeight} from "../components/Header";
import {RALEWAY_BOLD} from "../fonts/fontsTypes";

import rols from '../../assets/rols.png'
import rice from '../../assets/rice.png'
import salads from '../../assets/salads.png'
import sets from '../../assets/sets.png'
import sushi from '../../assets/sushi.png'

export const ProductsMenuScreen = ({navigation}) => {
    const [categories, setCategories] = useState({loading: true})
    const images = [rols, rice, salads, sets, sushi]

    useEffect(() => {
        fetch('https://namisushi.ru/api/categories')
            .then(response => response.json())
            .then(responseJson => {
                setCategories({
                    loading: false,
                    categoryList: responseJson
                })
            }).catch(() => {
                setCategories({
                    loading: false,
                    categoryList: []
                })
        })
    }, [])

    if (categories.loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#000ff"/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Меню</Text>
            <ScrollView>
                <View style={styles.menuItems}>
                    {categories.categoryList.map((category, index) => (
                        <TouchableOpacity
                            onPress={() => navigation.push('MenuItem', {_id: category._id})}
                            style={styles.menuItem}
                            key={category._id}>
                            <Image style={styles.img} source={images[index <= 4 ? index : 0]}/>
                            <Text style={styles.label}>{category.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: headerHeight,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'flex-start'
    },
    title: {
        fontFamily: 'Raleway-bold',
        marginTop: 20,
        marginBottom: 20,
        fontSize: 20,
        color: '#1B4965'
    },
    img: {
        width: 150,
        height: 90,
        marginTop: 10,
        borderRadius: 16,
        resizeMode: 'cover'
    },
    label: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
        color: '#1B4965',
        fontFamily: RALEWAY_BOLD,
        textAlign: 'center'
    },
    menuItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    menuItem: {
        marginBottom: 30
    }
})
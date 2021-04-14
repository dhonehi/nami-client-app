import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet} from "react-native";

const MenuListItem = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity style={styles.label}
                              onPress={() => navigation.push('MenuItem')}><Text>Роллы</Text></TouchableOpacity>
            <TouchableOpacity style={styles.label}><Text>Суши и гунканы</Text></TouchableOpacity>
            <TouchableOpacity style={styles.label}><Text>Сеты</Text></TouchableOpacity>
            <TouchableOpacity style={styles.label}><Text>Лапша и рис</Text></TouchableOpacity>
        </View>
    )
}

export const ProductsMenuScreen = ({navigation}) => {
    const [categories, setCategories] = useState({loading: true})

    useEffect(() => {
        fetch('https://namisushi.ru/api/categories')
            .then(response => response.json())
            .then(responseJson => {
                setCategories({
                    loading: false,
                    categoryList: responseJson
                })
            })
    }, [])

    if (categories.loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Меню</Text>
            <FlatList
                data={categories.categoryList}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.push('MenuItem', {_id: item._id})}>
                        <Text style={styles.label}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={({_id}) => _id}
            />
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
        fontFamily: 'Raleway-bold',
        marginTop: 20,
        fontSize: 20,
        color: '#1B4965'
    },
    img: {
        width: 150,
        height: 90,
        resizeMode: 'cover'
    },
    label: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
        color: '#1B4965'
    }
})
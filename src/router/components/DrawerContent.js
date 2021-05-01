import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";

import {AntDesign, Entypo} from '@expo/vector-icons';

import React, {useEffect} from "react";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import {RALEWAY_MEDIUM} from "../../fonts/fontsTypes";

function CustomDrawerContent(props) {
    return (
        <View style={styles.drawerContent}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerHeader}>
                    <Image source={require('../../../assets/user-avatar.png')}/>
                    <Text style={styles.drawerHeaderText}>Клиент</Text>
                </View>

                <View style={styles.drawerSection}>
                    <View style={styles.drawerItem}>
                        <AntDesign style={styles.icon} name="earth" size={20} color="rgba(255, 255, 255, 0.6)"/>
                        <Text style={styles.drawerText}>Сайт</Text>
                    </View>
                    <View style={styles.drawerItem}>
                        <Entypo style={styles.icon} name="vk" size={20} color="rgba(255, 255, 255, 0.6)"/>
                        <Text style={styles.drawerText}>vk.com</Text>
                    </View>
                    <View style={styles.drawerItem}>
                        <AntDesign style={styles.icon} name="instagram" size={20} color="rgba(255, 255, 255, 0.6)"/>
                        <Text style={styles.drawerText}>Instagram</Text>
                    </View>
                </View>
                <View style={styles.drawerSection}>
                    <View style={styles.drawerItem}>
                        <TouchableOpacity style={{flexDirection: 'row'}}
                                          onPress={() => props.navigation.navigate('Menu', {
                                              screen: 'Favourites',
                                          })}>
                            <AntDesign style={styles.icon} name="heart" size={20} color="rgba(255, 255, 255, 0.6)"/>
                            <Text style={styles.drawerText}>Избранное</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </DrawerContentScrollView>

            <View>
                <Text style={styles.drawerText}>Выйти</Text>
            </View>
        </View>
    );
}

export default CustomDrawerContent

const styles = StyleSheet.create({
    drawerContent: {
        paddingLeft: 20,
        paddingBottom: 30,
        flex: 1,
        backgroundColor: '#1b4965'
    },
    drawerSection: {
        marginBottom: 40
    },
    drawerHeader: {
        marginTop: 30,
        marginBottom: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    drawerHeaderText: {
        marginLeft: 14,
        color: 'white',
        fontSize: 14,
        fontFamily: RALEWAY_MEDIUM
    },
    drawerItem: {
        flexDirection: 'row',
        marginBottom: 20
    },
    drawerText: {
        fontSize: 16,
        fontFamily: RALEWAY_MEDIUM,
        color: 'rgba(255, 255, 255, 0.6)'
    },
    icon: {
        marginRight: 20
    }
})
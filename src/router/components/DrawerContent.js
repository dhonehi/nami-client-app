import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";

import {AntDesign, Entypo} from '@expo/vector-icons';

import React, {useEffect} from "react";
import {
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import {RALEWAY_MEDIUM} from "../../fonts/fontsTypes";

import {connect} from "react-redux";
import {logout} from "../../store/actions/auth";
import {signout} from "../../api/api";

function CustomDrawerContent(props) {
    const logoutFromAcc = () => {
        signout(props.sessionId)
        props.logoutFromAcc()
    }

    return (
        <View style={styles.drawerContent}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerHeader}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                        {props.userInfo?.avatar.length > 0 && <Image source={{uri: props.userInfo.avatar}}
                                                                     style={{
                                                                         width: 80,
                                                                         height: 80,
                                                                         borderRadius: 100
                                                                     }}/>}
                        {(props.userInfo?.avatar.length === 0 || !props.isLoggedIn) &&
                        <Image style={{width: 80, height: 80}} source={require('../../../assets/user-avatar.png')}/>}
                    </TouchableOpacity>
                    <Text style={styles.drawerHeaderText}>{props.isLoggedIn ? props.userInfo?.name : 'Клиент'}</Text>
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

            {props.isLoggedIn && <TouchableOpacity onPress={() => logoutFromAcc()}>
                <Text style={styles.drawerText}>Выйти</Text>
            </TouchableOpacity>}
            {!props.isLoggedIn &&
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Profile', {screen: 'Register'})}>
                    <Text style={[styles.drawerText, {marginRight: 15}]}>Зарегестрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('Profile', {screen: 'Login'})}>
                    <Text style={styles.drawerText}>Войти</Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    );
}

const mapStateToProps = state => {
    return {
        userInfo: state.auth.userInfo,
        isLoggedIn: state.auth.isLoggedIn,
        sessionId: state.auth.sessionId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutFromAcc: () => {
            dispatch(logout())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent)

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
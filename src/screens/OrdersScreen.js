import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, ScrollView, Image, ToastAndroid, TouchableOpacity} from "react-native";
import {RALEWAY_BOLD, RALEWAY_REGULAR} from "../fonts/fontsTypes";
import {CommonActions} from "@react-navigation/native";

import {connect} from "react-redux";

import {getUserOrders, getOrderProducts} from "../api/api";
import {addProductsToUserCard,} from "../store/actions/userCard";

const OrderCard = ({order, sessionId, navigation, addProductsToCard}) => {
    const [orderInfo, setOrderInfo] = useState(null)

    useEffect(() => {
        getOrderProducts(order._id, sessionId)
            .then(response => response.json())
            .then(responseJson => {
                setOrderInfo(responseJson)
            })
    }, [])

    const getConditionText = () => {
        if (orderInfo.condition === 0) return 'Ожидает подтверждения'
        else if (orderInfo.condition === 10) return 'В процессе'
        else if (orderInfo.condition === 20) return 'Еда в пути'
        else if (orderInfo.condition === 30) return 'Готов'
        else if (orderInfo.condition === 40) return 'Отмененный заказ'
    }

    const getConditionColor = () => {
        if (orderInfo.condition >= 0 && orderInfo.condition <= 20) return '#FFA133'
        else if (orderInfo.condition === 30) return '#27AE60'
        else if (orderInfo.condition === 40) return '#FF3333'
    }

    const getDateString = (date) => {
        return new Date(date).toLocaleDateString()
    }

    const addOrderToCard = () => {
        addProductsToCard(orderInfo.products)
        ToastAndroid.show('Заказ в корзине', ToastAndroid.SHORT)
    }

    if (orderInfo) {
        return (
            <View style={styles.orderCard}>
                <View style={styles.top}>
                    <Image style={styles.img} source={require('../../assets/logo.png')}/>
                    <View style={styles.orderInfo}>
                        <View style={styles.orderInfoHeader}>
                            <Text style={styles.orderInfoTitle}>NamiSushi</Text>
                            <Text style={styles.orderInfoCost}>{orderInfo.cost} &#8381;</Text>
                        </View>
                        <View style={styles.orderInfoCount}>
                            <Text style={styles.orderDate}>{getDateString(orderInfo.createdAt)}</Text>
                            <Text style={styles.orderProductsCount}>Кол-во {orderInfo.products.length}</Text>
                        </View>
                        <View style={styles.orderInfoStatus}>
                            <View style={[styles.circle, {backgroundColor: getConditionColor()}]}/>
                            <Text
                                style={[styles.orderInfoStatusText, {color: getConditionColor()}]}>{getConditionText()}</Text>
                        </View>
                    </View>
                </View>
                {orderInfo.condition <= 20 &&
                <View style={styles.bottom}>
                    <TouchableOpacity onPress={() => navigation.push('MapScreen', {sessionId})}
                                      style={styles.findBtn}>
                        <Text style={styles.findBtnText}>Отследить</Text>
                    </TouchableOpacity>
                    {(orderInfo.condition === 0 || orderInfo.condition === 10) &&
                    <TouchableOpacity style={styles.clearBtn}>
                        <Text style={styles.clearBtnText}>Отменить</Text>
                    </TouchableOpacity>}
                </View>
                }
                {orderInfo.condition > 20 &&
                <TouchableOpacity onPress={addOrderToCard} style={styles.findBtn}>
                    <Text style={styles.findBtnText}>Повторить</Text>
                </TouchableOpacity>}

            </View>
        )
    } else {
        return null
    }
}

const OrdersScreen = ({navigation, isLoggedIn, userInfo, sessionId, addProductsToCard}) => {
    const [userOrders, setUserOrders] = useState([])

    useEffect(() => {
        if (!isLoggedIn) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {name: 'Profile'},
                    ],
                })
            )
        } else {
            getUserOrders(sessionId)
                .then(response => response.json())
                .then(responseJson => {
                    setUserOrders(responseJson.orders)
                })
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>История заказов</Text>
            <ScrollView style={{flex: 1}}>
                {userOrders.map(order => <OrderCard order={order} sessionId={sessionId}
                                                    navigation={navigation} key={order._id}
                                                    addProductsToCard={addProductsToCard}/>)}
            </ScrollView>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        userInfo: state.auth.userInfo,
        sessionId: state.auth.sessionId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProductsToCard: (products) => {
            dispatch(addProductsToUserCard(products))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen)

const styles = StyleSheet.create({
    container: {
        marginTop: 120,
        marginHorizontal: 18,
        marginBottom: 10,
        flex: 1
    },
    title: {
        fontSize: 20,
        fontFamily: RALEWAY_BOLD,
        color: '#1B4965',
        marginBottom: 10
    },
    orderCard: {
        marginTop: 14,
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: 'white',
        borderRadius: 4
    },
    top: {
        flexDirection: 'row',
        flex: 1
    },
    img: {
        width: 100,
        height: 100
    },
    orderInfo: {
        flex: 1
    },
    orderInfoHeader: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    orderInfoTitle: {
        fontSize: 15,
        fontFamily: RALEWAY_BOLD,
        color: '#343434',
        flex: 1
    },
    orderProductsCount: {
        fontSize: 12,
        fontFamily: RALEWAY_REGULAR
    },
    orderInfoStatus: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 100,
        marginRight: 10
    },
    orderInfoStatusText: {
        fontSize: 12,
    },
    orderInfoCost: {
        fontSize: 15,
        fontFamily: RALEWAY_BOLD,
        color: '#1B4965'
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    findBtn: {
        flex: 1,
        height: 32,
        marginLeft: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B4965',
        borderRadius: 8
    },
    findBtnText: {
        fontSize: 15,
        fontFamily: RALEWAY_BOLD,
        color: 'white'
    },
    clearBtn: {
        flex: 1,
        height: 32,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F56C6C',
        borderRadius: 8
    },
    clearBtnText: {
        fontSize: 15,
        color: 'white'
    },
    orderInfoCount: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderDate: {
        fontSize: 12,
        fontFamily: RALEWAY_REGULAR,
        marginRight: 20,
        color: 'black'
    }
})
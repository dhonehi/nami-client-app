import React, {useState} from "react";
import {View, Text, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from "react-native";
import {headerHeight} from "../components/Header";
import {RALEWAY_BOLD, RALEWAY_MEDIUM, RALEWAY_REGULAR} from "../fonts/fontsTypes";

import {MaterialIcons, Ionicons} from '@expo/vector-icons';

import {DeliveryIcon, ShoppingBagIcon, MoneyIcon} from "../icons/orderIcons";

const Check = ({onClick, isChecked, disabled}) => {
    return (
        <TouchableWithoutFeedback onPress={disabled ? null : () => onClick()}>
            <View style={[styles.check, {backgroundColor: isChecked ? 'red' : 'white'}]}/>
        </TouchableWithoutFeedback>
    )
}

const OrderScreen = (props) => {
    const [isDelivery, setIsDelivery] = useState(true)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [additionalInformation, setAdditionalInformation] = useState('')

    const deliveryClickHandler = () => {
        setIsDelivery(!isDelivery)
    }

    return (
        <View style={styles.container}>
            <View style={styles.orderCards}>
                <ScrollView>
                    <View style={{flex: 1}}>
                        <View style={styles.orderCard}>
                            <View style={styles.orderCardNumber}>
                                <Text style={{color: 'white'}}>1</Text>
                            </View>
                            <View style={styles.orderCardContent}>
                                <Text style={styles.orderCardTitle}>Способ доставки</Text>
                                <View style={styles.orderCardRow}>
                                    <Check isChecked={isDelivery} onClick={deliveryClickHandler}/>
                                    <DeliveryIcon/>
                                    <Text style={styles.orderCardRowLabel}>Курьер</Text>
                                </View>
                                <View style={styles.orderCardRow}>
                                    <Check isChecked={!isDelivery} onClick={deliveryClickHandler}/>
                                    <ShoppingBagIcon/>
                                    <Text style={styles.orderCardRowLabel}>Самовывоз</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.orderCard}>
                            <View style={styles.orderCardNumber}>
                                <Text style={{color: 'white'}}>2</Text>
                            </View>
                            <View style={styles.orderCardContent}>
                                <Text style={styles.orderCardTitle}>Способ оплаты</Text>
                                <View style={styles.orderCardRow}>
                                    <Check isChecked={true} disabled={true}/>
                                    <MoneyIcon/>
                                    <View>
                                        <Text style={styles.orderCardRowLabel}>Оплата наличными при</Text>
                                        <Text style={styles.orderCardRowLabel}>получении</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.orderCard}>
                            <View style={styles.orderCardNumber}>
                                <Text style={{color: 'white'}}>3</Text>
                            </View>
                            <View style={styles.orderCardContent}>
                                <Text style={styles.orderCardTitle}>Данные для доставки</Text>
                            </View>
                        </View>
                        <View style={styles.orderCard}>
                            <View style={styles.inputWrapper}>
                                <View style={{width: 25}}/>
                                <TextInput style={styles.orderInput} value={name} onChangeText={setName}
                                           placeholder="Ваше имя"/>
                            </View>
                        </View>
                        <View style={styles.orderCard}>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="home" size={24} color="black"/>
                                <TextInput style={styles.orderInput} value={address} onChangeText={setAddress}
                                           placeholder="Адресс"/>
                            </View>
                        </View>
                        <View style={styles.orderCard}>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="call" size={24} color="black" />
                                <TextInput style={styles.orderInput} value={phoneNumber} onChangeText={setPhoneNumber}
                                           placeholder="Телефон" keyboardType="numeric"/>
                            </View>
                        </View>
                        <View style={styles.orderCard}>
                            <View style={styles.inputWrapper}>
                                <View style={{width: 25}}/>
                                <TextInput style={styles.orderInput} value={additionalInformation}
                                           onChangeText={setAdditionalInformation}
                                           placeholder="Дополнительная информация"/>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.orderBtn}>
                        <Text style={styles.orderBtnText}>Заказать</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

export default OrderScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: headerHeight,
        flex: 1,
        backgroundColor: '#214d67'
    },
    orderCards: {
        padding: 15,
        flex: 1,
        width: '100%'
    },
    orderCard: {
        flexDirection: 'row',
        marginBottom: 15,
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 4,
        width: '100%'
    },
    orderCardNumber: {
        width: 24,
        height: 24,
        borderRadius: 100,
        backgroundColor: '#D13C35',
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderCardTitle: {
        marginTop: 3,
        fontSize: 16,
        fontFamily: RALEWAY_MEDIUM,
        color: 'black'
    },
    orderCardContent: {
        marginLeft: 10,
    },
    orderCardRow: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    check: {
        marginRight: 15,
        width: 24,
        height: 24,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'grey'
    },
    orderCardRowLabel: {
        marginLeft: 10,
        fontSize: 15,
        fontFamily: RALEWAY_REGULAR,
        color: '#171717'
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        width: '100%'
    },
    orderInput: {
        marginLeft: 14,
        width: '100%',
        height: '100%',
    },
    orderBtn: {
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D13C35',
        borderRadius: 4
    },
    orderBtnText: {
        color: 'white',
        fontSize: 15,
        fontFamily: RALEWAY_BOLD
    }
})
import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Alert,
    TouchableOpacity,
    TouchableWithoutFeedback,
    AsyncStorage,
    Modal,
    StyleSheet
} from "react-native";
import {headerHeight} from "../components/Header";
import {RALEWAY_BOLD, RALEWAY_MEDIUM, RALEWAY_REGULAR} from "../fonts/fontsTypes";

import {MaterialIcons, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';

import {connect} from "react-redux";

import {clearUserCard} from "../store/actions/userCard";

import {DeliveryIcon, ShoppingBagIcon, MoneyIcon} from "../icons/orderIcons";

import {sendOrder} from "../api/api";


import {useNavigation} from '@react-navigation/native';
import Preloader from "../router/components/Preloader";
import RadioSelect from "../components/RadioSelect";

const Check = ({onClick, isChecked, disabled}) => {
    return (
        <TouchableWithoutFeedback onPress={disabled ? null : () => onClick()}>
            <View style={[styles.check, {backgroundColor: isChecked ? 'red' : 'white'}]}/>
        </TouchableWithoutFeedback>
    )
}

const OrderScreen = ({route: {params: {userCard}}, userInfo, sessionId, clearCard}) => {
    const navigation = useNavigation()

    const [isDelivery, setIsDelivery] = useState(true)
    const [name, setName] = useState(userInfo?.name || '')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(userInfo?.phone || '')
    const [additionalInformation, setAdditionalInformation] = useState('')
    const [deliveryTime, setDeliveryTime] = useState(Date.now())
    const [isShowDatePicker, setIsShowDatePicker] = useState(false)
    const [isShowTimePicker, setIsShowTimePicker] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isShowAddressSelect, setIsShowAddressSelect] = useState(false)

    const deliveryClickHandler = () => {
        setIsDelivery(!isDelivery)
    }

    const createOrder = () => {
        if (!name || (!address && isDelivery) || !phoneNumber) {
            Alert.alert('Не все поля заполнены!')
            return
        }

        const products = userCard.map(item => {
            return {
                product: item._id,
                count: item.count
            }
        })

        const requestData = {
            products,
            address,
            phone: phoneNumber,
            username: name,
            additionalInformation,
            delivery: isDelivery,
            time: new Date(deliveryTime).toUTCString()
        }

        setLoading(true)

        sendOrder(requestData, sessionId).then(async response => {
            if (response.ok) {
                const order = {
                    date: Date.now(),
                    address,
                    additionalInformation,
                    products: userCard,
                }

                const prevOrders = JSON.parse(await AsyncStorage.getItem('orders'))
                let newOrders = []

                if (prevOrders && prevOrders.length) {
                    newOrders = [...prevOrders, order]
                }

                AsyncStorage.setItem('orders', JSON.stringify(newOrders))

                setLoading(false)
                Alert.alert('Ваш заказ поступил в обработку!')
                clearCard()
                navigation.popToTop()
            }
        })
    }

    const showDatePicker = () => {
        setIsShowDatePicker(true)
    }

    const changeDateHandler = (data) => {
        setIsShowDatePicker(false)
        if (data.type === 'set') {
            setDeliveryTime(data.nativeEvent.timestamp)
            setIsShowTimePicker(true)
        }
    }

    const changeTimeHandler = (data) => {
        setIsShowTimePicker(false)
        if (data.type === 'set') {
            setDeliveryTime(data.nativeEvent.timestamp)
        } else {
            setDeliveryTime(new Date(Date.now()))
        }
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
                                <Text style={styles.orderCardTitle}>Данные для заказа</Text>
                            </View>
                        </View>
                        <View style={styles.orderCard}>
                            <View style={styles.inputWrapper}>
                                <View style={{width: 25}}/>
                                <TextInput style={styles.orderInput} value={name} onChangeText={setName}
                                           placeholder="Ваше имя"/>
                            </View>
                        </View>
                        {isDelivery && <View style={styles.orderCard}>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="home" size={24} color="black"/>
                                <TextInput style={styles.orderInput} value={address} onChangeText={setAddress}
                                           placeholder="Адрес"/>
                                {userInfo?.addresses.length > 0 &&
                                <MaterialCommunityIcons onPress={() => setIsShowAddressSelect(true)}
                                                        name="dots-horizontal" size={24} color="black"/>}
                            </View>
                        </View>}
                        <View style={styles.orderCard}>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="call" size={24} color="black"/>
                                <TextInput style={styles.orderInput} value={phoneNumber} onChangeText={setPhoneNumber}
                                           placeholder="Телефон" keyboardType="numeric"/>
                            </View>
                        </View>
                        <View style={styles.orderCard}>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="time" size={24} color="black"/>
                                <TouchableOpacity style={styles.timeInputWrapper} onPress={showDatePicker}>
                                    <Text>{new Date(deliveryTime).toLocaleDateString()} {new Date(deliveryTime).toLocaleTimeString()}</Text>
                                </TouchableOpacity>
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
                    <TouchableOpacity style={styles.orderBtn} onPress={createOrder}>
                        <Text style={styles.orderBtnText}>Заказать</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            {loading && <Preloader/>}
            {userInfo !== null && <RadioSelect isVisible={isShowAddressSelect}
                                               onClose={() => setIsShowAddressSelect(false)}
                                               data={userInfo.addresses.map(address => ({
                                                   label: address.address,
                                                   accessibilityLabel: address.alias
                                               }))}
                                               onSave={(selectedItem) => {
                                                   setAddress(selectedItem?.label || '')
                                                   setIsShowAddressSelect(false)
                                               }}
            />}
            {isShowDatePicker &&
            <DateTimePicker
                testID="dateTimePicker"
                value={deliveryTime}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={changeDateHandler}
            />}
            {isShowTimePicker &&
            <DateTimePicker
                testID="dateTimePicker"
                value={deliveryTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={changeTimeHandler}
            />}
        </View>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.auth.userInfo,
        sessionId: state.auth.sessionId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearCard: () => {
            dispatch(clearUserCard())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)

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
        flex: 1,
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
    },
    timeInputWrapper: {
        marginLeft: 14,
        flex: 1
    }
})
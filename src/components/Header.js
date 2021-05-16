import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback} from "react-native";
import HamburgerSvg from "../icons/HamburgerSvg";

import {connect} from "react-redux";

import {Feather, FontAwesome, SimpleLineIcons, AntDesign} from "@expo/vector-icons";
import {clearUserCard} from "../store/actions/userCard";
import {search} from "../store/actions/search";

const HamburgerButton = ({navigation}) => (
    <TouchableOpacity style={styles.btnWrapper} onPress={() => navigation.openDrawer()}>
        <HamburgerSvg/>
    </TouchableOpacity>
)

const BackBtn = ({navigation}) => (
    <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.btnWrapper}>
        <FontAwesome name="long-arrow-left" size={24} color="black"/>
    </TouchableOpacity>
)

const SearchBtn = ({onClick}) => {
    return (
        <TouchableOpacity style={[styles.btnWrapper]} onPress={onClick}>
            <Feather name="search" size={30} color="black"/>
        </TouchableOpacity>
    )
}

const CartBtn = ({userCard, navigation}) => (
    <TouchableOpacity
        onPress={() => navigation.navigate('ProductCard')}
        style={[styles.btnWrapper, styles.cartBtn]}>
        {userCard.length > 0 && <View style={styles.cartDot}/>}
        <SimpleLineIcons name="bag" size={30} color="black"/>
    </TouchableOpacity>
)

const BtnGroup = ({navigation, userCard, isShowSearch, clickOnSearchBtn}) => {
    return (
        <View style={styles.btnGroup}>
            {isShowSearch && <SearchBtn onClick={clickOnSearchBtn}/>}
            <CartBtn userCard={userCard} navigation={navigation}/>
        </View>
    )
}

const SearchBar = ({onClose, searchProducts}) => {
    const [searchText, setSearchText] = useState('')

    const searchHandler = (text) => {
        setSearchText(text)
        searchProducts(text)
    }

    const closeHandler = () => {
        setSearchText('')
        onClose()
    }

    return (
        <View style={styles.searchBar}>
            <View style={styles.iconWrapper}>
                <Feather name="search" size={30} color="white"/>
            </View>
            <TextInput style={styles.searchInput} placeholder="Поиск" value={searchText} onChangeText={searchHandler}/>
            <TouchableWithoutFeedback onPress={closeHandler}>
                <AntDesign name="close" size={20} color="black" />
            </TouchableWithoutFeedback>
        </View>
    )
}

const Header = ({navigation, isShowBackBtn, isShowSearch, isShowBtnGroup, userCard, searchProducts}) => {
    const [isShowSearchBar, setIsShowSearchBar] = useState(false)

    if (!isShowSearchBar) {
        return (
            <View style={styles.header}>
                {isShowBackBtn ? <BackBtn navigation={navigation}/> : <HamburgerButton navigation={navigation}/>}
                {isShowBtnGroup &&
                <BtnGroup navigation={navigation} userCard={userCard} isShowSearch={isShowSearch}
                          clickOnSearchBtn={() => setIsShowSearchBar(true)}/>}
            </View>
        )
    } else {
        return (
            <View style={styles.header}>
                <SearchBar onClose={() => setIsShowSearchBar(false)} searchProducts={searchProducts} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userCard: state.userCard.userCard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchProducts: (text) => {
            dispatch(search(text))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
export const headerHeight = 90

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        height: 120
    },
    btnWrapper: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 8,
        width: 45,
        backgroundColor: 'white'
    },
    btnGroup: {
        marginRight: 10,
        flexDirection: 'row'
    },
    cartBtn: {
        marginLeft: 30,
        position: 'relative'
    },
    cartDot: {
        position: 'absolute',
        width: 6,
        height: 6,
        borderRadius: 10,
        right: 4,
        top: 4,
        backgroundColor: '#1B4965'
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1B4965',
        borderRadius: 9,
        paddingRight: 10
    },
    iconWrapper: {
        width: 40,
        height: 40,
        backgroundColor: '#1B4965',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput: {
        flex: 1,
        paddingLeft: 20,
    },
})
import React, {useEffect, useState} from 'react'

import {createStackNavigator} from "@react-navigation/stack"
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from '../screens/Login'
import {Register} from "../screens/Register";
import {ProductsMenuScreen} from "../screens/ProductsMenuScreen";
import MenuItemsScreen from "../screens/MenuItemsScreen";
import ProductItemScreen from "../screens/ProductItemScreen";
import ProductCardScreen from "../screens/ProductCardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import OrderScreen from "../screens/OrderScreen";
import OrdersScreen from "../screens/OrdersScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import MapScreen from "../screens/MapScreen";

import MyTabBar from "./components/MyTabBar";
import DrawerContent from "./components/DrawerContent";
import Header from "../components/Header";

const MenuStack = createStackNavigator()
const AuthStack = createStackNavigator()
const OrdersStack = createStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />} backBehavior="none">
            <Tab.Screen name="Menu" options={{title: 'Меню'}} component={MenuStackNavigator}/>
            <Tab.Screen name="Orders" options={{title: 'Заказы'}} component={OrdersStackNavigator}/>
            <Tab.Screen name="Profile" options={{title: 'Профиль'}} component={AuthStackNavigator}/>
        </Tab.Navigator>
    )
}

const MenuStackNavigator = ({navigation}) => {
    return (
        <MenuStack.Navigator>
            <MenuStack.Screen name="Menu" component={ProductsMenuScreen} options={{
                header: () => <Header navigation={navigation} isShowSearch={false} isShowBtnGroup={true}/>,
                headerTitle: null,
                headerTitleContainerStyle: {width: 0},
                headerStatusBarHeight: 30,
                headerTransparent: true
            }}
            />
            <MenuStack.Screen name="MenuItem" component={MenuItemsScreen} options={{
                header: () => <Header navigation={navigation} isShowBtnGroup={true} isShowBackBtn={true}
                                      isShowSearch={true}/>,
                headerTitle: '',
                headerStatusBarHeight: 30,
                headerTransparent: true
            }}
            />
            <MenuStack.Screen name="ProductItem" component={ProductItemScreen} options={{
                header: () => <Header navigation={navigation} isShowBtnGroup={false} isShowBackBtn={true}/>,
                headerTitle: '',
                headerStatusBarHeight: 30,
                headerTransparent: true,
                gestureDirection: 'horizontal-inverted',
                gestureEnabled: false,
            }}
            />
            <MenuStack.Screen name="ProductCard" component={ProductCardScreen} options={{
                header: () => <Header navigation={navigation} isShowBtnGroup={false} isShowBackBtn={true}/>,
                headerTitle: '',
                headerStatusBarHeight: 30,
                headerTransparent: true,
                gestureDirection: 'horizontal-inverted',
                gestureEnabled: false,
            }}
            />
            <MenuStack.Screen name="Order" component={OrderScreen} options={{
                header: () => <Header navigation={navigation} isShowBtnGroup={false} isShowBackBtn={true}/>,
                headerTitle: '',
                headerStatusBarHeight: 30,
                headerTransparent: true,
                gestureDirection: 'horizontal-inverted',
                gestureEnabled: false,
            }}
            />
            <MenuStack.Screen name="Favourites" component={FavouritesScreen} options={{
                header: () => <Header navigation={navigation} isShowSearch={false} isShowBtnGroup={true}/>,
                headerTitle: '',
                headerStatusBarHeight: 30,
                headerTransparent: true
            }}/>
        </MenuStack.Navigator>
    )
}

const AuthStackNavigator = ({navigation}) => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Profile" component={ProfileScreen} options={{header: () => null}}/>
        <AuthStack.Screen name="Login" component={Login} options={{header: () => null}}/>
        <AuthStack.Screen name="Register" component={Register} options={{header: () => null}}/>
    </AuthStack.Navigator>
)

const OrdersStackNavigator = ({navigation}) => (
    <OrdersStack.Navigator>
        <OrdersStack.Screen name="Orders" component={OrdersScreen} options={{
            headerLeft: () => (<Header navigation={navigation} isShowSearch={false} isShowBtnGroup={true}/>),
            headerTitle: '',
            headerStatusBarHeight: 50,
            headerTransparent: true
        }}/>
        <OrdersStack.Screen name="MapScreen" component={MapScreen} options={{
            header: () => null
        }}/>
    </OrdersStack.Navigator>
)

export const Routes = (props) => {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
                <Drawer.Screen name="Main" component={Tabs}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
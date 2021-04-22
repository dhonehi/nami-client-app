import React from 'react'

import {createStackNavigator} from "@react-navigation/stack"
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from '../screens/Login'
import {Register} from "../screens/Register";
import {ProductsMenuScreen} from "../screens/ProductsMenuScreen";
import {MenuItemsScreen} from "../screens/MenuItemsScreen";
import ProductItemScreen from "../screens/ProductItemScreen";
import ProductCardScreen from "../screens/ProductCardScreen";
import {BackBtn, HamburgerButton} from "../components/Header";
import HeaderBtnGroup from "../components/Header";
import OrderScreen from "../screens/OrderScreen";
import ProfileScreen from "../screens/ProfileScreen";

import MyTabBar from "./components/MyTabBar";
import DrawerContent from "./components/DrawerContent";

const MenuStack = createStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="Menu" options={{title: 'Меню'}} component={MenuStackNavigator}/>
            <Tab.Screen name="Profile" options={{title: 'Профиль'}} component={ProfileScreen}/>
        </Tab.Navigator>
    )
}


const MenuStackNavigator = ({navigation}) => (
    <MenuStack.Navigator>
        <MenuStack.Screen name="Menu" component={ProductsMenuScreen} options={{
            headerLeft: () => (<HamburgerButton navigation={navigation}/>),
            headerRight: () => (<HeaderBtnGroup navigation={navigation}/>),
            headerTitle: '',
            headerStatusBarHeight: 30,
            headerTransparent: true
        }}
        />
        <MenuStack.Screen name="MenuItem" component={MenuItemsScreen} options={{
            headerLeft: () => (<BackBtn navigation={navigation}/>),
            headerRight: () => (<HeaderBtnGroup navigation={navigation}/>),
            headerTitle: '',
            headerStatusBarHeight: 30,
            headerTransparent: true
        }}
        />
        <MenuStack.Screen name="ProductItem" component={ProductItemScreen} options={{
            headerLeft: () => (<BackBtn navigation={navigation}/>),
            headerTitle: '',
            headerStatusBarHeight: 30,
            headerTransparent: true,
            gestureDirection: 'horizontal-inverted',
            gestureEnabled: false,
        }}
        />
        <MenuStack.Screen name="ProductCard" component={ProductCardScreen} options={{
            headerLeft: () => (<BackBtn navigation={navigation}/>),
            headerTitle: '',
            headerStatusBarHeight: 30,
            headerTransparent: true,
            gestureDirection: 'horizontal-inverted',
            gestureEnabled: false,
        }}
        />
        <MenuStack.Screen name="Order" component={OrderScreen} options={{
            headerLeft: () => (<BackBtn navigation={navigation}/>),
            headerTitle: '',
            headerStatusBarHeight: 30,
            headerTransparent: true,
            gestureDirection: 'horizontal-inverted',
            gestureEnabled: false,
        }}
        />
    </MenuStack.Navigator>
)

const AuthStackNavigator = ({navigation}) => (
    <AuthStack.Navigator screenOptions={{
        headerLeft: () => (<HamburgerButton navigation={navigation}/>),
        headerStatusBarHeight: 50,
    }}>
        <AuthStack.Screen name="Login" component={Login}/>
        <AuthStack.Screen name="Register" component={Register}/>
    </AuthStack.Navigator>
)

export const Routes = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
                <Drawer.Screen name="Main" component={Tabs}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
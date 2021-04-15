import React from 'react'

import {createStackNavigator} from "@react-navigation/stack"
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import Login from './screens/Login'
import {Register} from "./screens/Register";
import {ProductsMenuScreen} from "./screens/ProductsMenuScreen";
import {MenuItemsScreen} from "./screens/MenuItemsScreen";
import {ProductItemScreen} from "./screens/ProductItemScreen";
import {HamburgerButton, HeaderBtnGroup} from "./components/Header";

const MenuStack = createStackNavigator()
const AuthStack = createStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator options={{lazy: true}}>
            <Tab.Screen name="Menu" component={MenuStackNavigator}
                        options={({route}) => ({
                            tabBarVisible: ((route) => {
                                const routeName = getFocusedRouteNameFromRoute(route) ?? ""

                                return routeName !== "ProductItem";
                            })(route),
                        })}/>
        </Tab.Navigator>
    )
}


const MenuStackNavigator = ({navigation}) => (
    <MenuStack.Navigator>
        <MenuStack.Screen name="Menu" component={ProductsMenuScreen} options={{
            headerLeft: () => (<HamburgerButton navigation={navigation}/>),
            headerRight: () => (<HeaderBtnGroup/>),
            headerTitle: '',
            headerStatusBarHeight: 30,
            //headerTransparent: true
        }}
        />
        <MenuStack.Screen name="MenuItem" component={MenuItemsScreen} options={{
            headerRight: () => (<HeaderBtnGroup/>),
            headerTitle: '',
            headerStatusBarHeight: 30,
            //headerTransparent: true
        }}
        />
        <MenuStack.Screen name="ProductItem" component={ProductItemScreen} options={{
            headerTitle: '',
            headerStatusBarHeight: 30,
            //headerTransparent: true
        }}
        />
    </MenuStack.Navigator>
)

const AuthStackNavigator = ({navigation}) => (
    <AuthStack.Navigator screenOptions={{
        headerLeft: () => (<HamburgerButton navigation={navigation}/>),
        headerTitle: '',
        headerStatusBarHeight: 50,
        headerTransparent: true
    }}>
        <AuthStack.Screen name="Login" component={Login}/>
        <AuthStack.Screen name="Register" component={Register}/>
    </AuthStack.Navigator>
)

export const Routes = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Menu" component={Tabs}/>
                <Drawer.Screen name="Login" component={AuthStackNavigator}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
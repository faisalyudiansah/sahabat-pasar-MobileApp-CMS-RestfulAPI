import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Login from '../screens/login'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductList from '../screens/productList';
import StoreList from '../screens/storeList';
import OrderList from '../screens/orderList';
import DetailVisit from '../screens/detailVisit';
import MonthlySales from '../screens/monthlySales';
import Settings from '../screens/settings';
import DetailOrder from '../screens/detailOrder';
import MainBottomTab from './mainBottomTab';
import CreateStore from '../screens/createStore';
import { AuthContext } from '../context/AuthContext';
import { getValueFor } from '../helpers/secureStore';
import UpdateProfile from '../screens/updateProfile';
import SummaryOrder from '../screens/summaryOrder';
import CreateOrder from '../screens/createOrder';

const Stack = createNativeStackNavigator()

const mainNavigation = () => {
  const authContext = useContext(AuthContext)

  useEffect(() => {
    getValueFor('access_token')
      .then(result => {
        // console.log(result, '<<<');
        if (result) {
          authContext.setIsSignedIn(true)
        }
      })
  }, [])

  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <Stack.Navigator>
        {
          authContext.isSignedIn ? <>
            <Stack.Screen
              name="Home"
              component={MainBottomTab}
              options={{
                headerTitle: 'Home'
              }}
            />
            <Stack.Screen
              name="ProductList"
              component={ProductList}
              options={{
                headerTitle: 'Product List'
              }}
            />
            <Stack.Screen
              name="MonthlySales"
              component={MonthlySales}
              options={{
                headerTitle: 'Sales Revenue'
              }}
            />
            <Stack.Screen
              name="DetailVisit"
              component={DetailVisit}
              options={{
                headerTitle: 'Detail Visit'
              }}
            />
            <Stack.Screen
              name="StoreList"
              component={StoreList}
              options={{
                headerTitle: 'Store List'
              }}
            />
            <Stack.Screen
              name="OrderList"
              component={OrderList}
              options={{
                headerTitle: 'Order List'
              }}
            />
            <Stack.Screen
              name="DetailOrder"
              component={DetailOrder}
              options={{
                headerTitle: 'Detail Order'
              }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                headerTitle: 'Settings'
              }}
            />
            <Stack.Screen
              name="CreateStore"
              component={CreateStore}
              options={{
                headerTitle: 'Create Store'
              }}
            />
            <Stack.Screen
              name="UpdateProfile"
              component={UpdateProfile}
              options={{
                headerTitle: 'Update Profile'
              }}
            />
            <Stack.Screen
              name="SummaryOrder"
              component={SummaryOrder}
              options={{
                headerTitle: 'Summary Order'
              }}
            />
            <Stack.Screen
              name="CreateOrder"
              component={CreateOrder}
              options={{
                headerTitle: 'Create Order'
              }}
            />
          </> : <>
            <Stack.Screen name="Login" component={Login} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default mainNavigation

const styles = StyleSheet.create({})
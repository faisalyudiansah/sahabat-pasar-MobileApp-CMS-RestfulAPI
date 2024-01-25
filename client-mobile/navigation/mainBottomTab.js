import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import { Entypo } from '@expo/vector-icons';
import Settings from '../screens/settings';
import { FontAwesome } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity } from 'react-native';
import CreateOrder from '../screens/createOrder';
import { useEffect, useState } from 'react';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function MainBottomTab() {
    const navigation = useNavigation();
    const route = useRoute();
    const focusedRoute = getFocusedRouteNameFromRoute(route);
    const [isCreateOrder, setCreateOrder] = useState(false);

    useEffect(() => {
        setCreateOrder(focusedRoute === 'CreateOrder');
    }, [focusedRoute]);

    const CustomButton = ({ onPress }) => (
        <TouchableOpacity onPress={onPress} style={{ position: 'absolute', top: -15, right: 180, alignSelf: 'center' }}>
            <Image style={{ width: 32, height: 32 }}
                source={isCreateOrder ? require('../assets/icons/closeorder.png') : require('../assets/icons/createorder.png')}
            />
        </TouchableOpacity>
    );

    return (
        <Tab.Navigator options={{}}>
            <Tab.Screen
                name="Overview"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" size={size} color={color} />
                    ),
                    tabBarShowLabel: false,
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={size} color={color} />
                    ),
                    tabBarShowLabel: false,
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="CreateOrder"
                component={CreateOrder}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarButton: (props) => (
                        <CustomButton
                            onPress={() => {
                                if (!isCreateOrder) {
                                    navigation.goBack();
                                } else {
                                    navigation.navigate('CreateOrder');
                                }
                            }}
                            {...props}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
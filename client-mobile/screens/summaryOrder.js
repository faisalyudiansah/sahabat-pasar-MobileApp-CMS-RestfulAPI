import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardSummaryOrderProduct from '../components/CardSummaryOrderProduct';
import { useContext, useState } from 'react';
import { OrderContext } from '../context/OrderContext';
import { useNavigation } from '@react-navigation/native';
import { getValueFor } from '../helpers/secureStore';

export default function SummaryOrder() {
    const orderContext = useContext(OrderContext)
    const orderData = orderContext.orderData
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()

    async function submitHandle() {
        try {
            setLoading(true);
            const token = await getValueFor('access_token')
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders`, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: 'POST',
                body: JSON.stringify(orderData)
            })
            if (!response.ok) {
                const data = await response.json();
                console.log(data);
                Alert.alert("Failed to create order", data.message);
            }
            const data = await response.json();
            console.log(data);


            Alert.alert("Successfully created order!");
            navigation.navigate('Overview')
        } catch (error) {
            console.error("Error:", error);
            Alert.alert("Error", "Failed to create order");
        } finally {
            setLoading(false);
        }

    }
    return (
        <View style={styles.outerContainer}>
            <ScrollView style={styles.componentParent}>
                <View style={styles.labelParent}>
                    <Text style={styles.label}>Orders</Text>
                    <View style={styles.frameParent}>
                        <View style={styles.parentSpaceBlock}>
                            <Text style={[styles.orderNumber, styles.contentText]}>Store Name</Text>
                            <View style={styles.mainContentParent}>
                                <Image style={styles.iconLayout} resizeMode="cover" source={require('../assets/icons/location.png')} />
                                <Text style={[styles.tokoPakBudi, styles.mainContentText]}>{orderData?.storeName}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.labelParent}>

                    <Text style={styles.label}>Products</Text>
                    {orderData.productOrder.map((order, index) => (
                        <CardSummaryOrderProduct key={index} order={order} />
                    ))}
                </View>
                <TouchableOpacity onPress={submitHandle}>
                    <View style={styles.buttonContainer}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.buttonSubmitText}>Submit</Text>
                        )}
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#1b5fe3',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5
    },
    buttonSubmitText: {
        color: '#fff',
        fontFamily: 'Mulish-Bold',
        textAlign: "center"
    },
    outerContainer: {
        overflow: "hidden",
        flex: 1,
        backgroundColor: "#fff",
        width: "100%"
    },
    componentParent: {
        backgroundColor: "#f6f9ff",
        height: "100%",
        paddingHorizontal: 33,
        paddingTop: 10,
    },
    contentText: {
        color: "#77849D",
        fontFamily: "Mulish-Regular",
        lineHeight: 18,
        fontSize: 12
    },
    parentSpaceBlock: {
        alignSelf: "stretch"
    },
    mainContentText: {
        color: "black",
        lineHeight: 20,
        fontSize: 14,
        textAlign: "left",
        fontFamily: "Mulish-Bold",
        fontWeight: "700"
    },
    textTypo: {
        fontSize: 14,
        marginTop: 4,
        alignSelf: "stretch",
        textAlign: "left",
        fontFamily: "Mulish-Bold",
    },
    label: {
        fontSize: 16,
        lineHeight: 24,
        color: "#1b5fe3",
        textAlign: "left",
        fontFamily: "Mulish-Bold",
    },
    orderNumber: {
        textAlign: "left"
    },
    mainContentParent: {
        alignItems: "center",
        marginTop: 4,
        flexDirection: "row"
    },
    orderNumberParent: {
        alignSelf: "stretch"
    },
    separatorsIcon: {
        maxWidth: "100%",
        height: 1,
        overflow: "hidden",
        width: "100%"
    },
    iconLayout: {
        width: 16,
        height: 16,
        overflow: "hidden"
    },
    tokoPakBudi: {
        marginLeft: 4
    },
    completedText: {
        color: "#1dcd9f"
    },
    pendingStatus: {
        color: "orange"
    },
    frameParent: {
        backgroundColor: "#fff",
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 1,
        width: 328,
        padding: 16,
        marginTop: 5,
        borderRadius: 8
    },
    labelParent: {
        width: "100%",
        marginBottom: 10
    }
});
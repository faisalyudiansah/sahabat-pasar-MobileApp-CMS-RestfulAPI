import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CardOrderList from "../components/CardOrderList";
import { useEffect, useState } from "react";
import { getValueFor } from "../helpers/secureStore";

export default function OrderList() {
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');


    const dataOrderList = async () => {
        try {
            const token = await getValueFor('access_token')
            if (token) {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    const data = await response.json();
                    setData(data.data)
                    setRefreshing(false);

                } else {
                    console.error('Request failed with status:', response.status);
                }
            } else {
                console.error('Access token not found.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        dataOrderList()
    }, [])

    const handleRefresh = () => {
        setRefreshing(true);
        dataOrderList();
    };

    const filteredData = data?.filter((item) =>
        item?.store?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
        <View style={styles.outerContainer}>
            <FlatList
                style={styles.componentParent}
                data={filteredData}
                keyExtractor={(item) => item._id.toString()} // Change to your unique key property
                renderItem={({ item }) => <CardOrderList data={item} />}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
                ListHeaderComponent={
                    <View style={styles.container}>
                        <View style={styles.inputContainer}>
                            <Image source={require('../assets/icons/search.png')} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Search Store Name .."
                                value={searchText}
                                onChangeText={(text) => setSearchText(text)}
                            />
                        </View>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        paddingHorizontal: 5,
        flexDirection: "row"
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        backgroundColor: "#C3D7FF",
        borderRadius: 5,
        height: 35
    },
    icon: {
        width: 20,
        height: 20,
        marginHorizontal: 10,
    },
    input: {
        height: 40,
        padding: 10,
        width: 300
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
        paddingHorizontal: 25,
        paddingTop: 10,
    },
});
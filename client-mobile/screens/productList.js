import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, FlatList, RefreshControl } from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../style/GlobalStyles";
import CardProductList from "../components/CardProductList";
import { useEffect, useState } from "react";
import { getValueFor } from "../helpers/secureStore";

const ProductList = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchProductData = async () => {
        try {
            const token = await getValueFor('access_token');
            if (token) {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/products?search=${searchQuery}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                });
                if (response.ok) {
                    const data = await response.json();
                    setData(data);
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
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchProductData();
    };

    useEffect(() => {
        fetchProductData();
    }, [searchQuery]);

    const renderItem = ({ item }) => (
        <CardProductList data={item} />
    );
    return (
        <View style={styles.outerContainer}>
            <View style={styles.componentParent}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Image source={require('../assets/icons/search.png')} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Search Product .."
                            onChangeText={(text) => {
                                setSearchQuery(text);
                            }}
                        />
                    </View>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                />
            </View>
        </View>
    )
}

export default ProductList

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
        height: 35,
        marginHorizontal: 20
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
    componentParent: {
        paddingTop: 10,
        backgroundColor: "#f6f9ff",
        width: "100%",
        height: "100%"
    },
    outerContainer: {
        overflow: "hidden",
        flex: 1,
        backgroundColor: "#f6f9ff",
        width: "100%",
        height: "100%"
    },
});
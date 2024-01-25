import { FlatList, Image, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CardStoreList from "../components/CardStoreList";
import { useEffect, useState } from "react";

export default function StoreList({ navigation }) {
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false); // State for refreshing
    const [searchQuery, setSearchQuery] = useState(''); // State for search input

    const fetchStoreData = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/stores/mobile?search=${searchQuery}`, {
                method: 'GET'
            });

            if (response.ok) {
                const result = await response.json();
                setData(result);
                setRefreshing(false);
            } else {
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStoreData();
    }, [searchQuery]);

    const renderItem = ({ item }) => (
        <CardStoreList data={item} />
    );
    return (
        <View style={styles.outerContainer}>
            <View style={styles.componentParent}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Image source={require('../assets/icons/search.png')} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Search Store .."
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateStore')}>
                        <Image source={require('../assets/icons/createblue.png')} style={styles.iconCreate} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={fetchStoreData} />
                    }
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        backgroundColor: "#C3D7FF",
        borderRadius: 5,
        height: 35,
        marginRight: 5
    },
    icon: {
        width: 20,
        height: 20,
        marginHorizontal: 10,
    },
    iconCreate: {
        width: 40,
        height: 40,
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
        width: "100%",
        paddingTop: 10,
        paddingBottom: 25,
        position: "absolute",
        overflow: "hidden"
    },
    storeText: {
        fontFamily: "Mulish-Bold",
        fontWeight: "700",
        lineHeight: 25,
        textAlign: "left",
        color: "#fff",
        fontSize: 14
    },
    storeList: {
        fontSize: 24,
        color: "#000"
    },
    createNewStoreButton: {
        backgroundColor: "#1b5fe3",
        borderRadius: 5,
        overflow: "hidden"
    },
});

import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CardHomeOverview from "../components/CardHomeOverview";
import CardHomeScheduleVisit from "../components/CardHomeScheduleVisit";
import { useContext, useEffect, useState } from "react";
import { getValueFor } from "../helpers/secureStore";
import { UserContext } from "../context/UserContext";


export default function Home({ navigation }) {
    // const [data, setData] = useState([])
    const userContext = useContext(UserContext)
    const data = userContext.userData

    const dataUser = async () => {
        try {
            const token = await getValueFor('access_token')
            if (token) {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/userprofile`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    const data = await response.json();
                    // setData(data)
                    userContext.setUserData(data)

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
        // console.log(userData);
        dataUser()
    }, [])

    const [schedule, setSchedule] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    const dataSchedule = async () => {
        try {
            const token = await getValueFor('access_token');
            if (token) {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/schedules/myschedule`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const result = await response.json();
                    setSchedule(result);
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
        dataSchedule();
        setRefreshing(false);
    };

    useEffect(() => {
        dataSchedule();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.scheduleParentCard}>
            <CardHomeScheduleVisit data={item} />
        </View>

    );

    return (
        <FlatList
            style={styles.outerContainer}
            ListHeaderComponent={
                <>
                    <View style={styles.containerSalesName}>
                        <Image style={styles.notifIconPosition} resizeMode="cover" source={{ uri: data.photo }} />
                        <Text style={styles.salesNameText}>{data.name}</Text>
                        <View style={styles.headerIconContainer}>
                            {/* <View style={styles.iconsParent}>
                                <Image style={styles.notifIconLayout} resizeMode="cover" source={require('../assets/icons/notif.png')} />
                                <View style={styles.counterLayout}>
                                    <Image style={styles.circleCounter} resizeMode="cover" source={require('../assets/icons/counter.png')} />
                                    <Text style={styles.counterText}>1</Text>
                                </View>
                            </View> */}
                            <TouchableOpacity onPress={() => navigation.navigate('Settings', { data: data })}>
                                <Image style={styles.settingsLineIcon} resizeMode="cover" source={require('../assets/icons/settings.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.componentParent}>
                        <Text style={styles.headerTitleOverview}>Sales Overview</Text>
                        <View style={styles.overviewParent}>
                            <CardHomeOverview />
                        </View>
                    </View>
                    <Text style={styles.headerTitle}>Scheduled Visit</Text>

                </>
            }
            data={schedule}
            keyExtractor={(item) => item._id.toString()} // Update with your unique key property
            renderItem={renderItem}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
        />
    )
}
const styles = StyleSheet.create({

    outerContainer: {
        overflow: "hidden",
        flex: 1,
        backgroundColor: "#fff",
        width: "100%"
    },
    overviewParent: {
        backgroundColor: "#f6f9ff",
        height: "100%",
        paddingHorizontal: 25,
        flex: 1
    },
    scheduleParent: {
        backgroundColor: "#f6f9ff",
        paddingHorizontal: 25,
    },
    scheduleParentCard: {
        gap: 50
    },
    componentParent: {
        backgroundColor: "#f6f9ff",
        flex: 1,
        height: 400,
        width: "100%",
        paddingHorizontal: 25,
        paddingTop: 15,
    },
    headerTitleOverview: {
        color: "#000",
        textAlign: "left",
        fontSize: 16,
        fontFamily: "Mulish-Bold",
        width: "100%",
    },
    containerSalesName: {
        alignItems: "center",
        flexDirection: "row",
        height: 50,
        paddingHorizontal: 30
    },
    headerIconContainer: {
        width: 182,
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        height: 50,
    },
    iconsParent: {
        marginLeft: 8,
        height: 24,
        width: 24,
    },
    notifIconPosition: {
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        borderRadius: 50
    },
    notifIconLayout: {
        height: 24,
        width: 24,
        overflow: "hidden",
        left: 0,
        top: 0,
        position: "absolute"
    },
    counterLayout: {
        height: 14,
        width: "100%",
        top: 0,
        position: "absolute",
    },
    circleCounter: {
        height: 14,
        width: 14,
        top: 0,
        position: "absolute",
        left: 12
    },
    counterText: {
        top: 1,
        left: 17,
        fontSize: 8,
        fontFamily: "Mulish-Bold",
        color: "rgba(255, 255, 255, 0.9)",
        textAlign: "left",
        position: "absolute"
    },
    salesNameText: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: "600",
        fontFamily: "Mulish-SemiBold",
        marginLeft: 10,
        textAlign: "left"
    },

    settingsLineIcon: {
        overflow: "hidden",
        marginLeft: 8,
    },
    groupParent: {
        flex: 1,
        width: "100%",
        height: 226,
    },
    headerTitleContainer: {
        backgroundColor: "red",
    },
    headerTitle: {
        marginTop: 10,
        marginLeft: 25,
        fontSize: 16,
        fontFamily: "Mulish-Bold",
        textAlign: "left",
        color: "black",
    },

});
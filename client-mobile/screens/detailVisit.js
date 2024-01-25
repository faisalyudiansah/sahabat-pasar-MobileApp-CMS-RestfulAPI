import { ActivityIndicator, Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatTimestampToDateString, formatTimestampToTimeString } from "../helpers/formatter";
import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import { getValueFor } from "../helpers/secureStore";
import { useNavigation } from "@react-navigation/native";

export default function DetailVisit({ route }) {
    const { data } = route.params
    const navigation = useNavigation()
    const openGoogleMaps = (latitude, longitude) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };

    const handleCallPress = () => {
        const phoneUrl = `tel:${data.storeInformations.mobilePhone}`;

        Linking.canOpenURL(phoneUrl).then((supported) => {
            if (supported) {
                return Linking.openURL(phoneUrl);
            } else {
                console.error('Phone number is not supported');
            }
        });
    };


    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const fetchUserLocation = async () => {
        try {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                throw new Error("Location permission not granted");
            }

            const location = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true
            });
            setLongitude(`${location.coords.longitude}`);
            setLatitude(`${location.coords.latitude}`);
        } catch (error) {
            console.error("Error fetching user location:", error);
        }
    };

    useEffect(() => {
        fetchUserLocation()
        console.log(longitude, '<<<< longitude');
        console.log(latitude, '<<<< latitude');
    }, []);

    const updateLocation = async () => {
        try {
            const token = await getValueFor('access_token')
            setIsLoading(true);
            const input = {
                longitude,
                latitude
            }
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/schedules/status/${data._id}`, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: 'PUT',
                body: JSON.stringify(input)
            })
            if (!response.ok) {
                const data = await response.json();
                Alert.alert("Failed to checked in", data.message);
            }
            if (response.ok) {
                Alert.alert("You are checked in!");
                navigation.navigate('Overview')
            }
        } catch (error) {
            console.error("Error during checked in:", error);
            Alert.alert("Failed to checked in", "An error occurred while attempting to checked in.");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <View style={styles.wireframesItemList}>
            <View style={styles.mapsContainer}>
                <Image style={styles.maps} contentMode="cover" source={require('../assets/icons/map.png')} />
            </View>
            <View style={styles.rectangleOuterContainer} />
            <View style={styles.contentParent}>
                <View style={styles.contentFrame}>
                    <View style={styles.contentTitleParent}>
                        <Text style={styles.contentHeaderTitle}>{data.storeInformations.name}</Text>
                        <View style={styles.statusParent}>
                            <Text style={[data.isCompleted ? styles.status : styles.pending]}>
                                {data.isCompleted ? 'Completed' : 'Pending'}
                            </Text>
                        </View>
                    </View>
                    <Image style={styles.separatorsIcon} resizeMode="cover" source={require('../assets/icons/separators.png')} />
                    <View style={[styles.subContentFrame, styles.ParentFlexBox]}>
                        <Text style={styles.contentLeft}>Date</Text>
                        <Text style={styles.contentRight}>{formatTimestampToDateString(data.time)}</Text>
                    </View>
                    <View style={[styles.subContentFrame, styles.ParentFlexBox]}>
                        <Text style={styles.contentLeft}>Time</Text>
                        <Text style={styles.contentRight}>{formatTimestampToTimeString(data.time)}</Text>
                    </View>
                    <View style={[styles.subContentFrame, styles.ParentFlexBox]}>
                        <Text style={styles.contentLeft}>Address</Text>
                        <Text style={styles.contentRightAddress}>{data.storeInformations.address}</Text>
                    </View>
                    <Image style={styles.separatorsIcon} resizeMode="cover" source={require('../assets/icons/separators.png')} />
                    <View style={styles.ParentFlexBox}>
                        <TouchableOpacity onPress={handleCallPress}>
                            <View style={styles.iconParent}>
                                <Image style={styles.iconLayout} resizeMode="cover" source={require('../assets/icons/phoneprimary.png')} />
                                <Text style={styles.iconText}>Call</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            openGoogleMaps(
                                data.storeInformations.location.coordinates[1],
                                data.storeInformations.location.coordinates[0]
                            );
                        }}>
                            <View style={[styles.directionLineParent, styles.iconParent]}>
                                <Image style={styles.iconLayout} resizeMode="cover" source={require('../assets/icons/direction.png')} />
                                <Text style={styles.iconText}>Direction</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.directionLineParent, styles.iconParent]}>
                            <Image style={styles.iconLayout} resizeMode="cover" source={require('../assets/icons/report.png')} />
                            <Text style={styles.iconText}>Report</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={updateLocation}>
                    <View style={styles.buttonParent}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" /> // Display activity indicator while loading
                        ) : (
                            <>
                                <View style={styles.textParent} />
                                <Text style={styles.buttonText}>Im on location</Text>
                            </>
                        )}
                    </View>
                </TouchableOpacity>

                <Text style={styles.moreInfoText}>{`Jangan lupa untuk memencet tombol
“im on location” ketika sudah sampai lokasi`}</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    wireframesItemList: {
        height: 852,
        overflow: "hidden",
        width: "100%",
        flex: 1,
        backgroundColor: "#fff"
    },
    groupChildPosition: {
        left: 0,
        top: 0,
        position: "absolute",
        alignItems: "flex-end",
    },
    contentParent: {
        top: 169,
        left: 33,
        alignItems: "center",
        position: "absolute",
    },
    contentFrame: {
        borderRadius: 8,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowRadius: 2,
        elevation: 2,
        width: 328,
        height: "auto",
        padding: 16,
        alignItems: "center",
        backgroundColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
    },
    contentTitleParent: {
        flexDirection: "row",
        alignItems: "center",
        width: 300,
    },
    ParentFlexBox: {
        flexDirection: "row",
        marginTop: 8
    },
    contentRight: {
        textAlign: "right",
        color: "#77849D",
        fontFamily: "Mulish-Regular",
        lineHeight: 20,
        fontSize: 12
    },
    iconParent: {
        justifyContent: "center",
        height: 56,
        width: 56,
        alignItems: "center",
    },
    groupChildLayout: {

    },
    maps: {
        height: "100%",
        top: "0%",
        right: "0%",
        bottom: "0%",
        left: "0%",
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden",
        width: "100%"
    },
    mapsContainer: {
        width: 393,
        height: 225
    },
    rectangleOuterContainer: {
        backgroundColor: "#f6f9ff",
        width: "100%",
        height: "100%"
    },
    contentHeaderTitle: {
        fontSize: 14,
        textAlign: "left",
        fontFamily: "Mulish-Bold",
        color: "black",
        marginBottom: 6,
        width: 200
    },
    statusParent: {
        width: 100,
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 3
    },
    status: {
        color: "#1dcd9f",
        fontFamily: "Mulish-Bold",
        fontSize: 12
    },
    pending: {
        color: "#f4b718",
        fontFamily: "Mulish-Bold",
        fontSize: 12
    },
    separatorsIcon: {
        height: 1,
        marginTop: 12,
        maxWidth: "100%",
        overflow: "hidden",
        width: "100%"
    },
    contentLeft: {
        color: "#77849D",
        fontFamily: "Mulish-Regular",
        fontSize: 12,
        lineHeight: 20,
        textAlign: "left",
        width: 80
    },
    subContentFrame: {
        justifyContent: "space-between",
        alignSelf: "stretch",
        flexDirection: "row"
    },
    contentRightAddress: {
        flex: 1,
        textAlign: "right",
        color: "#77849D",
        fontFamily: "Mulish-Regular",
        lineHeight: 20,
        fontSize: 12
    },
    iconLayout: {
        width: 24,
        height: 24,
        overflow: "hidden"
    },
    iconText: {
        lineHeight: 18,
        marginTop: 4,
        textAlign: "center",
        color: "black",
        fontSize: 12,
        fontFamily: "Mulish-Regular"
    },
    directionLineParent: {
        marginLeft: 19
    },

    textParent: {
        borderRadius: 15,
        backgroundColor: "#1B5FE3",
        shadowColor: "rgba(255, 255, 255, 0)",
        shadowRadius: 10,
        elevation: 10,
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 2
        },
        left: 0,
        top: 0,
        position: "absolute",
        height: 42,
        width: 132
    },
    buttonText: {
        top: 10,
        left: 26,
        lineHeight: 22,
        color: "#fff",
        fontSize: 12,
        textAlign: "left",
        fontFamily: "Mulish-Bold",
        fontWeight: "700",
        position: "absolute"
    },
    buttonParent: {
        marginTop: 20,
        height: 42,
        width: 132
    },
    moreInfoText: {
        color: "#1B5FE3",
        marginTop: 20,
        lineHeight: 20,
        textAlign: "center",
        fontSize: 12,
        fontFamily: "Mulish-Regular"
    },

});
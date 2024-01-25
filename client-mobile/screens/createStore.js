import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Image, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getValueFor } from "../helpers/secureStore";

export default function CreateStore({ navigation }) {
    const [name, setName] = useState("Toko Terbaru");
    const [address, setAddress] = useState("Jl. baru no 3");
    const [ownerName, setOwnerName] = useState("Pak Baru Bikin");
    const [mobilePhone, setMobilePhone] = useState("0855666698");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [image, setImage] = useState(null);
    const [markerCoordinate, setMarkerCoordinate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleFormSubmit = async () => {
        try {
            setLoading(true);
            const token = await getValueFor('access_token')
            let localUri = image;
            let filename = localUri.split("/").pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            const formData = new FormData();
            formData.append("name", name);
            formData.append("address", address);
            formData.append("ownerName", ownerName);
            formData.append("mobilePhone", mobilePhone);
            formData.append("longitude", longitude);
            formData.append("latitude", latitude);
            formData.append("photo", { uri: localUri, name: filename, type });
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/stores`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    },
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                const data = await response.json();
                console.log(data, '<<<<<');
                Alert.alert("Failed to create store", data.message);
            }

            const data = await response.json();
            console.log(data);
            Alert.alert("Success!", "Created store");
            clearForm()
            navigation.navigate('StoreList')
        } catch (error) {
            console.error("Error:", error);
            Alert.alert("Error", "Failed to create store");
        } finally {
            setLoading(false);
        }
    };

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
            setMarkerCoordinate({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        } catch (error) {
            console.error("Error fetching user location:", error);
        }
    };

    useEffect(() => {
        fetchUserLocation()
        console.log(longitude, '<<<< longitude');
        console.log(latitude, '<<<< latitude');
    }, []);

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setMarkerCoordinate(coordinate);
        setModalVisible(true);
    };

    const setStoreLocation = () => {
        if (markerCoordinate) {
            console.log(markerCoordinate.longitude, '<<<');
            setLongitude(markerCoordinate.longitude)
            setLatitude(markerCoordinate.latitude)
        }
        setModalVisible(false);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    function clearForm() {
        setName('')
        setAddress('')
        setMobilePhone('');
        setLongitude('');
        setLatitude('');
        setImage(null);
    }
    return (
        <View style={styles.outerContainer}>
            <ScrollView style={styles.componentParent}>
                <View style={styles.container}>
                    <Text style={styles.label}>Store Name</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Toko Pak Budi"
                            value={name}
                            onChangeText={(text) => {
                                setName(text)
                            }}
                        />
                    </View>
                    <Text style={styles.label}>Address</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Jl. Senen Raya no 90"
                            value={address}
                            onChangeText={(text) => {
                                setAddress(text)
                            }}
                        />
                    </View>
                    <Text style={styles.label}>Owner's Name</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Pak Bowo"
                            value={ownerName}
                            onChangeText={(text) => {
                                setOwnerName(text)
                            }}
                        />
                    </View>
                    <Text style={styles.label}>Mobile Phone</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="0811111999"
                            keyboardType="numeric"
                            value={mobilePhone}
                            onChangeText={(text) => {
                                setMobilePhone(text)
                            }}
                        />
                    </View>

                    <Text style={styles.label}>Locate the store</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.uploadImageText}
                            editable={false}
                        >
                            <Text>{longitude}   </Text>
                            <Text>{latitude}</Text>
                        </TextInput>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonSubmitText}>Open Map</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.label}>Upload Image</Text>
                    <View style={styles.inputContainer}>
                        <Text
                            style={styles.uploadImageText}
                        > Upload your Image
                        </Text>
                        <TouchableOpacity onPress={pickImage}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonSubmitText}>Browse</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                    <TouchableOpacity onPress={handleFormSubmit}>
                        <View style={styles.buttonContainerUpload}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.buttonSubmitText}>Submit</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal animationType="slide" transparent={true} visible={modalVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={closeModal} style={styles.iconButtonClose}>
                                <Image style={styles.iconLayoutClose} contentMode="cover" source={require('../assets/icons/closemodal.png')} />
                            </TouchableOpacity>
                            <MapView
                                style={styles.mapInModal}
                                onPress={handleMapPress}
                                initialRegion={{
                                    latitude: markerCoordinate?.latitude || latitude,
                                    longitude: markerCoordinate?.longitude || longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                {markerCoordinate && (
                                    <Marker
                                        coordinate={markerCoordinate}
                                        title="Selected Location"
                                    />
                                )}
                            </MapView>
                            <TouchableOpacity onPress={fetchUserLocation} style={styles.iconButton}>
                                <Image style={styles.iconLayout} contentMode="cover" source={require('../assets/icons/mylocation.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={setStoreLocation} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Set Store Location</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    label: {
        fontSize: 14,
        lineHeight: 24,
        color: "#1b5fe3",
        textAlign: "left",
        fontFamily: "Mulish-Regular",
        marginBottom: 4,
        marginTop: 8,
    },
    map: {
        height: 200,
        marginBottom: 16,
    },
    iconLayout: {
        width: 40,
        height: 40,
    },
    iconButton: {
        bottom: 15,
        left: 305
    },
    iconLayoutClose: {
        width: 30,
        height: 30,
    },
    iconButtonClose: {
        top: 40,
        left: 305
    },
    image: {
        left: 20,
        width: 280,
        height: 120,
        marginTop: 5,
        borderRadius: 8
    },
    inputContainer: {
        backgroundColor: "#fff",
        borderColor: '#e8e8e8',
        borderRadius: 5,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 1,
        justifyContent: 'space-between',
    },
    inputText: {
        flex: 1,
        fontSize: 14,
        color: "black",
        textAlign: "left",
        fontFamily: "Mulish-Regular",
        height: 30,
        paddingHorizontal: 10,
    },
    uploadImageText: {
        fontSize: 14,
        color: "black",
        textAlign: "left",
        fontFamily: "Mulish-Regular",
        height: 30,
        paddingHorizontal: 10,
        paddingTop: 5
    },
    buttonContainer: {
        backgroundColor: '#1b5fe3',
        padding: 10,
        borderRadius: 5,
    },
    buttonContainerUpload: {
        backgroundColor: '#1b5fe3',
        padding: 10,
        borderRadius: 5,
        marginTop: 30,
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
        paddingHorizontal: 25,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        flex: 1,
        height: "100%",
        width: "100%",
    },
    mapInModal: {
        top: 50,
        height: 600,
        marginBottom: 16,
        borderRadius: 8,
        overflow: "hidden",
    },
    closeButton: {
        backgroundColor: "#1b5fe3",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    closeButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
    },
});
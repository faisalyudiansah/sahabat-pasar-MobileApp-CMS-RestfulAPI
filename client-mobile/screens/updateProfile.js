import { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { getValueFor } from "../helpers/secureStore";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";


export default function UpdateProfile({ route }) {
    const userContext = useContext(UserContext)
    const dataUser = userContext.userData
    const navigation = useNavigation()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobilePhone, setMobilePhone] = useState('')
    const [address, setAddress] = useState('')
    const [photo, setPhoto] = useState('')
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
            setPhoto(result.assets[0].uri);
        }
    };


    const handleFormSubmit = async () => {
        try {
            setLoading(true);
            const token = await getValueFor('access_token')
            let localUri = photo;
            let filename = localUri.split("/").pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("mobilePhone", mobilePhone);
            formData.append("address", address);
            formData.append("photo", { uri: localUri, name: filename, type });
            const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/users/${dataUser._id}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                    method: "PUT",
                    body: formData,
                }
            );

            if (!response.ok) {
                const result = await response.json();
                console.log(result);
                Alert.alert("Failed to update profile", result.message);
            }

            const result = await response.json();
            console.log(result);
            Alert.alert("Success!", "Updated your profile");
            userContext.setUserData(result)

            navigation.navigate('Settings')
        } catch (error) {
            console.error("Error:", error);
            Alert.alert("Error", "Failed to update your profile");
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.outerContainer}>
            <ScrollView style={styles.componentParent}>
                <View style={styles.container}>
                    <Text style={styles.label}>Name</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Lionel Messi"
                            value={name}
                            onChangeText={(text) => {
                                setName(text)
                            }}
                        />
                    </View>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="messi@mail.com"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text)
                            }}
                        />
                    </View>
                    <Text style={styles.label}>Address</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Jl. Bondon no 20"
                            value={address}
                            onChangeText={(text) => {
                                setAddress(text)
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
                    {photo && <Image source={{ uri: photo }} style={styles.image} />}
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
        left: 100,
        width: 120,
        height: 120,
        marginTop: 5,
        borderRadius: 75
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
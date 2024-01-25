import { useContext, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { save } from "../helpers/secureStore";

export default function Login({ navigation }) {
    const authContext = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("Messi@mail.com")
    const [password, setPassword] = useState("12345")

    const handleSubmitLogin = async () => {
        try {
            setIsLoading(true);
            const input = {
                email,
                password
            }
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/login`, {
                headers: {
                    'Content-Type': "application/json"
                },
                method: 'POST',
                body: JSON.stringify(input)
            })
            if (!response.ok) {
                const data = await response.json();
                Alert.alert("Failed to login", data.message);
            }
            const data = await response.json();
            console.log(data.access_token);
            if (data) {
                save('access_token', data.access_token)
                    .then(() => {
                        authContext.setIsSignedIn(true)
                    });
            }
            Alert.alert("Successfully Logged In!");

            navigation.navigate('Overview')
        } catch (error) {
            console.error("Error during login:", error);
            Alert.alert("Failed to login", "An error occurred while attempting to log in.");
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logoImage} source={require('../assets/logosapa.png')} />
            <Text style={styles.logo}>Login</Text>
            <View style={styles.inputGroup}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={(text) => {
                            setEmail(text)
                        }}
                        value={email}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(text) => {
                            setPassword(text)
                        }}
                        value={password}
                    />
                </View>
            </View>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.proceedButton}> */}
            <TouchableOpacity
                onPress={handleSubmitLogin}
                style={styles.proceedButton}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#1b5fe3" />
                ) : (
                    <Text style={styles.proceedText}>Login</Text>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
        marginBottom: 20,
    },
    logoImage: {
        width: 55,
        height: 92,
        marginBottom: 20,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
        borderRadius: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        width: 23,
        height: 22,
        backgroundColor: '#d9d9d9',
        marginRight: 10,
    },
    forgotPassword: {
        fontSize: 12,
        color: '#1b5fe3',
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    proceedButton: {
        backgroundColor: '#1b5fe3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        height: 50,
        width: '100%',
    },
    proceedText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '700',
        lineHeight: 22
    },
});

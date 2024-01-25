import { useContext, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { deleteStore } from "../helpers/secureStore";
import { AuthContext } from "../context/AuthContext";
import { formatDate } from "../helpers/formatter";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

export default function Settings({ route }) {
    // const { data } = route.params
    // console.log(data, '<<<<< ini data ke settings');
    const userContext = useContext(UserContext)
    const dataUser = userContext.userData
    const authContext = useContext(AuthContext)
    const navigation = useNavigation()
    const [isExpanded, setIsExpanded] = useState(false);

    const handleArrowPress = () => {
        // Toggle the expansion state
        setIsExpanded(!isExpanded);
    };
    return (
        <View style={styles.settings}>
            <ScrollView style={styles.frameParent}>
                <View style={styles.frameWrapper}>
                    <View style={styles.frameGroup}>
                        <View style={styles.frameContainer}>
                            <Image style={styles.profilePicture} contentMode="cover" source={{ uri: dataUser.photo }} />

                            <View style={styles.userNameWrapper}>
                                <Text style={styles.userName}>{dataUser.name}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleArrowPress}>
                            <Image style={styles.arrowUpSLineIcon} contentMode="cover" source={isExpanded ? require('../assets/icons/arrowup.png') : require('../assets/icons/arrowdown.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    {isExpanded && (
                        <>
                            <View style={[styles.textField, styles.textFieldSpaceBlock]}>
                                <Text style={[styles.label, styles.labelTypo]}>Email</Text>
                                <View style={[styles.labelinput, styles.labelinputFlexBox]}>
                                    <Text style={styles.label1}>{dataUser.email}</Text>
                                </View>
                            </View>
                            <View style={[styles.textField, styles.textFieldSpaceBlock]}>
                                <Text style={[styles.label, styles.labelTypo]}>Mobile Phone</Text>
                                <View style={[styles.labelinput, styles.labelinputFlexBox]}>
                                    <Text style={styles.label1}>{dataUser.mobilePhone}</Text>
                                </View>
                            </View>
                            <View style={[styles.textField, styles.textFieldSpaceBlock]}>
                                <Text style={[styles.label, styles.labelTypo]}>Joined Date</Text>
                                <View style={[styles.labelinput, styles.labelinputFlexBox]}>
                                    <Text style={styles.label1}>{formatDate(dataUser.joinDate)}</Text>
                                </View>
                            </View>
                            <View style={[styles.textField, styles.textFieldSpaceBlock]}>
                                <Text style={[styles.label, styles.labelTypo]}>Address</Text>
                                <View style={[styles.labelinput, styles.labelinputFlexBox]}>
                                    <Text style={styles.label1}>{dataUser.address}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('UpdateProfile')
                            }}>
                                <View style={[styles.buttonBasicWrapper, styles.textFieldSpaceBlock]}>
                                    <View style={[styles.buttonBasic, styles.frameParentFlexBox]}>
                                        <Text style={styles.label8}>Update Profile</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </>
                    )}
                </View>
                <Image style={[styles.separatorsIcon, styles.artikelCardSpaceBlock]} contentMode="cover" source={require('../assets/icons/separators.png')} />
                <TouchableOpacity>
                    <View style={[styles.artikelCard, styles.artikelCardSpaceBlock]}>
                        <Image style={styles.arrowUpSLineIcon} contentMode="cover" source={require('../assets/icons/info.png')} />
                        <Text style={[styles.termsOfService, styles.termsOfServiceFlexBox]}>{`Terms of Service `}</Text>
                    </View>
                </TouchableOpacity>
                <Image style={[styles.separatorsIcon, styles.artikelCardSpaceBlock]} contentMode="cover" source={require('../assets/icons/separators.png')} />
                <TouchableOpacity>
                    <View style={[styles.artikelCard, styles.artikelCardSpaceBlock]}>
                        <Image style={styles.arrowUpSLineIcon} contentMode="cover" source={require('../assets/icons/feedback.png')} />
                        <Text style={[styles.termsOfService, styles.termsOfServiceFlexBox]}>Feedback</Text>
                    </View>
                </TouchableOpacity>
                <Image style={[styles.separatorsIcon, styles.artikelCardSpaceBlock]} contentMode="cover" source={require('../assets/icons/separators.png')} />
                <TouchableOpacity>
                    <View style={[styles.artikelCard, styles.artikelCardSpaceBlock]}>
                        <Image style={styles.arrowUpSLineIcon} contentMode="cover" source={require('../assets/icons/info.png')} />
                        <Text style={[styles.termsOfService, styles.termsOfServiceFlexBox]}>Privacy Policy</Text>
                    </View>
                </TouchableOpacity>
                <Image style={[styles.separatorsIcon, styles.artikelCardSpaceBlock]} contentMode="cover" source={require('../assets/icons/separators.png')} />
                <TouchableOpacity onPress={() => {
                    deleteStore('access_token')
                    authContext.setIsSignedIn(false)
                }}>
                    <View style={[styles.artikelCard, styles.artikelCardSpaceBlock]}>
                        <Image style={styles.arrowUpSLineIcon} contentMode="cover" source={require('../assets/icons/logout.png')} />
                        <Text style={[styles.termsOfService, styles.termsOfServiceFlexBox]}>Log out</Text>
                    </View>
                </TouchableOpacity>
                <Image style={[styles.separatorsIcon, styles.artikelCardSpaceBlock]} contentMode="cover" source={require('../assets/icons/separators.png')} />
                <View style={[styles.artikelCardWrapper, styles.artikelCardSpaceBlock]}>
                    <View style={styles.artikelCard4}>
                        <Text style={[styles.sapaVersion100, styles.termsOfServiceFlexBox]}>Sapa Version 1.0.0</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    labelinputFlexBox: {
        alignSelf: "stretch",
        justifyContent: "center"
    },
    textFieldSpaceBlock: {
        marginTop: 16,
        alignSelf: "stretch"
    },
    labelTypo: {
        lineHeight: 20,
        textAlign: "left",
        fontFamily: "Mulish-Regular",
        fontWeight: "700",
        fontSize: 12
    },
    label: {
        color: "black"
    },
    label1: {
        fontSize: 14,
        lineHeight: 24,
        fontFamily: "Mulish-Regular",
        color: "#77849D",
        textAlign: "left"
    },
    labelinput: {
        borderRadius: 8,
        backgroundColor: "#F6F9FF",
        borderStyle: "solid",
        borderColor: "#F6F9FF",
        borderWidth: 1,
        height: 48,
        padding: 5,
        marginTop: 4,
        justifyContent: "center"
    },
    textField: {
        justifyContent: "center",
        overflow: "hidden"
    },
    label8: {
        color: "#fff",
        fontFamily: "Mulish-Bold",
        lineHeight: 20,
        textAlign: "left",
        fontSize: 12
    },
    buttonBasic: {
        backgroundColor: "#1b5fe3",
        paddingHorizontal: 24,
        paddingVertical: 10,
        justifyContent: "center",
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderRadius: 8
    },
    buttonBasicWrapper: {
        flexDirection: "row"
    },
    artikelCardSpaceBlock: {
        marginTop: 20,
        width: 312
    },
    termsOfServiceFlexBox: {
        lineHeight: 20,
        textAlign: "left",
        color: "black",
        fontSize: 12,
        flex: 1
    },
    profilePicture: {
        borderRadius: 50,
        width: 56,
        height: 56,
        overflow: "hidden"
    },
    userName: {
        lineHeight: 18,
        textAlign: "left",
        color: "black",
        fontSize: 12,
        fontFamily: "Mulish-Bold",
        fontWeight: "700"
    },
    userNameWrapper: {
        marginLeft: 12,
        justifyContent: "center",
        alignSelf: "stretch"
    },
    frameContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    arrowUpSLineIcon: {
        width: 24,
        height: 24,
        overflow: "hidden"
    },
    frameGroup: {
        width: 296,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    frameWrapper: {
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 1,
        width: 328,
        padding: 16,
        alignItems: "center",
        backgroundColor: "#fff",
    },
    separatorsIcon: {
        height: 1
    },
    termsOfService: {
        marginLeft: 16,
        fontFamily: "Mulish-Regular",
        fontWeight: "700",
        lineHeight: 20
    },
    artikelCard: {
        flexDirection: "row",
        alignItems: "center"
    },
    sapaVersion100: {
        fontFamily: "Mulish-Regular"
    },
    artikelCard4: {
        alignSelf: "stretch",
        flexDirection: "row"
    },
    artikelCardWrapper: {
        height: 32,
        justifyContent: "center"
    },
    frameParent: {
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#f6f9ff",
        width: 393,
        height: "100%",
        paddingHorizontal: 32,
        paddingVertical: 20,
        overflow: "hidden"
    },
    settings: {
        borderRadius: 20,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        flex: 1,
        backgroundColor: "#fff"
    }
});

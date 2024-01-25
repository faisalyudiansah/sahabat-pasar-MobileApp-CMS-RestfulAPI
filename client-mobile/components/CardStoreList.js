import { Image, StyleSheet, Text, View, title } from "react-native";

export default function CardStoreList({ data }) {
    return (
        <>
            <View style={styles.rectangleShadowBox}>
                <View style={styles.frameParent}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.imageCard} source={{
                            uri: data.photo,
                        }} />
                    </View>
                    <View style={styles.headerContainer}>
                        <View style={styles.frameGroup}>
                            <View style={styles.cardTitle}>
                                <View style={styles.titleParent}>
                                    <Image style={styles.iconLayout} contentMode="cover" source={require('../assets/icons/location.png')} />
                                    <Text style={styles.headerCardText}>{data.name}</Text>
                                </View>
                                <View style={styles.verifiedParent}>
                                    {data.status === 'unverified' ? (
                                        <>
                                            <Text style={styles.unverified}>unverified</Text>
                                            <Image style={styles.iconLayout} resizeMode="cover" source={require('../assets/icons/warning.png')} />
                                        </>
                                    ) : (
                                        <>
                                            <Text style={styles.verifiedText}>{data.status}</Text>
                                            <Image style={styles.iconLayout} resizeMode="cover" source={require('../assets/icons/verified.png')} />
                                        </>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                    <Image style={styles.separatorsIcon} contentMode="cover" source={require('../assets/icons/separators.png')} />
                    <Text style={styles.address} >Address</Text>
                    <View style={styles.parentContentContainer}>
                        <Image style={styles.iconLayout} contentMode="cover" source={require('../assets/icons/address.png')} />
                        <Text style={styles.addressContent} numberOfLines={3}>{data.address}</Text>
                    </View>
                    <Image style={styles.separatorsIcon} contentMode="cover" source={require('../assets/icons/separators.png')} />
                    <Text style={styles.address}>Owner's Name</Text>
                    <View style={styles.parentContentContainer}>
                        <Image style={styles.iconLayout} contentMode="cover" source={require('../assets/icons/user.png')} />
                        <Text style={styles.addressContent} numberOfLines={2}>{data.ownerName}</Text>
                    </View>
                    <Image style={styles.separatorsIcon} contentMode="cover" source={require('../assets/icons/separators.png')} />
                    <Text style={styles.address}>Phone number</Text>
                    <View style={styles.parentContentContainer}>
                        <Image style={styles.iconLayout} contentMode="cover" source={require('../assets/icons/phonegray.png')} />
                        <Text style={styles.addressContent} numberOfLines={2}>{data.mobilePhone}</Text>
                    </View>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    rectangleShadowBox: {
        marginTop: 10,
        height: 320,
        width: 350,
        shadowOpacity: 1,
        elevation: 2,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: 8,
        backgroundColor: "#fff",
        flexDirection: "row",
        marginBottom: 5,
        marginHorizontal: 20
    },
    imageContainer: {
        marginTop: 10,
    },
    imageCard: {
        height: 120,
        width: 335,
        overflow: "hidden",
        borderRadius: 4
    },
    frameParent: {
        flex: 1,
        marginLeft: 10
    },
    frameGroup: {
        width: "100%",
        flexDirection: "row"
    },
    titleParent: {
        alignItems: "center",
        flexDirection: "row",
        width: 270
    },
    cardTitle: {
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 8
    },
    iconLayout: {
        height: 16,
        width: 16,
        overflow: "hidden"
    },
    verifiedParent: {
        width: 70,
        alignItems: "center",
        flexDirection: "row",
    },
    verifiedText: {
        fontSize: 10,
        textAlign: "left",
        fontFamily: "Mulish-Regular",
        lineHeight: 20,
        color: "#0099fa",
    },
    componentChild: {
        borderRadius: 5
    },
    frameChild: {
        backgroundColor: "#9a9a9a",
        width: 110,
        alignSelf: "stretch",
        borderRadius: 5
    },
    headerCardText: {
        fontSize: 14,
        marginLeft: 4,
        textAlign: "left",
        fontFamily: 'Mulish-Bold',
        lineHeight: 20,
        color: "#2c2c2c"
    },
    headerContainer: {
        justifyContent: "center",
        alignSelf: "stretch",
    },
    separatorsIcon: {
        height: 1,
        marginVertical: 5,
        maxWidth: "100%",
        overflow: "hidden",
        width: "100%",
    },
    address: {
        marginTop: 5,
        alignSelf: "stretch",
        color: "#2c2c2c",
        lineHeight: 10,
        fontSize: 10,
        textAlign: "left",
        fontFamily: "Mulish-Regular"
    },
    addressContent: {
        color: "#6c6c6c",
        marginLeft: 5,
        marginTop: 3,
        flex: 1,
        fontSize: 10,
        fontFamily: 'Mulish-Regular'
    },
    parentContentContainer: {
        alignItems: "center",
        flexDirection: "row"
    },
    unverified: {
        color: "#ffbd1a",
        fontFamily: "Mulish-Regular",
        fontSize: 10
    },
});

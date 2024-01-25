import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDate, formatTimestampToDateString, formatTimestampToTimeString } from "../helpers/formatter";

export default function CardHomeScheduleVisit({ data }) {
    const navigation = useNavigation()
    return (
        <>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.rectangleParent} onPress={() => navigation.navigate('DetailVisit', { data: data })}>
                    <Image style={styles.imageStore} source={{
                        uri: data?.storeInformations?.photo,
                    }} />
                    <View style={styles.mainContentContainer}>
                        <Text style={styles.mainContentTitle}>{data?.storeInformations?.name}</Text>
                        <View style={styles.subContentContainer}>
                            <Image style={styles.iconLayout} contentMode="cover" source={require('../assets/icons/date.png')} />
                            <Text style={[styles.contentRightColor, styles.contentRight]}>{formatTimestampToDateString(data?.time)}</Text>
                        </View>
                        <View style={styles.subContentContainer}>
                            <Image style={styles.iconLayout} contentMode="cover" source={require('../assets/icons/time.png')} />

                            <Text style={[styles.contentRightColor, styles.contentRight]}>{formatTimestampToTimeString(data?.time)}</Text>
                        </View>
                        <View style={styles.subContentContainer}>
                            <Text style={[data.isCompleted ? styles.completedColor : styles.pending, styles.contentRight]}>
                                {data?.isCompleted ? 'Completed' : 'Pending'}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
};
const styles = StyleSheet.create({

    contentContainer: {
        marginTop: 5,
        marginBottom: 100,
        marginHorizontal: 30
    },
    rectangleParent: {
        marginTop: 12,
        marginHorizontal: 8,
        width: "100%",
        flexDirection: "row",
        position: "absolute",
        alignItems: "center",
    },
    contentRight: {
        marginLeft: 6,
        fontFamily: "Mulish-Regular",
        fontSize: 10,
        textAlign: "left",
        lineHeight: 14
    },
    imageStore: {
        borderRadius: 8,
        backgroundColor: "black",
        width: 72,
        height: 72
    },
    iconLayout: {
        height: 14,
        width: 14,
        overflow: "hidden"
    },
    mainContentContainer: {
        justifyContent: "center",
        marginLeft: 10
    },
    mainContentTitle: {
        fontSize: 14,
        fontFamily: "Mulish-SemiBold"
    },
    subContentContainer: {
        marginTop: 5,
        marginBottom: 2,
        flexDirection: "row"
    },
    content: {
        fontFamily: "Mulish-Regular",
        fontSize: 10,
        textAlign: "left",
        color: "black",
    },
    contentRightColor: {
        color: "#6c6c6c"
    },

    completedColor: {
        color: "#1dcd9f"
    },
    pending: {
        color: "#f4b718"
    },
    frameContainer: {
        marginTop: 11
    },

})

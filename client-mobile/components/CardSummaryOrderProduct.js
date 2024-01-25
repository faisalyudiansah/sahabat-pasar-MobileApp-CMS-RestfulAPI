import { Image, StyleSheet, Text, View } from "react-native";
import { formatPriceToIDR } from "../helpers/formatter";

export default function CardSummaryOrderProduct({ order }) {
    console.log(order);
    return (
        <View style={styles.frameParent}>
            <View style={styles.labelGroup}>
                <Text style={[styles.label1, styles.labelFlexBox1]}>Name</Text>
                <Text style={[styles.label2, styles.labelFlexBox]}>Quantity</Text>
            </View>
            <View style={styles.frameContainer}>
                <View style={styles.labelGroup}>
                    <Text style={[styles.label3, styles.labelClr]}>{order.productName}</Text>
                    <Text style={[styles.label4, styles.labelClr]}>{order.qtySold}</Text>
                </View>
                <View style={styles.labelWrapper}>
                    <Text style={[styles.label5, styles.labelClr]}>{formatPriceToIDR(order.price)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textTypo: {
        textAlign: "left",
        fontFamily: "Mulish-Bold",
        fontWeight: "700"
    },
    labelFlexBox1: {
        width: 200,
        alignItems: "center",
        display: "flex",
        fontSize: 12,
        textAlign: "left"
    },
    labelFlexBox: {
        textAlign: "left",
        fontSize: 12,
        flex: 1
    },
    labelClr: {
        color: "black",
    },
    separatorsIconSpaceBlock: {
        marginTop: 10,
        alignSelf: "stretch"
    },
    labelClr1: {
        color: "black",
        fontFamily: "Mulish-Regular"
    },
    label: {
        fontSize: 16,
        color: "#1b5fe3"
    },
    label1: {
        color: "#77849D",
        fontFamily: "Mulish-Regular",
    },
    label2: {
        color: "#77849D",
        fontFamily: "Mulish-Regular",
    },
    labelGroup: {
        width: 300,
        flexDirection: "row"
    },
    label3: {
        width: 200,
        alignItems: "center",
        display: "flex",
        fontSize: 12,
        textAlign: "left",
        fontFamily: "Mulish-Bold",
        fontWeight: "700",
        lineHeight: 20
    },
    label4: {
        textAlign: "left",
        fontSize: 12,
        flex: 1,
        fontFamily: "Mulish-Bold",
        fontWeight: "700",
        lineHeight: 20
    },
    label5: {
        fontFamily: "Mulish-Regular",
        lineHeight: 20,
        fontSize: 12,
        textAlign: "left",
        flex: 1
    },
    labelWrapper: {
        alignSelf: "stretch",
        flexDirection: "row"
    },
    frameContainer: {
        marginTop: 5
    },
    separatorsIcon: {
        maxWidth: "100%",
        overflow: "hidden",
        height: 1,
        width: "100%"
    },
    totalPrice: {
        color: "black",
        fontSize: 12,
        textAlign: "left"
    },
    text: {
        fontSize: 12,
        marginTop: 4,
        alignSelf: "stretch",
        textAlign: "left",
        fontFamily: "Mulish-Bold",
        fontWeight: "700"
    },
    totalPriceParent: {
        flex: 1
    },
    frameChild: {
        display: "none",
        marginLeft: 12,
        borderRadius: 8,
        flex: 1
    },
    instanceParent: {
        flexDirection: "row"
    },
    frameParent: {
        backgroundColor: "#fff",
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 1,
        width: 328,
        padding: 16,
        marginTop: 5,
        borderRadius: 8,
        marginBottom: 10
    },

});
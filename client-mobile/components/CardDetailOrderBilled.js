import { Image, StyleSheet, Text, View } from "react-native";
import { formatPriceToIDR } from "../helpers/formatter";

export default function CardDetailOrderBilled({ billed }) {
    console.log(billed);
    return (
        <View style={[styles.frameParent, styles.frameParentFlexBox]}>
            <View style={[styles.labelParent, styles.labelLayout]}>
                <Text style={[styles.label, styles.labelTypo]}>Total</Text>
                <Text style={styles.label1}>{formatPriceToIDR(billed.totalBill + billed.discountValue)}</Text>
            </View>
            <View style={[styles.labelGroup, styles.labelLayout]}>
                <Text style={[styles.label, styles.labelTypo]}>Discount</Text>
                <Text style={styles.label1}>- {formatPriceToIDR(billed.discountValue)}</Text>
            </View>
            <Image style={[styles.separatorsIcon, styles.separatorsIconSpaceBlock]} resizeMode="cover" source={require('../assets/icons/separators.png')} />
            <View style={[styles.instanceParent, styles.separatorsIconSpaceBlock]}>
                <View style={styles.frameParentFlexBoxTotal}>
                    <Text style={[styles.totalBilled, styles.labelTypo]}>Total Billed</Text>
                    <Text style={styles.text}>{formatPriceToIDR(billed.totalBill)}</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
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
        padding: 16,
        width: "100%"
    },
    frameParentFlexBox: {
        borderRadius: 8,
        marginTop: 4
    },
    frameParentFlexBoxTotal: {
        borderRadius: 8,
        marginTop: 4,
        flexDirection: "row"
    },
    labelLayout: {
        width: 300,
        flexDirection: "row"
    },
    labelTypo: {
        textAlign: "left",
        fontSize: 12
    },
    separatorsIconSpaceBlock: {
        marginTop: 10,
        alignSelf: "stretch"
    },
    label: {
        lineHeight: 12,
        textAlign: "left",
        color: "#77849D",
        fontFamily: "Mulish-Regular",
        fontSize: 12,
        flex: 1
    },
    label1: {
        color: "black",
        textAlign: "left",
        fontFamily: "Mulish-Regular",
        lineHeight: 12,
        fontSize: 12,
        flex: 1
    },
    labelParent: {
        flexDirection: "row"
    },
    labelGroup: {
        marginTop: 10,
        flexDirection: "row"
    },
    separatorsIcon: {
        maxWidth: "100%",
        overflow: "hidden",
        height: 1,
        width: "100%"
    },
    totalBilled: {
        textAlign: "left",
        color: "#77849D",
        fontFamily: "Mulish-Bold",
        fontSize: 12,
        width: 150
    },
    text: {
        fontSize: 12,
        fontWeight: "700",
        fontFamily: "Mulish-Bold",
        alignSelf: "stretch",
        color: "black",
        textAlign: "left"
    },
    frameChild: {
        display: "none",
        marginLeft: 12
    },
    instanceParent: {
        flexDirection: "row"
    },

});
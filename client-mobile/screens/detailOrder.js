import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CardDetailOrderProducts from "../components/CardDetailOrderProducts";
import CardDetailOrderBilled from "../components/CardDetailOrderBilled";
import { formatDate } from "../helpers/formatter";

export default function DetailOrder({ route }) {
    const { data } = route.params
    return (
        <View style={styles.outerContainer}>
            <ScrollView style={styles.componentParent}>
                <View style={styles.labelParent}>
                    <Text style={styles.label}>Orders</Text>
                    <View style={styles.frameParent}>
                        <View style={styles.orderNumberParent}>
                            <Text style={[styles.orderNumber, styles.contentText]}>Order Number</Text>
                            <View style={styles.mainContentParent}>
                                <Text style={styles.mainContentText}>{data._id.toUpperCase()}</Text>
                            </View>
                        </View>
                        <Image style={[styles.separatorsIcon, styles.parentSpaceBlock]} resizeMode="cover" source={require('../assets/icons/separators.png')} />
                        <View style={styles.parentSpaceBlock}>
                            <Text style={[styles.orderNumber, styles.contentText]}>Store Name</Text>
                            <View style={styles.mainContentParent}>
                                <Image style={styles.iconLayout} resizeMode="cover" source={require('../assets/icons/location.png')} />
                                <Text style={[styles.tokoPakBudi, styles.mainContentText]}>{data.store.name}</Text>
                            </View>
                        </View>
                        <Image style={[styles.separatorsIcon, styles.parentSpaceBlock]} resizeMode="cover" source={require('../assets/icons/separators.png')} />
                        <View style={styles.parentSpaceBlock}>
                            <Text style={[styles.orderNumber, styles.contentText]}>Created Order</Text>
                            <View style={styles.mainContentParent}>
                                <Text style={styles.mainContentText}>{formatDate(data.createdAt)}</Text>
                            </View>
                        </View>
                        <Image style={[styles.separatorsIcon, styles.parentSpaceBlock]} resizeMode="cover" source={require('../assets/icons/separators.png')} />
                        <View style={styles.parentSpaceBlock}>
                            <Text style={[styles.orderNumber, styles.contentText]}>Status Order</Text>
                            <View style={styles.mainContentParent}>
                                <Text style={[
                                    styles.completedText, styles.textTypo,
                                    data.status === 'pending' && styles.pendingStatus, styles.textTypo
                                ]}>
                                    {data.status}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.labelParent}>

                    <Text style={styles.label}>Products</Text>
                    {data.productOrder.map((product) => (
                        <CardDetailOrderProducts key={product.productId} product={product} />
                    ))}
                </View>
                <View style={styles.labelParent}>
                    <Text style={styles.label}>Summary Billed</Text>
                    <CardDetailOrderBilled billed={data} />
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    outerContainer: {
        overflow: "hidden",
        flex: 1,
        backgroundColor: "#fff",
        width: "100%"
    },
    componentParent: {
        backgroundColor: "#f6f9ff",
        height: "100%",
        paddingHorizontal: 33,
        paddingTop: 10,
    },
    contentText: {
        color: "#77849D",
        fontFamily: "Mulish-Regular",
        lineHeight: 18,
        fontSize: 12
    },
    parentSpaceBlock: {
        marginTop: 10,
        alignSelf: "stretch"
    },
    mainContentText: {
        color: "black",
        lineHeight: 20,
        fontSize: 14,
        textAlign: "left",
        fontFamily: "Mulish-Bold",
        fontWeight: "700"
    },
    textTypo: {
        fontSize: 14,
        marginTop: 4,
        alignSelf: "stretch",
        textAlign: "left",
        fontFamily: "Mulish-Bold",
    },
    label: {
        fontSize: 16,
        lineHeight: 24,
        color: "#1b5fe3",
        textAlign: "left",
        fontFamily: "Mulish-Bold",
    },
    orderNumber: {
        textAlign: "left"
    },
    mainContentParent: {
        alignItems: "center",
        marginTop: 4,
        flexDirection: "row"
    },
    orderNumberParent: {
        alignSelf: "stretch"
    },
    separatorsIcon: {
        maxWidth: "100%",
        height: 1,
        overflow: "hidden",
        width: "100%"
    },
    iconLayout: {
        width: 16,
        height: 16,
        overflow: "hidden"
    },
    tokoPakBudi: {
        marginLeft: 4
    },
    completedText: {
        color: "#1dcd9f"
    },
    pendingStatus: {
        color: "orange"
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
        borderRadius: 8
    },
    labelParent: {
        width: "100%",
        marginBottom: 10
    }
});
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border, Padding } from "../style/GlobalStyles";
import { formatPriceToIDR } from "../helpers/formatter";

const CardProductList = ({ data }) => {
  return (
    <>
      <View style={styles.rectangleShadowBox}>
        <View style={styles.frameParent}>
          <View style={styles.rectangleParent}>
            <Image source={{ uri: data.image }} style={styles.imageCard} />
            <View style={styles.discountQuantityParent}>
              <Text
                style={styles.discountQuantity}
              >
                Discount
              </Text>

              <Text style={styles.karton}>
                {data.discPercent} % @ {data.discQty}
              </Text>
            </View>
          </View>
          <View style={styles.frameGroup}>
            <View style={styles.headerTitleContainer}>
              <View style={styles.headerTitleContainerLeft}>
                <Image style={styles.iconLayout} contentMode="cover" source={require('../assets/icons/product.png')} />
                <Text style={styles.textTitle}>
                  {data.name}
                </Text>
              </View>
              {data.isAvailable ? (
                <Text style={styles.availableText}>
                  available
                </Text>
              ) : (
                <Text style={styles.notAvailableText}>
                  not available
                </Text>
              )}
            </View>
            <Image style={styles.separatorsIcon} source={require('../assets/icons/separators.png')} />

            <Text style={styles.subContentTitle}>
              Stock
            </Text>
            <View
              style={styles.parentSubContent}
            >
              <Image style={styles.iconLayout} contentMode="cover" source={require('../assets/icons/quantity.png')} />
              <Text style={styles.subContentText}>
                {data.stock}
              </Text>
            </View>
            <Image style={styles.separatorsIcon} source={require('../assets/icons/separators.png')} />

            <Text style={styles.subContentTitle}>
              Price
            </Text>
            <View
              style={styles.parentSubContent}
            >
              <Image style={styles.iconLayout} contentMode="cover" source={require('../assets/icons/price.png')} />
              <Text style={styles.subContentText}>
                {formatPriceToIDR(data.price)}
              </Text>
            </View>
            <Image style={styles.separatorsIcon} source={require('../assets/icons/separators.png')} />
            <Text style={styles.subContentTitle}>
              Category
            </Text>
            <View
              style={styles.parentSubContent}
            >
              <Image style={styles.iconLayout} contentMode="cover" source={require('../assets/icons/category.png')} />
              <Text style={styles.subContentText}>
                {data.category}
              </Text>
            </View>
          </View>
        </View>
      </View>

    </>
  )
}

export default CardProductList

const styles = StyleSheet.create({
  rectangleShadowBox: {
    height: 185,
    width: 355,
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
    marginBottom: 15,
    marginHorizontal: 20
  },
  frameParent: {
    flexDirection: "row",
    alignSelf: "stretch",
    flex: 1,
  },
  headerTitleContainer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  headerTitleContainerLeft: {
    flexDirection: "row",
    alignItems: "center",
    width: 155
  },
  rectangleParent: {
    alignItems: "center",
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    marginLeft: 5,
    flexDirection: "column",
  },
  imageCard: {
    width: 110,
    height: 110,
    borderRadius: 8,
  },
  iconLayout: {
    height: 16,
    width: 16,
    overflow: "hidden",
  },
  discountQuantityParent: {
    marginBottom: 5,
    backgroundColor: "#1B5FE3",
    width: 80,
    alignItems: "center",
    borderRadius: 4
  },
  discountQuantity: {
    color: '#fff',
    fontSize: 12,
    paddingLeft: 2,
    marginTop: 3,
    textAlign: "center"
  },
  phoneParent: {
    justifyContent: "center",
    marginTop: 2,
    alignItems: "center",
  },
  parentSubContent: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 3,
  },
  phoneIcon: {
    width: 16,
    height: 16,
    overflow: "hidden",
  },
  karton: {
    textAlign: "center",
    fontFamily: 'Mulish-Bold',
    fontSize: 12,
    width: 80,
    color: "#1B5FE3",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderColor: "#1B5FE3"
  },
  subContentText: {
    textAlign: "left",
    flex: 1,
    marginLeft: 5,
    color: Color.colorDimgray,
    fontFamily: 'Mulish-Regular',
    lineHeight: 10,
    fontSize: 10,
  },
  frameGroup: {
    width: 240,
    paddingLeft: 8,
    alignSelf: "stretch",
  },
  textTitle: {
    fontSize: 14,
    marginLeft: 4,
    textAlign: "left",
    fontFamily: 'Mulish-Bold',
    lineHeight: 20,
    color: "#2c2c2c"
  },
  availableText: {
    color: Color.colorMediumaquamarine,
    textAlign: "left",
    lineHeight: 20,
    fontFamily: "Mulish-Regular",
    fontSize: 12,
    marginLeft: 15
  },
  notAvailableText: {
    color: "red",
    textAlign: "left",
    lineHeight: 20,
    fontFamily: "Mulish-Regular",
    fontSize: 12,
  },
  separatorsIcon: {
    height: 1,
    marginVertical: 7,
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%"
  },
  subContentTitle: {
    marginTop: 3,
    textAlign: "left",
    fontFamily: "Mulish-Regular",
    fontSize: 10,
  },
})
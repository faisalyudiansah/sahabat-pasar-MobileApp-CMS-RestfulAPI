import { useContext, useEffect, useState } from "react";
import { Alert, Button, Dimensions, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { getValueFor } from "../helpers/secureStore"
import axios from 'axios'
import { formatPriceToIDR } from "../helpers/formatter";
import { OrderContext } from "../context/OrderContext";
export default function CreateOrder({ navigation }) {
    const orderContext = useContext(OrderContext)
    const [isProductNameVisible, setIsProductNameVisible] = useState(false);
    const [isPriceVisible, setIsPriceVisible] = useState(false);
    const [isStoreNameVisible, setIsStoreNameVisible] = useState(false);
    const [isPickerEnabled, setIsPickerEnabled] = useState(true);


    let [selectedProductName, setSelectedProductName] = useState('Select Product')
    let [selectedStoreName, setSelectedStoreName] = useState('Select Store')
    let [productSelectInput, setProductSelectInput] = useState([])
    let [storeSelect, setStoreSelect] = useState([])
    let [productId, setProductId] = useState(null);
    let [storeId, setStoreId] = useState(null);
    let [quantity, setQuantity] = useState(null);
    let [price, setPrice] = useState(null);
    let [discQty, setDiscQty] = useState(null);
    let [finalPrice, setFinalPrice] = useState(null)
    const [productOrder, setProductOrder] = useState([])

    async function getNameProduct() {
        const token = await getValueFor('access_token')
        try {
            let link = `${process.env.EXPO_PUBLIC_API_URL}/products/?available=true`
            let { data } = await axios({
                method: 'get',
                url: link,
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            setProductSelectInput(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getNameStore() {
        const token = await getValueFor('access_token')
        try {
            let link = `${process.env.EXPO_PUBLIC_API_URL}/stores/simple`
            let { data } = await axios({
                method: 'get',
                url: link,
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            setStoreSelect(data)
        } catch (error) {
            console.log(error)
        }
    }

    let rawData = {
        storeId: storeId,
        productOrder: productOrder,
        storeName: selectedStoreName
    }
    let product = {
        productId: productId,
        qtySold: quantity,
        price: finalPrice / quantity,
        productName: selectedProductName
    }
    // rawData.productOrder.push(product)

    async function submitHandle() {
        if (productOrder.length === 0) {
            navigation.navigate("CreateOrder")
            Alert.alert('Error', 'Please add products')
            return null
        }
        try {
            orderContext.setOrderData(rawData)
            navigation.navigate('SummaryOrder')

        } catch (error) {
            console.error("Error:", error);
            Alert.alert("Error", "Failed to create order");
        } finally {
            setProductOrder([])
        }

    }
    function handleAddAnotherProduct() {
        if (!selectedProductName || !quantity || !selectedStoreName) {
            navigation.navigate("CreateOrder")
            Alert.alert('Error', 'Field must be filled')
            return null
        }
        setProductOrder([...productOrder, product])
        clearForm()
    }

    function clearForm() {
        setSelectedProductName('Select Product')
        setQuantity(0)
        setIsPickerEnabled(true);
        setIsProductNameVisible(false);
    }

    function totalPrice() {
        let totalPrice
        if (quantity && price) {
            const selectedProduct = productSelectInput.find(product => product._id === productId);
            if (selectedProduct) {
                if (quantity < selectedProduct.discQty) {
                    totalPrice = price * quantity;
                } else {
                    totalPrice = price * quantity * ((100 - selectedProduct.discPercent) / 100);
                }
            }
        }
        return totalPrice || 0
    }

    // useEffect(() => {
    //     totalPrice()
    // }, [quantity])

    useEffect(() => {
        totalPrice()
        setFinalPrice(totalPrice());
    }, [quantity, price, productId])

    useEffect(() => {
        getNameStore()
        getNameProduct()
    }, [])

    useEffect(() => {
        if (productSelectInput) {
            let getProduct = productSelectInput.find(product => {
                if (product._id === productId) {
                    return product
                }
            })
            if (getProduct) {
                setDiscQty(getProduct.discQty)
                setPrice(getProduct.price)
            }
        }
    }, [productId])

    const togglePicker = (pickerName) => {
        switch (pickerName) {
            case 'productName':
                setIsProductNameVisible(!isProductNameVisible);
                setIsPriceVisible(false);
                setIsStoreNameVisible(false)
                break;
            case 'price':
                setIsPriceVisible(!isPriceVisible);
                setIsProductNameVisible(false);
                setIsStoreNameVisible(false)
                break;
            case 'storeName':
                setIsStoreNameVisible(!isStoreNameVisible);
                setIsProductNameVisible(false);
                setIsPriceVisible(false);
                break;
            default:
                break;
        }
    };
    return (
        <View style={styles.outerContainer}>
            <View style={styles.componentParent}>
                <View style={styles.container}>

                    <Text style={styles.label}>Store Name</Text>
                    <TouchableWithoutFeedback onPress={() => togglePicker('storeName')}>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerText}>{selectedStoreName}</Text>
                            <View style={styles.iconLayoutParent}>
                                <Image source={require('../assets/icons/arrowdown.png')} style={styles.iconLayout} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <Modal visible={isStoreNameVisible} animationType="slide" transparent={true} onRequestClose={() => clearForm()}>
                        <View style={styles.closeModalContainer}>
                            <TouchableOpacity onPress={() => setIsStoreNameVisible(false)} >
                                <Image source={require('../assets/icons/closemodal.png')} style={styles.closeModalIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContainer}>
                            <Picker
                                enabled={isPickerEnabled}
                                // selectedValue={price}
                                onValueChange={(itemValue, index) => {
                                    setStoreId(itemValue);
                                    setSelectedStoreName(storeSelect[index]?.name)
                                    setIsStoreNameVisible(false);
                                }}
                                style={styles.picker}
                            >
                                {storeSelect.map((store, i) => (
                                    <Picker.Item
                                        label={store.name}
                                        value={store._id}
                                        key={i} // dont keyExtra
                                    />
                                ))}
                            </Picker>
                        </View>
                    </Modal>

                    <Text style={styles.label}>Product Name</Text>
                    <TouchableWithoutFeedback onPress={() => togglePicker('productName')}>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerText}>{selectedProductName}</Text>
                            <View style={styles.iconLayoutParent}>
                                <Image source={require('../assets/icons/arrowdown.png')} style={styles.iconLayout} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <Modal visible={isProductNameVisible} animationType="slide" transparent={true}>
                        <View style={styles.closeModalContainer}>
                            <TouchableOpacity onPress={() => setIsProductNameVisible(false)} >
                                <Image source={require('../assets/icons/closemodal.png')} style={styles.closeModalIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContainer}>
                            <Picker
                                // selectedValue={productId}
                                onValueChange={(itemValue, itemIndex) => {
                                    setProductId(itemValue);
                                    setSelectedProductName(productSelectInput[itemIndex]?.name)
                                    setIsProductNameVisible(false);
                                }}
                                style={styles.picker}
                            >
                                {productSelectInput.map((product, i) => (
                                    <Picker.Item
                                        label={product.name}
                                        value={product._id}
                                        key={i} // dont keyExtra
                                    />
                                ))}
                            </Picker>
                        </View>
                    </Modal>

                    <Text style={styles.label}>Quantity (Discount Quantity : {discQty ? discQty : 0})</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Ex: 1000 Karton"
                            value={quantity}
                            keyboardType="numeric"
                            onChangeText={setQuantity}
                        />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: `6%`,
                        marginTop: '2%'
                    }}>
                        <Text style={{
                            fontSize: 14,
                            lineHeight: 24,
                            color: "#1b5fe3",
                        }}>Price per Product :</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            color: "#1b5fe3",
                        }}>{price ? formatPriceToIDR(price) : formatPriceToIDR(0)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: `6%`,
                        marginBottom: '6%%',
                        marginTop: '2%'
                    }}>
                        <Text style={{
                            fontSize: 14,
                            lineHeight: 24,
                            color: "#1b5fe3",
                        }}>Total Price :</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            color: "#1b5fe3",
                        }}>{formatPriceToIDR(finalPrice || 0)}</Text>
                    </View>

                    <TouchableOpacity onPress={handleAddAnotherProduct}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonSubmitText}>Add</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={submitHandle}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonSubmitText}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 250,
    },
    container: {
        padding: 16,
    },
    closeModalContainer: {
        flex: 1,
        height: "100%",
        width: "100%",
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    closeModalIcon: {
        height: 30,
        width: 30,
        top: 70,
        left: 330
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
    iconLayoutParent: {

    },
    iconLayout: {
        height: 20,
        width: 20
    },
    inputContainerPrice: {
        backgroundColor: "#fff",
        borderColor: '#e8e8e8',
        borderRadius: 5,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
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
        shadowOpacity: 1,
        elevation: 2,
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
    pickerContainer: {
        backgroundColor: "#fff",
        borderColor: '#e8e8e8',
        borderRadius: 5,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 1,
    },

    picker: {
        height: 200,
        width: '100%',
    },
    pickerText: {
        fontSize: 14,
        color: "black",
        textAlign: "left",
        fontFamily: "Mulish-Regular",
        height: 30,
        paddingTop: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        width: 280
    },
    input: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        backgroundColor: '#1b5fe3',
        padding: 10,
        borderRadius: 5,
        marginVertical: 8
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
        paddingTop: 10,
    },
});
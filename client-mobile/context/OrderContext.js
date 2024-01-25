import { createContext, useState } from 'react';

export const OrderContext = createContext(null);

export default function OrderProvider(props) {
    const [orderData, setOrderData] = useState([])

    return <OrderContext.Provider value={{
        orderData, setOrderData
    }}>
        {
            props.children
        }

    </OrderContext.Provider>
}
import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export default function UserProvider(props) {
    const [userData, setUserData] = useState([])

    return <UserContext.Provider value={{
        userData, setUserData
    }}>
        {
            props.children
        }

    </UserContext.Provider>
}
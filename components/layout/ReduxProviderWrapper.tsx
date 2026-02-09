'use client'

import { store } from "@/store"
import { saveCartToStorage } from "@/utils/saveCartToStorage"
import { ReactNode, useEffect } from "react"
import { Provider } from "react-redux"

const ReduxProviderWrapper = ({
    children,
}:{
    children:ReactNode
}) => {
    useEffect(()=> {
        const unsubscribe = store.subscribe(()=>{
            const {cart} = store.getState();
            saveCartToStorage(cart.items)
        })
        return unsubscribe;
    }, [])
    return <Provider store={store}>
        {children}
    </Provider>
}

export default ReduxProviderWrapper
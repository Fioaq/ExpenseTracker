'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../lib/store'

export default function StoreProvider({ children }) {
    const storeRef = useRef()
    if (!storeRef.current) {
        // Cuando se renderiza, crea la instancia a la tienda por primera vez
        storeRef.current = makeStore()
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}
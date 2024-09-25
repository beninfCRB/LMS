import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function index() {
    const [token, setToken] = useState<any | null>(null)

    const data = async () => {
        return await AsyncStorage.getItem('access-token')
    }

    useEffect(() => {
        const r = data()
        setToken(r)
    }, [])


    return (
        <View>
            <Text>{token}</Text>
        </View>
    )
}
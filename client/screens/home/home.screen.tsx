import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '@/components/header/header'
import SearchInput from '@/components/search-input/search'

export default function HomeScreen() {
    return (
        <LinearGradient
            colors={["#E5ECF9", "#F6F7F9"]}
            style={{ flex: 1, paddingTop: 50 }}
        >
            <Header />
            <SearchInput />
        </LinearGradient>
    )
}
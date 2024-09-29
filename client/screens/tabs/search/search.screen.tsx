import SearchInput from '@/components/search-input/search'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { SafeAreaView } from 'react-native'

export default function SearchScreen() {
    return (
        <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1, paddingTop: 50 }}>
            <SafeAreaView>
                <SearchInput />
            </SafeAreaView>
        </LinearGradient>
    )
}
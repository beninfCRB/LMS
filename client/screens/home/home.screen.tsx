import BannerSLider from '@/components/banner-slider/banner-slider'
import AllCourses from '@/components/courses/all-courses'
import Header from '@/components/header/header'
import SearchInput from '@/components/search-input/search'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ScrollView } from 'react-native'

export default function HomeScreen() {
    return (
        <LinearGradient
            colors={["#E5ECF9", "#F6F7F9"]}
            style={{ flex: 1, paddingTop: 50 }}
        >
            <Header />
            <SearchInput homescreen={true} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <BannerSLider />
                <AllCourses />
            </ScrollView>
        </LinearGradient>
    )
}
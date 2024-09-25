import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SerachInputStyles } from '@/styles/component/search-input/search.styles'
import { Nunito_700Bold } from '@expo-google-fonts/nunito'
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import CourseCard from '../cards/course.card'
import axios from 'axios'
import { SERVER_URI } from '@/utils/uri.util'

export default function SearchInput({ homescreen }: { homescreen?: boolean }) {
    const [value, setValue] = useState("")
    const [courses, setCourses] = useState([])
    const [filteredCourses, setFilteredCourses] = useState([])

    let [fontsLoaded, fontError] = useFonts({
        Nunito_700Bold,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    useEffect(() => {
        axios
            .get(`${SERVER_URI}/get-courses`)
            .then((res: any) => {
                setCourses(res.data.metaData)
                if (!homescreen) {
                    setFilteredCourses(res.data.metaData)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        if (homescreen && value === "") {
            setFilteredCourses([])
        } else if (value) {
            const filtered = courses.filter((course: CoursesType) =>
                course.name.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredCourses(filtered)
        } else if (!homescreen) {
            setFilteredCourses(courses)
        }
    }, [value, courses])

    const renderCourseItem = ({ item }: { item: CoursesType }) => (
        <TouchableOpacity
            style={SerachInputStyles.renderItem}
            onPress={() => router.push({
                pathname: "/(routes)/course-details",
                params: { item: JSON.stringify(item) }
            })}
        >
            <Image
                source={{ uri: item?.thumbnail?.url }}
                style={{ width: 60, height: 60, borderRadius: 10 }}
            />
            <Text
                style={SerachInputStyles.textRenderItem}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    )

    return (
        <View>
            <View style={SerachInputStyles.filteringContainer}>
                <View style={SerachInputStyles.searchContainer}>
                    <TextInput
                        style={[SerachInputStyles.input, { fontFamily: "Nunito_700Bold" }]}
                        placeholder='Search'
                        value={value}
                        onChangeText={setValue}
                        placeholderTextColor={"#C67cc"}
                    />
                    <TouchableOpacity
                        style={SerachInputStyles.searchIconContainer}
                        onPress={() => router.push("/(tabs)/search")}
                    >
                        <AntDesign name='search1' size={20} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <FlatList
                    data={filteredCourses}
                    keyExtractor={(item: CoursesType) => item._id}
                    renderItem={
                        homescreen
                            ? renderCourseItem
                            : ({ item }) => <CourseCard item={item} key={item._id} />
                    }
                />
            </View>
            {
                !homescreen && (
                    <>
                        {filteredCourses?.length === 0 && (
                            <Text style={SerachInputStyles.textFilteredCourses}>Tidak ada data yang tersedia untuk ditampilkan!</Text>
                        )}
                    </>
                )
            }
        </View>
    )
}
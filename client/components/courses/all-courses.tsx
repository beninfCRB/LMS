import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { SERVER_URI } from '@/utils/uri.util';
import { Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Nunito_500Medium, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import CourseCard from '../cards/course.card';

export default function AllCourses() {
    const [courses, setCourses] = useState<CoursesType[]>([]);
    const [loading, setLoading] = useState(true);
    const flatListRef = useRef(null);

    useEffect(() => {
        axios
            .get(`${SERVER_URI}/get-courses`)
            .then((res: any) => {
                setCourses(res.data.metaData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_600SemiBold,
        Raleway_600SemiBold,
        Nunito_500Medium,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 16 }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        color: "#000000",
                        fontFamily: "Raleway_700Bold"
                    }}
                >
                    Kursus populer
                </Text>
                <TouchableOpacity onPress={() => router.push("/(tabs)/courses")}>
                    <Text
                        style={{
                            fontSize: 15,
                            color: "#2467EC",
                            fontFamily: "Nunito_600SemiBold"
                        }}
                    >
                        Lihat semua
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                ref={flatListRef}
                data={courses}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => <CourseCard key={item._id.toString()} item={item} />}
                nestedScrollEnabled={true}
                scrollEnabled={false}
            />
        </View>
    )
}
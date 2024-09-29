import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font';
import { Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';
import axios from 'axios';
import { SERVER_URI } from '@/utils/uri.util';
import Loader from '@/screens/loader/loader.screen';
import { LinearGradient } from 'expo-linear-gradient';
import CourseCard from '@/components/cards/course.card';

export default function CourseScreen() {
    const [courses, setCourses] = useState<CoursesType[]>([]);
    const [originalCourses, setOriginalCourses] = useState<CoursesType[]>([]);
    const [loading, setLoading] = useState(true);
    const [categories, setcategories] = useState([]);
    const [activeCategory, setactiveCategory] = useState("All");

    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold,
        Nunito_500Medium,
        Nunito_600SemiBold,
        Raleway_600SemiBold,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    useEffect(() => {
        axios
            .get(`${SERVER_URI}/get-layout/Categories`)
            .then((res) => {
                setcategories(res.data.metaData.categories);
                fetchCourses();
            })
            .catch((error) => {
                console.log('masuk error categoris');
                console.log(error);
            });
    }, []);

    const fetchCourses = () => {
        axios
            .get(`${SERVER_URI}/get-courses`)
            .then((res: any) => {
                setCourses(res.data.metaData);
                setOriginalCourses(res.data.metaData);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    const handleCategories = (e: string) => {
        setactiveCategory(e);
        if (e === "All") {
            setCourses(originalCourses);
        } else {
            const filterCourses = originalCourses.filter(
                (i: CoursesType) => i.categories === e
            );
            setCourses(filterCourses);
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <LinearGradient
                    colors={["#E5ECF9", "#F6F7F9"]}
                    style={{ flex: 1, paddingTop: 65 }}
                >
                    <View style={{ padding: 10 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                    backgroundColor:
                                        activeCategory === "All" ? "#2467EC" : "#000",
                                    borderRadius: 20,
                                    paddingHorizontal: 20,
                                    marginRight: 5,
                                }}
                                onPress={() => handleCategories("All")}
                            >
                                <Text
                                    style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                                >
                                    All
                                </Text>
                            </TouchableOpacity>
                            {categories?.map((i: any, index: number) => (
                                <TouchableOpacity
                                    style={{
                                        padding: 10,
                                        backgroundColor:
                                            activeCategory === i?.title ? "#2467EC" : "#000",
                                        borderRadius: 50,
                                        paddingHorizontal: 20,
                                        marginHorizontal: 15,
                                    }}
                                    onPress={() => handleCategories(i?.title)}
                                >
                                    <Text
                                        style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                                    >
                                        {i?.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View>
                        <ScrollView style={{ marginHorizontal: 15, gap: 12 }}>
                            {courses?.map((item: CoursesType, index: number) => (
                                <CourseCard item={item} key={index} />
                            ))}
                        </ScrollView>
                        {courses?.length === 0 && (
                            <Text
                                style={{ textAlign: "center", paddingTop: 50, fontSize: 18 }}
                            >
                                No data available!
                            </Text>
                        )}
                    </View>
                </LinearGradient>
            )}
        </>
    )
}
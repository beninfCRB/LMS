import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import useUser from '@/hooks/auth/useUser.hook';
import axios from 'axios';
import { SERVER_URI } from '@/utils/uri.util';
import Loader from '../loader/loader.screen';
import { LinearGradient } from 'expo-linear-gradient';
import CourseCard from '@/components/cards/course.card';

export default function EnrolledCoursesScreen() {
    const [courses, setcourses] = useState<CoursesType[]>([]);
    const [loader, setLoader] = useState(false);
    const { loading, user } = useUser();

    useEffect(() => {
        axios.get(`${SERVER_URI}/get-courses`).then((res: any) => {
            const courses: CoursesType[] = res.data.metaData;
            const data = courses.filter((i: CoursesType) =>
                user?.courses?.some((d: any) => d._id === i._id)
            );
            setcourses(data);
        });
    }, [loader, user]);

    return (
        <>
            {loader || loading ? (
                <Loader />
            ) : (
                <LinearGradient
                    colors={["#E5ECF9", "#F6F7F9"]}
                    style={{ flex: 1 }}
                >
                    <FlatList
                        data={courses}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ item }) => <CourseCard item={item} />}
                        nestedScrollEnabled={true}
                        scrollEnabled={false}
                    />
                </LinearGradient>
            )}
        </>
    )
}
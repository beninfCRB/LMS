import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import useUser from '@/hooks/auth/useUser.hook';
import { router, useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font';
import { Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../loader/loader.screen';
import { LinearGradient } from 'expo-linear-gradient';
import { CourseDetailStyles } from '@/styles/courses/course-detail/course-detail.style';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { rupiah } from '@/utils/rupiah.util';

export default function CourseDetailScreen() {

    const [activeButton, setActiveButton] = useState("About");
    const { user, loading } = useUser();
    const [isExpanded, setIsExpanded] = useState(false);
    const { item } = useLocalSearchParams();
    const courseData: CoursesType = JSON.parse(item as string);
    const [checkPurchased, setCheckPurchased] = useState(false);

    let [fontsLoaded, fontError] = useFonts({
        Raleway_600SemiBold,
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_500Medium,
        Nunito_700Bold,
        Nunito_600SemiBold,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    useEffect(() => {
        if (user?.courses?.find((i: any) => i._id === courseData?._id)) {
            setCheckPurchased(true)
        }
    }, [user]);

    const handleAddToCart = async () => {
        const existingCartData = await AsyncStorage.getItem("cart");
        const cartData = existingCartData ? JSON.parse(existingCartData) : [];
        const itemExists = cartData.some(
            (item: any) => item._id === courseData._id
        );
        if (!itemExists) {
            cartData.push(courseData);
            await AsyncStorage.setItem("cart", JSON.stringify(cartData));
        }
        router.push("/(routes)/cart")
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <LinearGradient
                    colors={["#E5ECF9", "#F6F7F9"]}
                    style={{ flex: 1, paddingTop: 15 }}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginHorizontal: 16 }}>
                            <View
                                style={CourseDetailStyles.headDetail}
                            >
                                <Text
                                    style={[CourseDetailStyles.textDetail, { fontFamily: "Nunito_600SemiBold" }]}
                                >
                                    Penjualan Terbaik
                                </Text>
                            </View>
                            <View
                                style={{ position: "absolute", zIndex: 14, right: 0 }}
                            >
                                <View
                                    style={CourseDetailStyles.headRating}
                                >
                                    <FontAwesome name='star' size={14} color={"#FFB800"} />
                                    <Text
                                        style={[CourseDetailStyles.textRating, { fontFamily: "Nunito_600SemiBold" }]}
                                    >
                                        {courseData?.ratings}
                                    </Text>
                                </View>
                            </View>
                            <Image
                                source={{ uri: courseData?.thumbnail.url! }}
                                style={{ width: "100%", height: 230, borderRadius: 6 }}
                            />
                        </View>
                        <Text
                            style={CourseDetailStyles.textName}
                        >
                            {courseData?.name}
                        </Text>
                        <View
                            style={CourseDetailStyles.headPrice}
                        >
                            <View
                                style={{ flexDirection: "row" }}
                            >
                                <Text
                                    style={CourseDetailStyles.textPrice}
                                >
                                    {rupiah(courseData?.price)}
                                </Text>
                                <Text
                                    style={CourseDetailStyles.textEstimatedPrice}
                                >
                                    {rupiah(courseData?.estimatedPrice as number)}
                                </Text>
                            </View>
                            <Text style={{ fontSize: 15, marginRight: 16 }}>
                                {courseData?.purchased} Member
                            </Text>
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>
                                Prasyaratan Kursus
                            </Text>
                            {courseData?.prerequisites.map(
                                (item: PrerequisiteType, index: number) => (
                                    <View
                                        key={index}
                                        style={{
                                            flexDirection: "row",
                                            width: "95%",
                                            paddingVertical: 5
                                        }}
                                    >
                                        <Ionicons name='checkmark-done-outline' size={18} />
                                        <Text style={{ paddingLeft: 5, fontSize: 16 }}>{item.title}</Text>
                                    </View>
                                )
                            )}
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>
                                Manfaat kursus
                            </Text>
                            {

                            }
                        </View>
                    </ScrollView>
                </LinearGradient>
            )}
        </>
    )
}
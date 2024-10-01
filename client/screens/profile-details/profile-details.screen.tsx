import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import useUser from '@/hooks/auth/useUser.hook';
import { Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { useFonts } from 'expo-font';
import { Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileDetailsScreen() {
    const { user } = useUser();

    let [fontsLoaded, fontError] = useFonts({
        Raleway_600SemiBold,
        Raleway_700Bold,
        Nunito_600SemiBold,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <LinearGradient
            colors={["#E5ECF9", "#F6F7F9"]}
            style={{ flex: 1, paddingTop: 15, paddingHorizontal: 15 }}>
            <ScrollView>
                <View
                    style={{
                        flexDirection: "column",
                        gap: 14,
                        paddingHorizontal: 20
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 60
                        }}
                    >
                        <Text style={{ fontSize: 20, fontFamily: "Raleway_700Bold" }}>Name</Text>
                        <Text style={{ fontSize: 20, fontFamily: "Nunito_600SemiBold" }}>{user?.name}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 60
                        }}
                    >
                        <Text style={{ fontSize: 20, fontFamily: "Raleway_700Bold" }}>Email</Text>
                        <Text style={{ fontSize: 20, fontFamily: "Nunito_600SemiBold" }}>{user?.email}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 60
                        }}
                    >
                        <Text style={{ fontSize: 20, fontFamily: "Raleway_700Bold" }}>Enroll Learning</Text>
                        <Text style={{ fontSize: 20, fontFamily: "Nunito_600SemiBold" }}>{Number(user?.courses?.length || 0)}</Text>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}
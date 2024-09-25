import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { HeaderStyles } from '@/styles/component/header/header.styles'
import useUser from '@/hooks/auth/useUser.hook'
import { Raleway_700Bold } from '@expo-google-fonts/raleway'
import { useFonts } from 'expo-font'
import { router } from 'expo-router'
import { Feather } from '@expo/vector-icons'

export default function Header() {
    const [cartItems, setCartsItems] = useState([])
    const { user } = useUser()

    console.log(user);
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
    });
    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View style={HeaderStyles.container}>
            <View style={HeaderStyles.headWrapper}>
                <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
                    <Image
                        source={user?.avatar ? user?.avatar : require("@/assets/icons/User.png")}
                        style={HeaderStyles.image}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={[HeaderStyles.helloText, { fontFamily: "Raleway_700Bold" }]}>Halo</Text>
                <Text style={[HeaderStyles.text, { fontFamily: "Raleway_700Bold" }]}>{user?.name}</Text>
            </View>
            <TouchableOpacity
                style={HeaderStyles.bellButton}
                onPress={() => router.push("/(routes)/cart")}
            >
                <View>
                    <Feather name='shopping-bag' size={26} color={"black"} />
                    <View
                        style={HeaderStyles.bellContainer}
                    >
                        <Text style={{ color: "#fff", fontSize: 14 }}>{cartItems?.length}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
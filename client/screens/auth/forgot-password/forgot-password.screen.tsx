import { forgotPasswordStyle } from '@/styles/auth/forgot-password/forgot-password.styles'
import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function ForgotPasswordScreen() {
    let [fonstLoaded, fontError] = useFonts({
        Nunito_500Medium,
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_700Bold,
    })

    if (!fonstLoaded && !fontError) {
        return null
    }

    return (
        <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={forgotPasswordStyle.container}>
            <Text style={[forgotPasswordStyle.headerText, { fontFamily: "Nunito_600SemiBold" }]}>
                Atur Ulang Kata Sandi
            </Text>
            <TextInput
                style={[forgotPasswordStyle.input, { fontFamily: "Nunito_400Regular" }]}
                placeholder="exampple@gmail.com"
                keyboardType="email-address"
            />
            <TouchableOpacity style={forgotPasswordStyle.button}>
                <Text style={[forgotPasswordStyle.buttonText, { fontFamily: "Nunito_600SemiBold" }]}>
                    Kirim
                </Text>
            </TouchableOpacity>
            <View style={forgotPasswordStyle.loginLink}>
                <Text style={[forgotPasswordStyle.backText, { fontFamily: "Nunito_700Bold" }]}>
                    Kembali Ke?
                </Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={[forgotPasswordStyle.loginText, { fontFamily: "Nunito_700Bold" }]}>
                        Masuk
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}
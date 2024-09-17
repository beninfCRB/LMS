import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Entypo, FontAwesome, Fontisto, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Raleway_700Bold, Raleway_600SemiBold } from '@expo-google-fonts/raleway'
import { Nunito_400Regular, Nunito_500Medium, Nunito_700Bold, Nunito_600SemiBold } from '@expo-google-fonts/nunito'
import { loginStyles } from '@/styles/auth/login/login.styles'
import { commonStyles } from '@/styles/common/common.styles'
import { router } from 'expo-router'

export default function LoginScreen() {
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const [buttonSpinner, setButtonSpinner] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    })
    const [errorEmail, setErrorEmail] = useState({
        email: "",
    })
    const [errorPassword, setErrorPassword] = useState({
        password: "",
    })

    let [fonstLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Raleway_600SemiBold,
        Nunito_500Medium,
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_700Bold,
    })

    if (!fonstLoaded && !fontError) {
        return null
    }

    const handleEmailValidation = (value: string) => {
        const email = value.trim()
        if (email === "") {
            setErrorEmail({ ...errorEmail, email: "Email tidak boleh kosong" })
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorEmail({ ...errorEmail, email: "Format email tidak valid" })
        } else {
            setErrorEmail({
                ...errorEmail,
                email: ""
            })
            setUserInfo({ ...userInfo, email })
        }
    }

    const handlePasswordValidation = (value: string) => {
        const password = value
        const passwordSpecialCharacter = /(?=.*[!@#$&*])/
        const passwordOneNumber = /(?=.*[0-9])/
        const passwordSixValue = /(?=.{6,})/
        const passwordOneCapital = /(?=.*[A-Z])/

        if (!passwordSpecialCharacter.test(password)) {
            setErrorPassword({
                ...errorPassword,
                password: "Kata sandi setidaknya berisi satu karakter khusus"
            })
            setUserInfo({ ...userInfo, password: "" })
        } else if (!passwordOneNumber.test(password)) {
            setErrorPassword({
                ...errorPassword,
                password: "Kata sandi setidaknya berisi 1 nomor"
            })
            setUserInfo({ ...userInfo, password: "" })
        } else if (!passwordSixValue.test(password)) {
            setErrorPassword({
                ...errorPassword,
                password: "Kata sandi minimal berisi 6 karakter"
            })
            setUserInfo({ ...userInfo, password: "" })
        } else if (!passwordOneCapital.test(password)) {
            setErrorPassword({
                ...errorPassword,
                password: "Kata sandi setidaknya berisi 1 huruf kapital"
            })
            setUserInfo({ ...userInfo, password: "" })
        } else {
            setErrorPassword({
                ...errorPassword,
                password: ""
            })
            setUserInfo({ ...userInfo, password })
        }
    }

    const handleLogin = () => {

    }

    return (
        <LinearGradient
            colors={["#E5ECF9", "#F6F7F9"]}
            style={{ flex: 1, paddingTop: 20 }}
        >
            <ScrollView>
                <Image
                    style={loginStyles.signInImage}
                    source={require("@/assets/auth/sign_in.png")}
                />
                <Text style={[loginStyles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>Selamat Datang!</Text>
                <Text style={loginStyles.learningText}>
                    login ke akun khodam anda
                </Text>
                <View style={loginStyles.inputContainer}>
                    <View style={loginStyles.containerHeight}>
                        <TextInput
                            style={[loginStyles.input, { paddingLeft: 40 }]}
                            keyboardType='email-address'
                            placeholder='example@gmail.com'
                            onChangeText={handleEmailValidation}
                        />
                        <Fontisto
                            style={loginStyles.icon1}
                            name='email'
                            size={20}
                            color={"#A1A1A1"}
                        />
                        {
                            errorEmail.email && (
                                <View style={[commonStyles.errorContainer, { top: 58 }]}>
                                    <Entypo name='cross' size={18} color={"red"} />
                                    <Text style={loginStyles.errorText}>{errorEmail.email}</Text>
                                </View>
                            )
                        }
                        <View style={{ marginTop: 25 }}>
                            <TextInput
                                style={loginStyles.input}
                                keyboardType="default"
                                secureTextEntry={!isPasswordVisible}
                                placeholder="********"
                                onChangeText={handlePasswordValidation}
                            />
                            <TouchableOpacity
                                style={loginStyles.visibleIcon}
                                onPress={() => setPasswordVisible(!isPasswordVisible)}
                            >
                                {
                                    isPasswordVisible ? (
                                        <Ionicons
                                            name='eye-off-outline'
                                            size={23}
                                            color={"#747474"}
                                        />
                                    ) : (
                                        <Ionicons
                                            name='eye-outline'
                                            size={23}
                                            color={"#747474"}
                                        />
                                    )
                                }
                            </TouchableOpacity>
                            <SimpleLineIcons
                                style={loginStyles.icon2}
                                name='lock'
                                size={20}
                                color={"#A1A1A1"}
                            />
                        </View>
                        {
                            errorPassword.password && (
                                <View style={[commonStyles.errorContainer, { top: 138 }]}>
                                    <Entypo name='cross' size={18} color={"red"} />
                                    <Text style={loginStyles.errorText}>{errorPassword.password}</Text>
                                </View>
                            )
                        }
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push("/forgot-password")}
                    >
                        <Text
                            style={[loginStyles.forgotSection, { fontFamily: "Nunito_600SemiBold" }]}
                        >
                            Lupa Password?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={commonStyles.buttonContainer}
                        onPress={handleLogin}
                    >
                        {
                            buttonSpinner ? (
                                <ActivityIndicator size={"small"} color={"white"} />
                            ) : (
                                <Text
                                    style={{ color: "white", textAlign: "center", fontSize: 16, fontFamily: "Raleway_700Bold" }}
                                >
                                    Masuk
                                </Text>
                            )
                        }
                    </TouchableOpacity>
                    <View style={loginStyles.auth0Section}>
                        <FontAwesome name='google' size={24} />
                    </View>
                    <View style={loginStyles.signUpRedirect}>
                        <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
                            Belum punya akun?
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push("/sign-up")}
                        >
                            <Text
                                style={[loginStyles.signUpSection, { fontFamily: "Raleway_600SemiBold" }]}
                            >
                                Daftar Akun
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'
import { useFonts } from 'expo-font'
import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo, FontAwesome, Fontisto, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { commonStyles } from '@/styles/common/common.styles'
import { signUpStyles } from '@/styles/auth/sign-up/sign-up.styles'
import ButtonActivity from '@/components/buttons/button-activity'
import { SERVER_URI } from '@/utils/uri.util'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Toast } from 'react-native-toast-notifications'

export default function SignUpScreen() {
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const [buttonSpinner, setButtonSpinner] = useState(false)
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [errorName, setErrorName] = useState({
        name: "",
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

    const handleNameValidation = (value: string) => {
        const name = value.trim()
        if (name === "") {
            setErrorName({ ...errorName, name: "Nama tidak boleh kosong" })
        } else {
            setErrorName({
                ...errorName,
                name: ""
            })
            setUserInfo({ ...userInfo, name })
        }
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

    const handleSignUp = async () => {
        setButtonSpinner(true);
        await axios
            .post(`${SERVER_URI}/sign-up`, userInfo)
            .then(async (res) => {
                await AsyncStorage.setItem(
                    "activation_token",
                    res.data.activationToken
                );
                Toast.show(res.data.message, {
                    type: "success",
                });
                setUserInfo({
                    name: "",
                    email: "",
                    password: "",
                });
                setButtonSpinner(false);
                router.push("/(routes)/auth/verify-account");
            })
            .catch((error) => {
                setButtonSpinner(false);
                Toast.show("Email already exist!", {
                    type: "danger",
                });
            });
    }

    return (
        <LinearGradient
            colors={["#E5ECF9", "#F6F7F9"]}
            style={{ flex: 1, paddingTop: 20 }}
        >
            <ScrollView>
                <Image
                    style={signUpStyles.signInImage}
                    source={require("@/assets/auth/signup.png")}
                />
                <Text style={[signUpStyles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>Ayo Kita Mulai!</Text>
                <Text style={signUpStyles.learningText}>
                    buat akun untuk memperolah semua fitur
                </Text>
                <View style={signUpStyles.inputContainer}>
                    <View style={signUpStyles.containerHeight}>
                        <View>
                            <TextInput
                                style={[signUpStyles.input, { paddingLeft: 40 }]}
                                keyboardType='default'
                                placeholder='user'
                                onChangeText={handleNameValidation}
                            />
                            <FontAwesome
                                style={signUpStyles.icon1}
                                name='user'
                                size={20}
                                color={"#A1A1A1"}
                            />
                            {
                                errorName.name && (
                                    <View style={[commonStyles.errorContainer, { top: 58 }]}>
                                        <Entypo name='cross' size={18} color={"red"} />
                                        <Text style={signUpStyles.errorText}>{errorName.name}</Text>
                                    </View>
                                )
                            }
                        </View>
                        <View>
                            <TextInput
                                style={[signUpStyles.input, { paddingLeft: 40 }]}
                                keyboardType='email-address'
                                placeholder='example@gmail.com'
                                onChangeText={handleEmailValidation}
                            />
                            <Fontisto
                                style={signUpStyles.icon1}
                                name='email'
                                size={20}
                                color={"#A1A1A1"}
                            />
                            {
                                errorEmail.email && (
                                    <View style={[commonStyles.errorContainer, { top: 58 }]}>
                                        <Entypo name='cross' size={18} color={"red"} />
                                        <Text style={signUpStyles.errorText}>{errorEmail.email}</Text>
                                    </View>
                                )
                            }
                        </View>
                        <View>
                            <TextInput
                                style={signUpStyles.input}
                                keyboardType="default"
                                secureTextEntry={!isPasswordVisible}
                                placeholder="********"
                                onChangeText={handlePasswordValidation}
                            />
                            <TouchableOpacity
                                style={signUpStyles.visibleIcon}
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
                                style={signUpStyles.icon2}
                                name='lock'
                                size={20}
                                color={"#A1A1A1"}
                            />
                        </View>
                        {
                            errorPassword.password && (
                                <View style={[commonStyles.errorContainer, { top: 215 }]}>
                                    <Entypo name='cross' size={18} color={"red"} />
                                    <Text style={signUpStyles.errorText}>{errorPassword.password}</Text>
                                </View>
                            )
                        }
                        <ButtonActivity
                            title='Daftar'
                            style={commonStyles.buttonContainer}
                            onPress={handleSignUp}
                            spinner={buttonSpinner}
                        />
                        <View style={signUpStyles.auth0Section}>
                            <FontAwesome name='google' size={24} />
                        </View>
                        <View style={signUpStyles.signUpRedirect}>
                            <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
                                Sudah punya akun?
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push("/(routes)/auth/login")}
                            >
                                <Text
                                    style={[signUpStyles.signUpSection, { fontFamily: "Raleway_600SemiBold" }]}
                                >
                                    Masuk Akun
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}
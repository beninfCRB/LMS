import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Entypo, Fontisto, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Raleway_700Bold, Raleway_600SemiBold } from '@expo-google-fonts/raleway'
import { Nunito_400Regular, Nunito_500Medium, Nunito_700Bold, Nunito_600SemiBold } from '@expo-google-fonts/nunito'
import { styles } from '@/styles/onboarding/onboarding.styles'
import { loginStyles } from '@/styles/auth/login/login.styles'
import { commonStyles } from '@/styles/common/common.styles'
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'

export default function LoginScreen() {
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const [buttonSigner, setButtonSigner] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    })
    const [required, setRequired] = useState("")
    const [error, setError] = useState({
        password: ""
    })

    const handleEmailValidation = (value: string) => {
        const email = value
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
            setUserInfo({ ...userInfo, email });
            setRequired("");
        } else {
            setRequired("Email tidak valid");
        }
    };

    const handlePasswordValidation = (value: string) => {
        const password = value
        const passwordSpecialCharacter = /(?=.*[!@#$&*])/
        const passwordOneNumber = /(?=.*[0-9])/
        const passwordSixValue = /(?=.{6,})/

        if (!passwordSpecialCharacter.test(password)) {
            setError({
                ...error,
                password: "masukan setidaknya satu karakter khusus"
            })
            setUserInfo({ ...userInfo, password: "" })
        } else if (!passwordOneNumber.test(password)) {
            setError({
                ...error,
                password: "masukan setidaknya 1 nomor"
            })
            setUserInfo({ ...userInfo, password: "" })
        } else if (!passwordSixValue.test(password)) {
            setError({
                ...error,
                password: "masukan minimal 6 karakter"
            })
            setUserInfo({ ...userInfo, password: "" })
        } else {
            setError({
                ...error,
                password: ""
            })
            setUserInfo({ ...userInfo, password })
        }
    }

    return (
        <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1, paddingTop: 20 }}>
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
                    <View>
                        <TextInput
                            style={[loginStyles.input, { paddingLeft: 45 }]}
                            keyboardType='email-address'
                            value={userInfo.email}
                            placeholder='example@gmail.com'
                            onChangeText={(value) => setUserInfo({ ...userInfo, email: value })}
                        />
                        <Fontisto
                            style={loginStyles.icon1}
                            name='email'
                            size={20}
                            color={"#A1A1A1"}
                        />
                        {required && (
                            <View style={commonStyles.errorContainer}>
                                <Entypo name='cross' size={18} color={"red"} />
                            </View>
                        )}
                        <View style={{ marginTop: 15 }}>
                            <TextInput
                                style={loginStyles.input}
                                keyboardType="default"
                                secureTextEntry={!isPasswordVisible}
                                defaultValue=""
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
                            error.password && (
                                <View style={[commonStyles.errorContainer, { top: 145 }]}>
                                    <Entypo name='cross' size={18} color={"red"} />
                                    <Text style={loginStyles.errorText}>{error.password}</Text>
                                </View>
                            )
                        }
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}
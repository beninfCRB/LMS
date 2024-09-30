import ButtonActivity from '@/components/buttons/button-activity'
import { forgotPasswordStyle } from '@/styles/auth/forgot-password/forgot-password.styles'
import { commonStyles } from '@/styles/common/common.styles'
import { SERVER_URI } from '@/utils/uri.util'
import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { Entypo, Fontisto, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Toast } from 'react-native-toast-notifications'

export default function ForgotPasswordScreen() {
    const [isOldPasswordVisible, setOldPasswordVisible] = useState(false)
    const [isNewPasswordVisible, setNewPasswordVisible] = useState(false)
    const [buttonSpinner, setButtonSpinner] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: "",
        oldPassword: "",
        newPassword: "",
    })
    const [errorEmail, setErrorEmail] = useState({
        email: "",
    })
    const [errorNewPassword, setErrorNewPassword] = useState({
        newPassword: "",
    })
    const [errorOldPassword, setErrorOldPassword] = useState({
        oldPassword: "",
    })

    let [fonstLoaded, fontError] = useFonts({
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

    const handleNewPasswordValidation = (value: string) => {
        const newPassword = value
        const passwordSpecialCharacter = /(?=.*[!@#$&*])/
        const passwordOneNumber = /(?=.*[0-9])/
        const passwordSixValue = /(?=.{6,})/
        const passwordOneCapital = /(?=.*[A-Z])/

        if (!passwordSpecialCharacter.test(newPassword)) {
            setErrorNewPassword({
                ...errorNewPassword,
                newPassword: "Kata sandi setidaknya berisi satu karakter khusus"
            })
            setUserInfo({ ...userInfo, newPassword: "" })
        } else if (!passwordOneNumber.test(newPassword)) {
            setErrorNewPassword({
                ...errorNewPassword,
                newPassword: "Kata sandi setidaknya berisi 1 nomor"
            })
            setUserInfo({ ...userInfo, newPassword: "" })
        } else if (!passwordSixValue.test(newPassword)) {
            setErrorNewPassword({
                ...errorNewPassword,
                newPassword: "Kata sandi minimal berisi 6 karakter"
            })
            setUserInfo({ ...userInfo, newPassword: "" })
        } else if (!passwordOneCapital.test(newPassword)) {
            setErrorNewPassword({
                ...errorNewPassword,
                newPassword: "Kata sandi setidaknya berisi 1 huruf kapital"
            })
            setUserInfo({ ...userInfo, newPassword: "" })
        } else if (userInfo.oldPassword === newPassword) {
            setErrorNewPassword({
                ...errorNewPassword,
                newPassword: "Kata sandi baru sama dengan kata sandi lama"
            })
            setUserInfo({ ...userInfo, newPassword: "" })
        } else {
            setErrorNewPassword({
                ...errorNewPassword,
                newPassword: ""
            })
            setUserInfo({ ...userInfo, newPassword })
        }
    }

    const handleOldPasswordValidation = (value: string) => {
        const oldPassword = value
        const passwordSpecialCharacter = /(?=.*[!@#$&*])/
        const passwordOneNumber = /(?=.*[0-9])/
        const passwordSixValue = /(?=.{6,})/
        const passwordOneCapital = /(?=.*[A-Z])/

        if (!passwordOneCapital.test(oldPassword)) {
            setErrorOldPassword({
                ...errorOldPassword,
                oldPassword: "Kata sandi setidaknya berisi 1 huruf kapital"
            })
            setUserInfo({ ...userInfo, oldPassword: "" })
        } else if (!passwordSpecialCharacter.test(oldPassword)) {
            setErrorOldPassword({
                ...errorOldPassword,
                oldPassword: "Kata sandi setidaknya berisi satu karakter khusus"
            })
            setUserInfo({ ...userInfo, oldPassword: "" })
        } else if (!passwordOneNumber.test(oldPassword)) {
            setErrorOldPassword({
                ...errorOldPassword,
                oldPassword: "Kata sandi setidaknya berisi 1 nomor"
            })
            setUserInfo({ ...userInfo, oldPassword: "" })
        } else if (!passwordSixValue.test(oldPassword)) {
            setErrorOldPassword({
                ...errorOldPassword,
                oldPassword: "Kata sandi minimal berisi 6 karakter"
            })
            setUserInfo({ ...userInfo, oldPassword: "" })
        } else {
            setErrorOldPassword({
                ...errorOldPassword,
                oldPassword: ""
            })
            setUserInfo({ ...userInfo, oldPassword: oldPassword })
        }
    }

    const handleForgotPassword = async () => {
        setButtonSpinner(true);
        await axios
            .post(`${SERVER_URI}/forgot-password`, userInfo)
            .then(async (res) => {
                await AsyncStorage.setItem(
                    "activation_token",
                    res.data.activationToken
                );
                Toast.show(res.data.message, {
                    type: "success",
                });
                setUserInfo({
                    email: "",
                    newPassword: "",
                    oldPassword: "",
                });
                setButtonSpinner(false);
                router.push("/(routes)/auth/verify-new-password");
            })
            .catch((error) => {
                setButtonSpinner(false);
                Toast.show(error.response.data.metaData, {
                    type: "danger",
                });
            });
    }

    return (
        <LinearGradient
            colors={["#E5ECF9", "#F6F7F9"]}
            style={forgotPasswordStyle.container}
        >
            <ScrollView>
                <Text style={[forgotPasswordStyle.headerText, { fontFamily: "Nunito_600SemiBold" }]}>
                    Atur Ulang Kata Sandi
                </Text>
                <View style={forgotPasswordStyle.inputContainer}>
                    <View style={forgotPasswordStyle.containerHeight}>
                        <View>
                            <TextInput
                                style={[forgotPasswordStyle.input, { paddingLeft: 40, fontFamily: "Nunito_400Regular" }]}
                                placeholder="example@gmail.com"
                                keyboardType="email-address"
                                onChangeText={handleEmailValidation}
                            />
                            <Fontisto
                                style={forgotPasswordStyle.icon1}
                                name='email'
                                size={20}
                                color={"#A1A1A1"}
                            />
                        </View>
                        {
                            errorEmail.email && (
                                <View style={[commonStyles.errorContainer, { top: 58 }]}>
                                    <Entypo name='cross' size={18} color={"red"} />
                                    <Text style={forgotPasswordStyle.errorText}>{errorEmail.email}</Text>
                                </View>
                            )
                        }
                        <View>
                            <TextInput
                                style={[forgotPasswordStyle.input, { paddingLeft: 40, fontFamily: "Nunito_400Regular" }]}
                                keyboardType="default"
                                secureTextEntry={!isOldPasswordVisible}
                                placeholder="Kata sandi lama"
                                onChangeText={handleOldPasswordValidation}
                            />
                            <TouchableOpacity
                                style={forgotPasswordStyle.visibleIcon}
                                onPress={() => setOldPasswordVisible(!isOldPasswordVisible)}
                            >
                                {
                                    isOldPasswordVisible ? (
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
                                style={forgotPasswordStyle.icon2}
                                name='lock'
                                size={20}
                                color={"#A1A1A1"}
                            />
                        </View>
                        {
                            errorOldPassword.oldPassword && (
                                <View style={[commonStyles.errorContainer, { top: 138 }]}>
                                    <Entypo name='cross' size={18} color={"red"} />
                                    <Text style={forgotPasswordStyle.errorText}>{errorOldPassword.oldPassword}</Text>
                                </View>
                            )
                        }
                        <View>
                            <TextInput
                                style={[forgotPasswordStyle.input, { paddingLeft: 40, fontFamily: "Nunito_400Regular" }]}
                                keyboardType="default"
                                secureTextEntry={!isNewPasswordVisible}
                                placeholder="Kata sandi baru"
                                onChangeText={handleNewPasswordValidation}
                            />
                            <TouchableOpacity
                                style={forgotPasswordStyle.visibleIcon}
                                onPress={() => setNewPasswordVisible(!isNewPasswordVisible)}
                            >
                                {
                                    isNewPasswordVisible ? (
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
                                style={forgotPasswordStyle.icon2}
                                name='lock'
                                size={20}
                                color={"#A1A1A1"}
                            />
                        </View>
                        {
                            errorNewPassword.newPassword && (
                                <View style={[commonStyles.errorContainer, { top: 218 }]}>
                                    <Entypo name='cross' size={18} color={"red"} />
                                    <Text style={forgotPasswordStyle.errorText}>{errorNewPassword.newPassword}</Text>
                                </View>
                            )
                        }
                        <ButtonActivity
                            title='Kirim'
                            style={commonStyles.buttonContainer}
                            onPress={handleForgotPassword}
                            spinner={buttonSpinner}
                        />
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
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}
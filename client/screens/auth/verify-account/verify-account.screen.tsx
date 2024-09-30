import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { verifyAccountStyle } from '@/styles/auth/verify-account/verify-account.styles'
import Button from '@/components/buttons/button'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SERVER_URI } from '@/utils/uri.util'
import { Toast } from 'react-native-toast-notifications'
import axios from 'axios'

export default function VerifyAccountScreen({ path, message }: { path: string, message: string }) {
    const [code, setCode] = useState(new Array(4).fill(""))

    const inputs = useRef<any>([...Array(4).map(() => React.createRef())])

    const handleInput = (text: any, index: any) => {
        const newCode = [...code]
        newCode[index] = text
        setCode(newCode)

        if (text && index < 3) {
            inputs.current[index + 1]
        }

        if (text === "" && index > 0) {
            inputs.current[index - 1]
        }
    }

    const handleSubmit = async () => {
        const otp = code.join("");
        const activation_token = await AsyncStorage.getItem("activation_token");

        await axios
            .post(`${SERVER_URI}/${path}`, {
                activation_token,
                activation_code: otp,
            })
            .then((res: any) => {
                Toast.show(message, {
                    type: "success",
                });
                setCode(new Array(4).fill(""));
                router.push("/(routes)/auth/login");
            })
            .catch((error) => {
                Toast.show(error.response.data.metaData, {
                    type: "danger",
                });
            });
    }

    return (
        <View style={verifyAccountStyle.container}>
            <Text style={verifyAccountStyle.headerText} >Kode Verifikasi</Text>
            <Text style={verifyAccountStyle.subText} >kami telah mengirimkan kode verifikasi ke email Anda</Text>
            <View style={verifyAccountStyle.inputContainer}>
                {code.map((_, index) => (
                    <TextInput
                        key={index}
                        style={verifyAccountStyle.inputBox}
                        keyboardType='number-pad'
                        maxLength={1}
                        onChangeText={(text) => handleInput(text, index)}
                        value={code[index]}
                        ref={inputs.current[index]}
                        autoFocus={index === 0}
                    />
                ))}
            </View>
            <View style={{ marginTop: 10 }}>
                <Button
                    title='Submit'
                    onPress={handleSubmit}
                />
            </View>
            <TouchableOpacity onPress={() => router.back()}>
                <Text style={{ fontSize: 16, paddingTop: 20, fontWeight: "700" }}>Kembali Ke Sebelummnya</Text>
            </TouchableOpacity>
        </View>
    )
}
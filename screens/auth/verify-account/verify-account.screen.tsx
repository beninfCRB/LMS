import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { verifyAccountStyle } from '@/styles/auth/verify-account/verify-account.styles'
import Button from '@/components/buttons/button'

export default function VerifyAccountScreen() {
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

    const handleSubmit = () => {

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
        </View>
    )
}
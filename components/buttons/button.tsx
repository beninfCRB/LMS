import { commonStyles } from '@/styles/common/common.styles'
import React from 'react'
import { Dimensions, Text, TouchableOpacity } from 'react-native'

interface ButtonProps {
    title: string
    onPress: () => void
}

export default function Button({ title, onPress }: ButtonProps) {
    const { width } = Dimensions.get("window")

    return (
        <TouchableOpacity
            style={[
                commonStyles.buttonContainer,
                {
                    width: width * 1 - 100,
                }
            ]}
            onPress={onPress}
        >
            <Text style={{ color: "#fff", fontSize: 16, fontFamily: "Nunito_600SemiBold" }}>{title}</Text>
        </TouchableOpacity>
    )
}
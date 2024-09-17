import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import { Raleway_700Bold } from '@expo-google-fonts/raleway'
import { useFonts } from 'expo-font'

interface ButtonActivityProps {
    title: string
    style: object
    onPress: () => void
    spinner: boolean
}

export default function ButtonActivity({ title, style, onPress, spinner }: ButtonActivityProps) {
    let [fonstLoaded, fontError] = useFonts({
        Raleway_700Bold,
    })

    if (!fonstLoaded && !fontError) {
        return null
    }

    const { width } = Dimensions.get("window")

    return (
        <TouchableOpacity
            style={[style, { width: width * 1 - 80 }]}
            onPress={onPress}
        >
            {
                spinner ? (
                    <ActivityIndicator size={"small"} color={"white"} />
                ) : (
                    <Text
                        style={{ color: "white", textAlign: "center", fontSize: 16, fontFamily: "Raleway_700Bold" }}
                    >
                        {title}
                    </Text>
                )
            }
        </TouchableOpacity>
    )
}
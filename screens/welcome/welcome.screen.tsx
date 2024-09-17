import { onboardingSwiperData } from '@/constants/Constans'
import { commonStyles } from '@/styles/common/common.styles'
import { welcomeStyles } from '@/styles/welcome/welcome.styles'
import { Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { Raleway_700Bold } from '@expo-google-fonts/raleway'
import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'

export default function WelcomeIntroScreen() {
    let [fonstLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_700Bold,
    })

    if (!fonstLoaded && !fontError) {
        return null
    }

    const renderItem = ({ item }: { item: onboardingSwipperDataType }) => (
        <LinearGradient
            colors={["#E5ECF9", "#F6F7F9", "#38EEF9"]}
            style={{ flex: 1, paddingHorizontal: 16 }}
        >
            <View style={{ marginTop: 80 }}>
                <Image
                    source={item.image}
                    style={welcomeStyles.slideImage}
                />
                <Text style={[commonStyles.title, { fontFamily: "Raleway_700Bold" }]}>
                    {item.title}
                </Text>
                <View style={{ marginTop: 15 }}>
                    <Text
                        style={[commonStyles.description, { fontFamily: "Nunito_400Regular" }]}
                    >
                        {item.description}
                    </Text>
                    <Text
                        style={[commonStyles.description, { fontFamily: "Nunito_400Regular" }]}
                    >
                        {item.sortDescription}
                    </Text>
                    <Text
                        style={[commonStyles.description, { fontFamily: "Nunito_400Regular" }]}
                    >
                        {item.sortDescription2}
                    </Text>
                </View>
            </View>
        </LinearGradient>
    )

    return (
        <AppIntroSlider
            renderItem={renderItem}
            data={onboardingSwiperData}
            onDone={() => {
                router.push("/auth/login");
            }}
            onSkip={() => {
                router.push("/auth/login");
            }}
            renderNextButton={() => (
                <View style={[welcomeStyles.welcomeButtonStyle]}>
                    <Text
                        style={[welcomeStyles.buttonText, { fontFamily: "Nunito_600SemiBold" }]}
                    >
                        Lanjut
                    </Text>
                </View>
            )}
            renderDoneButton={() => (
                <View style={[welcomeStyles.welcomeButtonStyle]}>
                    <Text
                        style={[welcomeStyles.buttonText, { fontFamily: "Nunito_600SemiBold" }]}
                    >
                        Selesai
                    </Text>
                </View>
            )}
            showSkipButton={false}
            dotStyle={welcomeStyles.dotStyle}
            bottomButton={true}
            activeDotStyle={welcomeStyles.activeDotStyle}
        />
    )
}
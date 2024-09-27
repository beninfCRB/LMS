import { View, Text, Image } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { BannerSliderStyles } from '@/styles/component/banner-slider/banner-slider.styles';
import Swipper from 'react-native-swiper'
import { bannerData } from '@/constants/Constans';

export default function BannerSLider() {
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View style={BannerSliderStyles.container}>
            <Swipper
                dotStyle={BannerSliderStyles.dot}
                activeDotStyle={BannerSliderStyles.activeDot}
                autoplay={true}
                autoplayTimeout={5}
            >
                {bannerData.map((item: BannerDataTypes, index: number) => (
                    <View key={index} style={BannerSliderStyles.slide}>
                        <Image
                            source={item.bannerImageUrl}
                            style={{ width: 400, height: 250 }}
                        />
                    </View>
                ))}
            </Swipper>
        </View>
    )
}
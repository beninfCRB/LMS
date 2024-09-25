import { StyleSheet } from 'react-native'

import {
    responsiveWidth as rw,
    responsiveHeight as rh
} from 'react-native-responsive-dimensions'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export const welcomeStyles = StyleSheet.create({
    buttonText: {
        color: "white",
        textAlign: "center"
    },
    slideImage: {
        alignSelf: "center",
        marginBottom: 30
    },
    dotStyle: {
        backgroundColor: "#C6C7CC",
        width: rw(2.5),
        height: rh(1.2),
        borderRadius: 5,
        marginHorizontal: 5
    },
    activeDotStyle: {
        backgroundColor: "#2467Ec",
        width: rw(2.5),
        height: rh(1.2),
        borderRadius: 5,
        marginHorizontal: 5
    },
    welcomeButtonStyle: {
        backgroundColor: "#2467EC",
        width: rw(88),
        height: rh(5.5),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    }
})
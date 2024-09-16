import { StyleSheet } from "react-native";

import {
    responsiveWidth as rw,
    responsiveHeight as rh
} from 'react-native-responsive-dimensions'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonContainer: {
        backgroundColor: "#2467EC",
        width: rw(88),
        height: rh(2.5),
        borderRadius: 5,
        marginHorizontal: 5
    },
    title: {
        fontSize: hp("3.5%"),
        textAlign: "center"
    },
    description: {
        fontSize: hp("2.5%"),
        color: "#575757",
        textAlign: "center"
    },
})
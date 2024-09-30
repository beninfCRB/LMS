import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export const forgotPasswordStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 200,
    },
    headerText: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        height: 55,
        marginHorizontal: 16,
        borderRadius: 8,
        paddingLeft: 35,
        fontSize: 16,
        backgroundColor: "white",
        color: "#A1A1A1"
    },
    button: {
        backgroundColor: "#3876EE",
        width: "100%",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    loginLink: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
    },
    loginText: {
        color: "#3876EE",
        marginLeft: 5,
        fontSize: 16,
    },
    errorText: {
        color: "red",
        fontSize: 11,
        marginTop: -1
    },
    backText: { fontSize: 16 },
    visibleIcon: {
        position: "absolute",
        right: 30,
        top: 15
    },
    icon1: {
        position: "absolute",
        left: 26,
        top: 17.8
    },
    icon2: {
        position: "absolute",
        left: 24,
        top: 17.8,
        marginTop: -2
    },
    inputContainer: {
        marginHorizontal: 16,
        marginTop: 30,
        rowGap: 30
    },
    containerHeight: {
        height: hp("80%"),
        gap: 25
    },
})
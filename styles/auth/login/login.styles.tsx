import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    signInImage: {
        width: "60%",
        height: 250,
        alignSelf: "center",
        marginTop: 50
    },
    welcomeText: {
        textAlign: "center",
        fontSize: 24
    },
    learningText: {
        textAlign: "center",
        color: "#575757",
        fontSize: 15,
        marginTop: 5
    },
    inputContainer: {
        marginHorizontal: 16,
        marginTop: 30,
        rowGap: 30
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
    errorText: {
        color: "red",
        fontSize: 11,
        marginTop: -1
    }
})
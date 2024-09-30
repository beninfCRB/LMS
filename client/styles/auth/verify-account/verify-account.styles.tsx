import { StyleSheet } from "react-native";

export const verifyAccountStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subText: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
        textAlign: "center",
    },
    inputContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    inputBox: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: "#ddd",
        textAlign: "center",
        marginRight: 10,
        borderRadius: 10,
        fontSize: 20,
    },
    errorText: {
        color: "red",
        fontSize: 11,
        marginTop: -1
    },
})
import { StyleSheet } from "react-native";

export const HeaderStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 16,
        marginBottom: 16,
        width: "90%"
    },
    headWrapper: {
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        width: 45,
        height: 45,
        marginRight: 8,
        borderRadius: 100
    },
    text: {
        fontSize: 16
    },
    helloText: {
        color: "#7C7C80",
        fontSize: 14
    },
    bellButton: {
        borderWidth: 1,
        borderColor: "#E1E2E5",
        width: 45,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginLeft: 5
    },
    bellIcon: {
        alignSelf: "center"
    },
    bellContainer: {
        width: 20,
        height: 20,
        backgroundColor: "#2467EC",
        position: "absolute",
        borderRadius: 50,
        right: -5,
        top: -5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
})
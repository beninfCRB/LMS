import { StyleSheet } from "react-native";

export const CourseDetailStyles = StyleSheet.create({
    headDetail: {
        position: "absolute",
        zIndex: 1,
        backgroundColor: "#FFB013",
        borderRadius: 54,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 8,
        marginLeft: 8
    },
    textDetail: {
        color: "black",
        fontSize: 14
    },
    headRating: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#141517",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 3,
        marginTop: 8,
        marginRight: 8
    },
    textRating: {
        color: "white",
        marginLeft: 4
    },
    textName: {
        marginHorizontal: 16,
        marginTop: 15,
        fontSize: 20,
        fontWeight: "600"

    },
    headPrice: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 10,
        paddingTop: 5
    },
    textPrice: {
        color: "#000",
        fontSize: 22,
        marginLeft: 16,
        paddingVertical: 10
    },
    textEstimatedPrice: {
        color: "#808080",
        fontSize: 20,
        marginLeft: 10,
        textDecorationLine: "line-through"
    },
    aboutDetail: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25,
        marginHorizontal: 16,
        backgroundColor: "#E1E9F8",
        borderRadius: 50
    },
    textDescription: {
        color: "#525258",
        fontSize: 16,
        marginTop: 10,
        textAlign: "justify",
        fontFamily: "Nunito_500Medium"
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25,
        marginHorizontal: 16,
        backgroundColor: "#E1E9F8",
        borderRadius: 50
    }
})
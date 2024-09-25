import { StyleSheet } from "react-native";
import { widthPercentageToDP as WP } from "react-native-responsive-screen";

export const SerachInputStyles = StyleSheet.create({
    filteringContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 16
    },
    searchContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10
    },
    searchIconContainer: {
        width: 36,
        height: 36,
        backgroundColor: "#2467EC",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "black",
        paddingVertical: 10,
        width: 271,
        height: 48
    },
    renderItem: {
        backgroundColor: "#fff",
        padding: 10,
        width: WP("90%"),
        marginLeft: "1.5%",
        flexDirection: "row"
    },
    textRenderItem: {
        fontSize: 14,
        paddingLeft: 10,
        width: WP("75%")
    },
    textFilteredCourses: {
        textAlign: "center",
        paddingTop: 50,
        fontSize: 20,
        fontWeight: "600"
    }
}) 
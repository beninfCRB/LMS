import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color }) => {
            let iconName;
            let title;
            if (route.name === "index") {
              iconName = require("@/assets/icons/HouseSimple.png");
              title = "Home";
            } else if (route.name === "search/index") {
              iconName = require("@/assets/icons/search.png");
              title = "Cari";
            } else if (route.name === "courses/index") {
              iconName = require("@/assets/icons/BookBookmark.png");
              title = "Learning";
            } else if (route.name === "profile/index") {
              iconName = require("@/assets/icons/User.png");
              title = "Profil";
            }
            return (
              <View style={{ alignItems: "center" }}>
                <Image
                  style={{ width: 25, height: 25, tintColor: color }}
                  source={iconName}
                />
                <Text style={{ fontSize: 14, color: color }}>{title}</Text>
              </View>
            );
          },
          headerShown: false,
          tabBarShowLabel: false,
        };
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search/index" />
      <Tabs.Screen name="courses/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}

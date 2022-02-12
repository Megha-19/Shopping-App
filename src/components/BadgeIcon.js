import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const BadgeIcon = ({ badgeCount }) => {
  return (
    <View style={{ margin: 2 }}>
      <FontAwesome name="heart-o" size={27} color="#0a111c" />
      {badgeCount > 0 && (
        <View
          style={{
            position: "absolute",
            left: -12,
            top: -3,
            backgroundColor: "#0a111c",
            borderRadius: 6,
            width: 15,
            height: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
};

export default BadgeIcon;

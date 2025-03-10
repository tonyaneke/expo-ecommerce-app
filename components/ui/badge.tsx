import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary";
  className?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({
  children,
  variant = "default",
  style,
  textStyle,
}: BadgeProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case "default":
        return "#3b82f6";
      case "secondary":
        return "#6b7280";
      case "outline":
        return "transparent";
      default:
        return "#3b82f6";
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case "outline":
        return "#d1d5db";
      default:
        return "transparent";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "default":
      case "secondary":
        return "#ffffff";
      case "outline":
        return "#6b7280";
      default:
        return "#ffffff";
    }
  };

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: getTextColor(),
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});

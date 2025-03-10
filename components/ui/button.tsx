import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  children,
  variant = "default",
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();

  const buttonStyles = [
    styles.button,
    variant === "default" && {
      backgroundColor: theme.primary,
    },
    variant === "outline" && {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.border,
    },
    style,
  ];

  const textStyles = [
    styles.text,
    variant === "default" && {
      color: "#ffffff",
    },
    variant === "outline" && {
      color: theme.text,
    },
    textStyle,
  ];

  return (
    <TouchableOpacity style={buttonStyles} {...props}>
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});

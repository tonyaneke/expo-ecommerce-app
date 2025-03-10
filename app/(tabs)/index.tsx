import React, { useEffect } from "react";
import { StyleSheet, Animated, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { EcommerceLanding } from "../../components/EcommerceLanding";

export default function HomeScreen() {
  const { theme, isDarkMode } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: theme.background, opacity: fadeAnim },
      ]}
    >
      <EcommerceLanding />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

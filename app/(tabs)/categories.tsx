import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useShop, Category } from "../../contexts/ShopContext";
import { useTheme } from "../../contexts/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function CategoriesScreen() {
  const { categories } = useShop();
  const { theme, isDarkMode } = useTheme();

  const handleCategoryPress = (categoryName: string) => {
    // Navigate to products screen with category filter
    // In a real app, we would navigate to a filtered products screen
    router.push({
      pathname: "/products",
      params: { category: categoryName },
    });
  };

  const renderCategoryItem = ({ item }: { item: Category }) => {
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => handleCategoryPress(item.name)}
        activeOpacity={0.8}
      >
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.categoryImage}
          imageStyle={{ borderRadius: 12 }}
        >
          <View
            style={[
              styles.categoryOverlay,
              { backgroundColor: `${theme.background}80` },
            ]}
          >
            <Text style={[styles.categoryName, { color: theme.text }]}>
              {item.name}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={theme.text} />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Categories
        </Text>
      </View>

      {/* Categories list */}
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  listContent: {
    padding: 16,
  },
  categoryItem: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    height: 120,
  },
  categoryImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  categoryOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

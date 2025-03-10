import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useShop, Product } from "../../contexts/ShopContext";
import { useTheme } from "../../contexts/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button } from "../../components/ui/button";

export default function ProductsScreen() {
  const { products, addToCart, isInCart, toggleFavorite, isFavorite } =
    useShop();
  const { theme, isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    } else {
      return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
    }
  });

  const handleSortChange = (newSortBy: "name" | "price" | "rating") => {
    if (sortBy === newSortBy) {
      // Toggle sort order if clicking the same sort option
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sort option and default to ascending
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  const handleProductPress = (productId: number) => {
    // Use this approach for navigation to a dynamic route
    router.push({
      pathname: "/shared/product/[id]",
      params: { id: productId.toString() },
    });
  };

  // Add a fade-in animation when the products are loaded
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Simulate loading products
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, fadeAnim]);

  const renderStars = (rating: number) => {
    return (
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <Ionicons
            key={i}
            name={i < Math.floor(rating) ? "star" : "star-outline"}
            size={16}
            color={i < Math.floor(rating) ? "#f59e0b" : theme.secondaryText}
          />
        ))}
        <Text style={[styles.ratingText, { color: theme.secondaryText }]}>
          {rating}
        </Text>
      </View>
    );
  };

  // Render grid item
  const renderGridItem = ({ item }: { item: Product }) => {
    return (
      <Pressable
        style={[
          styles.gridItem,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
        onPress={() => handleProductPress(item.id)}
      >
        <View style={styles.gridImageContainer}>
          <Image source={{ uri: item.image }} style={styles.gridImage} />
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              { backgroundColor: `${theme.background}cc` },
            ]}
            onPress={() => toggleFavorite(item)}
          >
            <Ionicons
              name={isFavorite(item.id) ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite(item.id) ? theme.error : theme.secondaryText}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.gridContent}>
          <Text
            style={[styles.gridTitle, { color: theme.text }]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text style={[styles.gridPrice, { color: theme.text }]}>
            ${item.price.toFixed(2)}
          </Text>
          {renderStars(item.rating)}
          <Button
            variant={isInCart(item.id) ? "outline" : "default"}
            onPress={() => addToCart(item)}
            style={styles.addToCartButton}
          >
            {isInCart(item.id) ? "Added to Cart" : "Add to Cart"}
          </Button>
        </View>
      </Pressable>
    );
  };

  // Render list item
  const renderListItem = ({ item }: { item: Product }) => {
    return (
      <Pressable
        style={[
          styles.listItem,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
        onPress={() => handleProductPress(item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.listImage} />
        <View style={styles.listContent}>
          <Text style={[styles.listTitle, { color: theme.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.listPrice, { color: theme.text }]}>
            ${item.price.toFixed(2)}
          </Text>
          {renderStars(item.rating)}
          <View style={styles.listActions}>
            <Button
              variant={isInCart(item.id) ? "outline" : "default"}
              onPress={() => addToCart(item)}
              style={styles.listAddToCartButton}
            >
              {isInCart(item.id) ? "Added" : "Add to Cart"}
            </Button>
            <TouchableOpacity
              style={styles.listFavoriteButton}
              onPress={() => toggleFavorite(item)}
            >
              <Ionicons
                name={isFavorite(item.id) ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite(item.id) ? theme.error : theme.secondaryText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          opacity: fadeAnim,
        },
      ]}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Products
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.viewToggle}
            onPress={() => setIsGridView(!isGridView)}
          >
            <Ionicons
              name={isGridView ? "list-outline" : "grid-outline"}
              size={24}
              color={theme.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: theme.inputBackground },
        ]}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color={theme.secondaryText}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.secondaryText}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color={theme.secondaryText}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Sorting options */}
      <View style={styles.sortOptions}>
        <Text style={[styles.sortText, { color: theme.secondaryText }]}>
          Sort by:
        </Text>
        {["name", "price", "rating"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.sortButton,
              { backgroundColor: theme.inputBackground },
              sortBy === option && { backgroundColor: `${theme.primary}20` },
            ]}
            onPress={() =>
              handleSortChange(option as "name" | "price" | "rating")
            }
          >
            <Text
              style={[
                styles.sortButtonText,
                { color: theme.secondaryText },
                sortBy === option && { color: theme.primary },
              ]}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
              {sortBy === option && (sortOrder === "asc" ? "↑" : "↓")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Product list */}
      <FlatList
        data={sortedProducts}
        renderItem={isGridView ? renderGridItem : renderListItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={isGridView ? 2 : 1}
        key={isGridView ? "grid" : "list"}
        contentContainerStyle={styles.productListContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color={theme.secondaryText} />
            <Text style={[styles.emptyStateText, { color: theme.text }]}>
              No products found
            </Text>
            <Text
              style={[styles.emptyStateSubtext, { color: theme.secondaryText }]}
            >
              Try a different search term
            </Text>
          </View>
        )}
      />
    </Animated.View>
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
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewToggle: {
    padding: 8,
    marginLeft: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f3f4f6",
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    paddingVertical: 0, // Remove padding on iOS
  },
  sortOptions: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sortText: {
    fontSize: 14,
    color: "#6b7280",
    marginRight: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
  },
  activeSortButton: {
    backgroundColor: "#e0e7ff",
  },
  sortButtonText: {
    fontSize: 13,
    color: "#6b7280",
  },
  activeSortButtonText: {
    color: "#4f46e5",
    fontWeight: "500",
  },
  productListContent: {
    padding: 16,
  },
  gridItem: {
    flex: 1,
    margin: 4,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    maxWidth: "48%",
  },
  gridImageContainer: {
    position: "relative",
  },
  gridImage: {
    width: "100%",
    aspectRatio: 1,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 6,
  },
  gridContent: {
    padding: 12,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
  },
  gridPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  addToCartButton: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 12,
  },
  listImage: {
    width: 100,
    height: 100,
  },
  listContent: {
    flex: 1,
    padding: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
  },
  listPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  listActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  listAddToCartButton: {
    flex: 1,
    marginRight: 8,
  },
  listFavoriteButton: {
    padding: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 4,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#374151",
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
});

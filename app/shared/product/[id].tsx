import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useShop } from "../../../contexts/ShopContext";
import { Button } from "../../../components/ui/button";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const productId = typeof id === "string" ? parseInt(id, 10) : 0;
  const router = useRouter();

  const { products, addToCart, isInCart, toggleFavorite, isFavorite } =
    useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Find the product based on the ID
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerBackTitle: "Back",
            title: "Product Not Found",
          }}
        />
        <View style={styles.notFound}>
          <Ionicons name="alert-circle-outline" size={64} color="#d1d5db" />
          <Text style={styles.notFoundText}>Product not found</Text>
          <Button onPress={() => router.back()}>Go Back</Button>
        </View>
      </SafeAreaView>
    );
  }

  // Mock images - in a real app, a product would have multiple images
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=2187&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop",
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert(
      "Added to Cart",
      `${product.name} has been added to your cart.`,
      [{ text: "OK" }]
    );
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing product: ${product.name} - ${product.description}`,
        url: product.image,
      });
    } catch (error) {
      console.log("Error sharing product:", error);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <Ionicons
            key={i}
            name={i < Math.floor(rating) ? "star" : "star-outline"}
            size={16}
            color={i < Math.floor(rating) ? "#f59e0b" : "#d1d5db"}
          />
        ))}
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Stack.Screen
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
          headerRight: () => (
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={handleShare}
              >
                <Ionicons name="share-outline" size={24} color="#111827" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => toggleFavorite(product)}
              >
                <Ionicons
                  name={isFavorite(product.id) ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite(product.id) ? "#ef4444" : "#111827"}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <ScrollView>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: productImages[selectedImageIndex] }}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        {/* Image Thumbnails */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailsContainer}
        >
          {productImages.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImageIndex(index)}
              style={[
                styles.thumbnail,
                selectedImageIndex === index && styles.selectedThumbnail,
              ]}
            >
              <Image
                source={{ uri: image }}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          {renderStars(product.rating)}

          {/* Availability */}
          <View style={styles.availabilityContainer}>
            <View
              style={[
                styles.badge,
                { backgroundColor: product.inStock ? "#d1fae5" : "#fee2e2" },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  { color: product.inStock ? "#047857" : "#b91c1c" },
                ]}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Text>
            </View>
            <Text style={styles.categoryText}>
              Category: {product.category}
            </Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          {/* Quantity selector */}
          <View style={styles.quantityContainer}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Ionicons
                  name="remove"
                  size={20}
                  color={quantity <= 1 ? "#d1d5db" : "#6b7280"}
                />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}
              >
                <Ionicons name="add" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom actions */}
      <View style={styles.bottomActions}>
        <Button
          variant={isInCart(product.id) ? "outline" : "default"}
          onPress={handleAddToCart}
          style={styles.cartButton}
        >
          {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
        </Button>

        <Button
          variant="default"
          onPress={handleBuyNow}
          style={styles.buyButton}
        >
          Buy Now
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerButtons: {
    flexDirection: "row",
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  imageContainer: {
    backgroundColor: "#f9fafb",
    width: "100%",
    height: 320,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  thumbnailsContainer: {
    padding: 16,
    gap: 12,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  selectedThumbnail: {
    borderColor: "#3b82f6",
    borderWidth: 2,
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 4,
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  badge: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  categoryText: {
    fontSize: 14,
    color: "#6b7280",
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
  },
  quantityContainer: {
    marginBottom: 24,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 36,
    height: 36,
    backgroundColor: "#f3f4f6",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "500",
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: "center",
  },
  bottomActions: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  cartButton: {
    flex: 1,
    marginRight: 8,
  },
  buyButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#047857",
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  notFoundText: {
    fontSize: 18,
    color: "#6b7280",
    marginVertical: 16,
  },
});

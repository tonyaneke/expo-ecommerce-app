import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  ShoppingBagIcon,
  ArrowRightIcon,
  StarIcon,
  ChevronRightIcon,
} from "./ui/IconComponents";
import Constants from "expo-constants";
import { useTheme } from "../contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

export function EcommerceLanding() {
  const { width } = useWindowDimensions();
  const { theme, isDarkMode } = useTheme();
  const isMobile = width < 768;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Eco-Friendly Water Bottle",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop",
      rating: 4.9,
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            color={i < Math.floor(rating) ? "#f59e0b" : theme.secondaryText}
            size={16}
          />
        ))}
        <Text style={[styles.ratingText, { color: theme.secondaryText }]}>
          {rating}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Hero Section */}
      <LinearGradient
        colors={
          isDarkMode ? [theme.card, theme.background] : ["#f8fafc", "#ffffff"]
        }
        style={styles.heroSection}
      >
        <Animated.View
          style={[
            styles.heroContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "timing", duration: 1000 }}
          >
            <Badge variant="outline" style={styles.newCollectionBadge}>
              New Collection 2024
            </Badge>
          </MotiView>

          <Text style={[styles.heroTitle, { color: theme.text }]}>
            Discover Your{" "}
            <Text style={{ color: theme.primary }}>Perfect Style</Text>
          </Text>
          <Text style={[styles.heroSubtitle, { color: theme.secondaryText }]}>
            Explore our curated collection of premium products designed for
            modern living. Quality meets style in every item.
          </Text>
          <View style={styles.heroCta}>
            <Button onPress={() => {}} style={styles.primaryButton}>
              <LinearGradient
                colors={[theme.primary, "#3b82f6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.buttonText}>
                Shop Now <ArrowRightIcon size={16} color="#ffffff" />
              </Text>
            </Button>
            <Button variant="outline" onPress={() => {}}>
              View Catalog
            </Button>
          </View>
        </Animated.View>

        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", delay: 300 }}
          style={[styles.heroImageContainer, { borderColor: theme.border }]}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 600 }}
            style={[
              styles.customersBox,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.customersIconBox}>
              <ShoppingBagIcon size={18} color={theme.primary} />
              <Text style={[styles.customersText, { color: theme.text }]}>
                50K+ Happy Customers
              </Text>
            </View>
          </MotiView>
        </MotiView>
      </LinearGradient>

      {/* Featured Products */}
      <View
        style={[styles.featuredSection, { backgroundColor: theme.background }]}
      >
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", delay: 800 }}
        >
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Featured Products
              </Text>
              <Text
                style={[styles.sectionSubtitle, { color: theme.secondaryText }]}
              >
                Discover our most popular items
              </Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.viewAllButton,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={[styles.viewAllText, { color: theme.primary }]}>
                View all products
              </Text>
              <ChevronRightIcon size={16} color={theme.primary} />
            </Pressable>
          </View>

          <View style={styles.productGrid}>
            {featuredProducts.map((product, index) => (
              <MotiView
                key={product.id}
                from={{ opacity: 0, scale: 0.9, translateY: 30 }}
                animate={{ opacity: 1, scale: 1, translateY: 0 }}
                transition={{ type: "spring", delay: 1000 + index * 200 }}
                style={[
                  styles.productCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={["transparent", `${theme.card}E6`]}
                  style={styles.productImageOverlay}
                />
                <View style={styles.productDetails}>
                  {renderStars(product.rating)}
                  <Text style={[styles.productName, { color: theme.text }]}>
                    {product.name}
                  </Text>
                  <Text style={[styles.productPrice, { color: theme.text }]}>
                    ${product.price.toFixed(2)}
                  </Text>
                  <Button onPress={() => {}} style={styles.addToCartButton}>
                    Add to Cart
                  </Button>
                </View>
              </MotiView>
            ))}
          </View>
        </MotiView>
      </View>

      {/* Newsletter */}
      <LinearGradient
        colors={
          isDarkMode ? [theme.card, theme.background] : ["#f8fafc", "#ffffff"]
        }
        style={styles.newsletterSection}
      >
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", delay: 1200 }}
        >
          <Badge variant="outline" style={styles.newsletterBadge}>
            Limited Time Offer
          </Badge>
          <Text style={[styles.newsletterTitle, { color: theme.text }]}>
            Subscribe to Our Newsletter and Get{" "}
            <Text style={{ color: theme.primary }}>15% Off</Text> Your First
            Order
          </Text>
          <Text
            style={[styles.newsletterSubtitle, { color: theme.secondaryText }]}
          >
            Stay updated with our latest products, exclusive deals, and style
            inspiration delivered straight to your inbox.
          </Text>
          <View style={styles.subscribeForm}>
            <TextInput
              style={[
                styles.emailInput,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
              placeholder="Enter your email"
              placeholderTextColor={theme.secondaryText}
              autoFocus={false}
            />
            <Button onPress={() => {}} style={styles.subscribeButton}>
              Subscribe
            </Button>
          </View>
        </MotiView>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    paddingTop: Constants.statusBarHeight + 16,
    paddingHorizontal: 16,
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroContent: {
    marginBottom: 32,
  },
  newCollectionBadge: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 12,
    lineHeight: 48,
  },
  heroSubtitle: {
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 24,
  },
  heroCta: {
    flexDirection: "row",
    gap: 16,
  },
  primaryButton: {
    marginRight: 12,
    position: "relative",
    overflow: "hidden",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  heroImageContainer: {
    position: "relative",
    height: 400,
    borderRadius: 24,
    overflow: "hidden",
    marginTop: 32,
    borderWidth: 1,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  customersBox: {
    position: "absolute",
    bottom: 24,
    left: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  customersIconBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  customersText: {
    fontSize: 16,
    fontWeight: "600",
  },
  featuredSection: {
    padding: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  sectionSubtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  productGrid: {
    gap: 24,
  },
  productCard: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  productImage: {
    width: "100%",
    height: 250,
  },
  productImageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  productDetails: {
    padding: 24,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "500",
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addToCartButton: {
    marginTop: 8,
  },
  newsletterSection: {
    padding: 40,
    alignItems: "center",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  newsletterBadge: {
    marginBottom: 24,
  },
  newsletterTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 24,
    lineHeight: 40,
  },
  newsletterSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 24,
    lineHeight: 24,
  },
  subscribeForm: {
    width: "100%",
    maxWidth: 480,
    gap: 16,
  },
  emailInput: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    fontSize: 16,
  },
  subscribeButton: {
    width: "100%",
    height: 56,
  },
});

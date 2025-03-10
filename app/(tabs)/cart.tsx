import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useShop, CartItem } from "../../contexts/ShopContext";
import { useTheme } from "../../contexts/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../../components/ui/button";

export default function CartScreen() {
  const {
    cart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    cartTotal,
    cartItemsCount,
  } = useShop();
  const { theme, isDarkMode } = useTheme();

  const handleCheckout = () => {
    Alert.alert("Checkout", "Your order has been placed successfully!", [
      {
        text: "OK",
        onPress: () => clearCart(),
      },
    ]);
  };

  const renderEmptyCart = () => {
    return (
      <View style={styles.emptyCart}>
        <Ionicons name="cart-outline" size={80} color={theme.secondaryText} />
        <Text style={[styles.emptyCartTitle, { color: theme.text }]}>
          Your cart is empty
        </Text>
        <Text style={[styles.emptyCartText, { color: theme.secondaryText }]}>
          Looks like you haven't added any products to your cart yet.
        </Text>
        <Button
          variant="default"
          onPress={() => {}}
          style={styles.emptyCartButton}
        >
          Start Shopping
        </Button>
      </View>
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => {
    const { product, quantity } = item;

    return (
      <View
        style={[
          styles.cartItem,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Image source={{ uri: product.image }} style={styles.productImage} />

        <View style={styles.productInfo}>
          <Text
            style={[styles.productName, { color: theme.text }]}
            numberOfLines={1}
          >
            {product.name}
          </Text>
          <Text style={[styles.productPrice, { color: theme.text }]}>
            ${product.price.toFixed(2)}
          </Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                { backgroundColor: theme.inputBackground },
              ]}
              onPress={() => updateCartItemQuantity(product.id, quantity - 1)}
            >
              <Ionicons name="remove" size={18} color={theme.secondaryText} />
            </TouchableOpacity>

            <Text style={[styles.quantityText, { color: theme.text }]}>
              {quantity}
            </Text>

            <TouchableOpacity
              style={[
                styles.quantityButton,
                { backgroundColor: theme.inputBackground },
              ]}
              onPress={() => updateCartItemQuantity(product.id, quantity + 1)}
            >
              <Ionicons name="add" size={18} color={theme.secondaryText} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemActions}>
          <Text style={[styles.itemTotal, { color: theme.text }]}>
            ${(product.price * quantity).toFixed(2)}
          </Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFromCart(product.id)}
          >
            <Ionicons name="trash-outline" size={22} color={theme.error} />
          </TouchableOpacity>
        </View>
      </View>
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
          Shopping Cart
        </Text>
        {cart.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              Alert.alert(
                "Clear Cart",
                "Are you sure you want to remove all items from your cart?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Clear",
                    onPress: () => clearCart(),
                    style: "destructive",
                  },
                ]
              );
            }}
          >
            <Text style={[styles.clearButtonText, { color: theme.error }]}>
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Cart items */}
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={[
          styles.listContent,
          cart.length === 0 && styles.emptyListContent,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyCart}
      />

      {/* Cart summary */}
      {cart.length > 0 && (
        <View
          style={[
            styles.cartSummary,
            {
              backgroundColor: theme.card,
              borderTopColor: theme.border,
            },
          ]}
        >
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.secondaryText }]}>
              Items ({cartItemsCount})
            </Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>
              ${cartTotal.toFixed(2)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.secondaryText }]}>
              Shipping
            </Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>
              Free
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>
              Total
            </Text>
            <Text style={[styles.totalValue, { color: theme.text }]}>
              ${cartTotal.toFixed(2)}
            </Text>
          </View>

          <Button
            variant="default"
            onPress={handleCheckout}
            style={styles.checkoutButton}
          >
            Proceed to Checkout
          </Button>
        </View>
      )}
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
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: "#ef4444",
    fontWeight: "500",
  },
  listContent: {
    padding: 16,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 16,
    padding: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 12,
    minWidth: 24,
    textAlign: "center",
  },
  itemActions: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingLeft: 8,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  removeButton: {
    padding: 6,
  },
  emptyCart: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyCartText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  emptyCartButton: {
    width: 200,
  },
  cartSummary: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#6b7280",
  },
  summaryValue: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  checkoutButton: {
    marginTop: 16,
  },
});

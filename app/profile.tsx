import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Switch,
  ViewStyle,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useShop } from "../contexts/ShopContext";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "../components/ui/button";

export default function ProfileScreen() {
  const { favorites, cartItemsCount } = useShop();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => console.log("User logged out"),
      },
    ]);
  };

  const renderProfileOption = (
    label: string,
    icon: string,
    onPress: () => void,
    badge?: number
  ) => {
    return (
      <TouchableOpacity
        style={[styles.profileOption, { borderBottomColor: theme.border }]}
        onPress={onPress}
      >
        <View
          style={[
            styles.optionIcon,
            { backgroundColor: theme.inputBackground },
          ]}
        >
          <Ionicons name={icon as any} size={24} color={theme.primary} />
        </View>
        <Text style={[styles.optionLabel, { color: theme.text }]}>{label}</Text>
        <View style={styles.optionAction}>
          {badge !== undefined && badge > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.secondaryText}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderToggleOption = (
    label: string,
    icon: string,
    value: boolean,
    onValueChange: (value: boolean) => void
  ) => {
    return (
      <View style={[styles.profileOption, { borderBottomColor: theme.border }]}>
        <View
          style={[
            styles.optionIcon,
            { backgroundColor: theme.inputBackground },
          ]}
        >
          <Ionicons name={icon as any} size={24} color={theme.primary} />
        </View>
        <Text style={[styles.optionLabel, { color: theme.text }]}>{label}</Text>
        <Switch
          trackColor={{ false: theme.border, true: `${theme.primary}80` }}
          thumbColor={value ? theme.primary : theme.secondaryText}
          ios_backgroundColor={theme.border}
          onValueChange={onValueChange}
          value={value}
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Profile
          </Text>
        </View>

        {/* User Info */}
        <View
          style={[styles.userInfoContainer, { backgroundColor: theme.card }]}
        >
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.text }]}>
              John Doe
            </Text>
            <Text style={[styles.userEmail, { color: theme.secondaryText }]}>
              john.doe@example.com
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.editButton,
              { backgroundColor: theme.inputBackground },
            ]}
          >
            <Ionicons name="pencil" size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Account
          </Text>
          {renderProfileOption(
            "Personal Information",
            "person-outline",
            () => {}
          )}
          {renderProfileOption("My Orders", "receipt-outline", () => {})}
          {renderProfileOption(
            "Wishlist",
            "heart-outline",
            () => {},
            favorites.length
          )}
          {renderProfileOption(
            "Shipping Addresses",
            "location-outline",
            () => {}
          )}
          {renderProfileOption("Payment Methods", "card-outline", () => {})}
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Settings
          </Text>
          {renderToggleOption(
            "Push Notifications",
            "notifications-outline",
            notifications,
            setNotifications
          )}
          {renderToggleOption(
            "Dark Mode",
            "moon-outline",
            isDarkMode,
            toggleTheme
          )}
          {renderProfileOption("Language", "language-outline", () => {})}
          {renderProfileOption("Currency", "cash-outline", () => {})}
        </View>

        {/* Help Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Support
          </Text>
          {renderProfileOption("Help Center", "help-circle-outline", () => {})}
          {renderProfileOption("Contact Us", "mail-outline", () => {})}
          {renderProfileOption(
            "Terms & Conditions",
            "document-text-outline",
            () => {}
          )}
          {renderProfileOption(
            "Privacy Policy",
            "shield-checkmark-outline",
            () => {}
          )}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            variant="outline"
            onPress={handleLogout}
            style={{ borderColor: theme.error } as ViewStyle}
          >
            Logout
          </Button>
        </View>

        {/* App Version */}
        <Text style={[styles.versionText, { color: theme.secondaryText }]}>
          App Version 1.0.0
        </Text>
      </ScrollView>
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
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9fafb",
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  userEmail: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  profileOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  optionAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
  },
  logoutContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  logoutButton: {
    borderColor: "#ef4444",
  },
  versionText: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 32,
  },
});

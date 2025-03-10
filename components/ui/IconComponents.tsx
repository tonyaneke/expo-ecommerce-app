import React from "react";
import { View, StyleSheet } from "react-native";
import {
  ShoppingBag,
  ArrowRight,
  Star,
  ChevronRight,
} from "lucide-react-native";

interface IconProps {
  size?: number;
  color?: string;
}

export const ShoppingBagIcon = ({
  size = 24,
  color = "#3b82f6",
}: IconProps) => {
  return <ShoppingBag size={size} color={color} />;
};

export const ArrowRightIcon = ({ size = 24, color = "#ffffff" }: IconProps) => {
  return <ArrowRight size={size} color={color} />;
};

export const StarIcon = ({ size = 16, color = "#f59e0b" }: IconProps) => {
  return <Star size={size} color={color} />;
};

export const ChevronRightIcon = ({
  size = 24,
  color = "#3b82f6",
}: IconProps) => {
  return <ChevronRight size={size} color={color} />;
};

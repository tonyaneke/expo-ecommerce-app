import React, { createContext, useState, useContext, ReactNode } from "react";

// Types
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  description?: string;
  category?: string;
  inStock?: boolean;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ShopContextProps {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (product: Product) => void;
  isInCart: (productId: number) => boolean;
  isFavorite: (productId: number) => boolean;
  cartTotal: number;
  cartItemsCount: number;
}

// Create context
const ShopContext = createContext<ShopContextProps | undefined>(undefined);

// Sample data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    description:
      "Experience unparalleled sound quality with our Premium Wireless Headphones. Featuring active noise cancellation, 30-hour battery life, and ergonomic design for all-day comfort.",
    category: "Electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    rating: 4.6,
    description:
      "Track your fitness goals with precision using our Smart Fitness Watch. Monitor heart rate, sleep patterns, and exercise metrics with this water-resistant, stylish accessory.",
    category: "Wearables",
    inStock: true,
  },
  {
    id: 3,
    name: "Eco-Friendly Water Bottle",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop",
    rating: 4.9,
    description:
      "Stay hydrated sustainably with our insulated stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
    category: "Lifestyle",
    inStock: true,
  },
  {
    id: 4,
    name: "Minimalist Leather Wallet",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2187&auto=format&fit=crop",
    rating: 4.7,
    description:
      "Slim, functional, and stylish. Our genuine leather wallet features RFID blocking technology and holds up to 8 cards plus cash while maintaining a sleek profile.",
    category: "Accessories",
    inStock: true,
  },
  {
    id: 5,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1964&auto=format&fit=crop",
    rating: 4.5,
    description:
      "Take your music anywhere with our rugged, waterproof Bluetooth speaker. Delivers rich, clear sound for up to 12 hours on a single charge.",
    category: "Electronics",
    inStock: true,
  },
  {
    id: 6,
    name: "Organic Cotton T-Shirt",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1974&auto=format&fit=crop",
    rating: 4.4,
    description:
      "Sustainably made with 100% organic cotton, our premium t-shirt offers breathable comfort with an eco-friendly footprint. Available in multiple colors.",
    category: "Clothing",
    inStock: true,
  },
  {
    id: 7,
    name: "Smart Home Security Camera",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop",
    rating: 4.3,
    description:
      "Monitor your home from anywhere with our HD security camera. Features motion detection, night vision, and two-way audio. Easy to install and connect to your smartphone.",
    category: "Smart Home",
    inStock: false,
  },
  {
    id: 8,
    name: "Ceramic Coffee Mug Set",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
    description:
      "Start your mornings right with our handcrafted ceramic mug set. Each mug holds 12oz and is microwave and dishwasher safe. Set of 4 in complementary colors.",
    category: "Kitchen",
    inStock: true,
  },
];

const sampleCategories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2101&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Wearables",
    image:
      "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=2187&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Clothing",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Smart Home",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1522160855172-46478d14ebf3?q=80&w=2069&auto=format&fit=crop",
  },
];

interface ShopProviderProps {
  children: ReactNode;
}

export function ShopProvider({ children }: ShopProviderProps) {
  const [products] = useState<Product[]>(sampleProducts);
  const [categories] = useState<Category[]>(sampleCategories);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Add product to cart
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Update quantity if already in cart
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevCart, { product, quantity }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  // Update cart item quantity
  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Toggle favorite
  const toggleFavorite = (product: Product) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((item) => item.id === product.id);

      if (isFavorite) {
        // Remove from favorites
        return prevFavorites.filter((item) => item.id !== product.id);
      } else {
        // Add to favorites
        return [...prevFavorites, product];
      }
    });
  };

  // Check if product is in cart
  const isInCart = (productId: number) => {
    return cart.some((item) => item.product.id === productId);
  };

  // Check if product is favorite
  const isFavorite = (productId: number) => {
    return favorites.some((item) => item.id === productId);
  };

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Calculate total number of items in cart
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    products,
    categories,
    cart,
    favorites,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    toggleFavorite,
    isInCart,
    isFavorite,
    cartTotal,
    cartItemsCount,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

// Custom hook to use shop context
export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}

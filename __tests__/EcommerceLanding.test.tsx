import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { EcommerceLanding } from "../components/EcommerceLanding";
import { ThemeProvider } from "../contexts/ThemeContext";

// Mock the LinearGradient component
jest.mock("expo-linear-gradient", () => {
  const { View } = require("react-native");
  return {
    LinearGradient: View,
  };
});

// Mock the Moti component
jest.mock("moti", () => {
  const { View } = require("react-native");
  return {
    MotiView: View,
  };
});

describe("EcommerceLanding", () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders correctly", async () => {
    const { getByText } = renderWithTheme(<EcommerceLanding />);

    // Run all animations
    await act(async () => {
      jest.runAllTimers();
    });

    // Check if main sections are rendered
    expect(getByText("New Collection 2024")).toBeTruthy();
    expect(getByText("Perfect Style")).toBeTruthy();
    expect(getByText("Featured Products")).toBeTruthy();
    expect(getByText("Limited Time Offer")).toBeTruthy();
  });

  it("displays all featured products", async () => {
    const { getByText } = renderWithTheme(<EcommerceLanding />);

    await act(async () => {
      jest.runAllTimers();
    });

    // Check if all product titles are rendered
    expect(getByText("Premium Wireless Headphones")).toBeTruthy();
    expect(getByText("Smart Fitness Watch")).toBeTruthy();
    expect(getByText("Eco-Friendly Water Bottle")).toBeTruthy();
  });

  it("displays correct product prices", async () => {
    const { getByText } = renderWithTheme(<EcommerceLanding />);

    await act(async () => {
      jest.runAllTimers();
    });

    // Check if product prices are rendered correctly
    expect(getByText("$199.99")).toBeTruthy();
    expect(getByText("$149.99")).toBeTruthy();
    expect(getByText("$29.99")).toBeTruthy();
  });

  it("handles newsletter subscription input", async () => {
    const { getByPlaceholderText, getByText } = renderWithTheme(
      <EcommerceLanding />
    );

    await act(async () => {
      jest.runAllTimers();
    });

    const emailInput = getByPlaceholderText("Enter your email");
    const subscribeButton = getByText("Subscribe");

    await act(async () => {
      fireEvent.changeText(emailInput, "test@example.com");
      fireEvent.press(subscribeButton);
    });

    expect(emailInput).toBeTruthy();
    expect(subscribeButton).toBeTruthy();
  });

  it("displays customer count", async () => {
    const { getByText } = renderWithTheme(<EcommerceLanding />);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(getByText("50K+ Happy Customers")).toBeTruthy();
  });

  it("renders all CTA buttons", async () => {
    const { getByText } = renderWithTheme(<EcommerceLanding />);

    await act(async () => {
      jest.runAllTimers();
    });

    // Check if all CTA buttons are rendered
    expect(getByText("Shop Now")).toBeTruthy();
    expect(getByText("View Catalog")).toBeTruthy();
    expect(getByText("View all products")).toBeTruthy();
  });

  it("renders product ratings", async () => {
    const { getAllByText } = renderWithTheme(<EcommerceLanding />);

    await act(async () => {
      jest.runAllTimers();
    });

    // Check for rating text instead of icons
    expect(getAllByText("4.8")).toBeTruthy();
    expect(getAllByText("4.6")).toBeTruthy();
    expect(getAllByText("4.9")).toBeTruthy();
  });
});

const palette = { 
  blue500: "#4285F4", // Primary Blue
  teal400: "#00B8A9", // Accent Teal
  green500: "#22C55E", // Success
  red500: "#EA4335",   // Error / Expense
  amber500: "#F59E0B", // Warning
  sky400: "#38BDF8",   // Info

  gray050: "#F5F5F7", // Light background
  gray200: "#E5E7EB", // Light border
  gray500: "#6B7280", // Muted text
  gray800: "#1F2937", // Dark text

  darkBg: "#0D1117",
  darkSurface: "#111827",
  darkBorder: "#374151",
};

/**
 *  Color Tokens Usage Guide
 * 
 * - text: Main body text
 * - textMuted: Secondary text (dates, helper text)
 * - background: Page background
 * - card: Surface background (cards, modals)
 * - border: Divider or card outline
 * 
 * - primary: Main brand color (buttons, highlights)
 * - onPrimary: Text/icons on top of primary
 * - accent: Secondary accent color (charts, special tags)
 * 
 * - success: Positive values (income, success state)
 * - error: Negative values (expense, error state)
 * - warning: Warning states
 * - info: Informational states (badges, labels)
 * 
 * - tint: Alias of primary, used by navigation/tab bar
 * - tabIconDefault: Inactive tab icon color
 * - tabIconSelected: Active tab icon color
 */
export default {
  light: {
    text: palette.gray800,        // Titles, main content
    textMuted: palette.gray500,   // Dates, secondary text
    background: palette.gray050,  // Screen background
    card: "#FFFFFF",              // Cards, modals
    border: palette.gray200,      // Dividers, outlines

    primary: palette.blue500,     // Buttons, highlights
    onPrimary: "#FFFFFF",         // Text/icons on top of primary
    accent: palette.teal400,      // Optional accent
    success: palette.green500,    // Income, success
    warning: palette.amber500,    // Warnings
    error: palette.red500,        // Expense, errors
    info: palette.sky400,         // Info labels
    tint: palette.blue500,        // Tab bar active tint

    tabIconDefault: "#9CA3AF",    // Inactive tab icon
    tabIconSelected: palette.blue500, // Active tab icon
  },
  dark: {
    text: "#E5E7EB",
    textMuted: "#9CA3AF",
    background: palette.darkBg,
    card: palette.darkSurface,
    border: palette.darkBorder,

    primary: palette.blue500,
    onPrimary: "#FFFFFF",
    accent: palette.teal400,
    success: palette.green500,
    warning: palette.amber500,
    error: palette.red500,
    info: palette.sky400,
    tint: palette.blue500,

    tabIconDefault: "#9CA3AF",
    tabIconSelected: palette.blue500,
  },
};

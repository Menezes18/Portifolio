import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        },
        neon: {
          blue: "#1EAEDB",
          purple: "#9b87f5",
          darkPurple: "#6E59A5",
          cyan: "#0EA5E9",
          red: "#ff274b",
        },
        vr: {
          dark: "#1A1F2C",
          darker: "#141722",
          darkest: "#0D0F17",
          charcoal: "#221F26",
          accent: "#7E69AB"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
		keyframes: {
		"pulse-dot": {
			"0%,100%": { transform: "scale(1)" },
			"50%": { transform: "scale(1.4)" }
		},
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" }
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" }
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        glow: {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": {
            filter:
              "brightness(1.2) drop-shadow(0 0 8px rgba(158, 135, 245, 0.5))"
          }
        },
        "pulse-neon": {
          "0%, 100%": {
            boxShadow:
              "0 0 5px rgba(30, 174, 219, 0.3), 0 0 15px rgba(155, 135, 245, 0.2)"
          },
          "50%": {
            boxShadow:
              "0 0 15px rgba(30, 174, 219, 0.8), 0 0 30px rgba(155, 135, 245, 0.5)"
          }
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" }
        },
        shimmer: {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        neonGlow: {
          "0%,100%": { textShadow: "0 0 8px rgba(99,102,241,.8)" },
          "50%":     { textShadow: "0 0 3px rgba(99,102,241,.4)" }
        }
      },
      animation: {
		"pulse-dot": "pulse-dot 1.2s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s infinite",
        "rotate-slow": "rotate-slow 15s linear infinite",
        shimmer:     "shimmer 6s ease-in-out infinite",
        neonGlow:    "neonGlow 4s ease-in-out infinite",
        "neon-text": "shimmer 6s ease-in-out infinite, neonGlow 4s ease-in-out infinite"
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),]
} satisfies Config;

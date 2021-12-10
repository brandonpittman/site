const fancy = require("tailwindcss-plugin-fancy");
const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");
const lineClamp = require("@tailwindcss/line-clamp");
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{mdx,js,jsx,ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-reverse": "spin-reverse 1s linear infinite",
      },
      keyframes: {
        "spin-reverse": {
          to: {
            transform: "rotate(-1turn)",
          },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            img: {
              marginTop: 0,
              marginBottom: 0,
            },
          },
        },
        lg: {
          css: {
            img: {
              marginTop: 0,
              marginBottom: 0,
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.blue.400"),
              "&:hover": {
                color: theme("colors.blue.600"),
              },
              code: { color: theme("colors.blue.400") },
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.700"),
              color: theme("colors.gray.300"),
            },
            code: {
              color: theme("colors.gray.300"),
            },
            "h1,h2,h3,h4": {
              color: theme("colors.gray.100"),
              "scroll-margin-top": theme("spacing.32"),
            },
            hr: { borderColor: theme("colors.gray.700") },
            ol: {
              li: {
                "&:before": { color: theme("colors.gray.500") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.gray.500") },
              },
            },
            strong: { color: theme("colors.gray.300") },
            thead: {
              color: theme("colors.gray.100"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
          },
        },
      }),
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
    container: { center: true, padding: "1rem" },
  },

  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        ".float-label": {
          position: "relative",
          display: "flex",
          alignItems: "center",
          paddingTop: "2rem",
          "& span": {
            position: "absolute",
            transform: "translateX(.75rem)",
            transition: "transform 150ms ease-in-out, color 150ms ease-in-out",
            transformOrigin: "0%",
            fontWeight: 700,
          },
          "& input:not(:placeholder-shown) ~ span": {
            transform: "scale(.9) translateX(.75rem) translateY(-2.25rem)",
          },
          "&:focus-within span": {
            transform: "scale(.9) translateX(.75rem) translateY(-2.25rem)",
            color: theme("colors.key"),
          },
        },
      });
    },
    function ({ addBase }) {
      addBase({
        body: {
          overscrollBehavior: "none",
          color: colors.gray["500"],
        },
      });
    },
    fancy,
    typography,
    forms,
    lineClamp,
  ],
};

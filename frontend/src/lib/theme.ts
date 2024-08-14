/* eslint-disable @typescript-eslint/ban-ts-comment */

//@ts-nocheck
import { background, extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/inter";
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  initialColorMode: 'dark',
  useSystemColorMode: true,
  colors: {
    primary: "#68D391",
    secondary: "#319795",
  },
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Inter', sans-serif",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.100",
        color: props.colorMode === "dark" ? "white" : "gray.900",
      },
    }),
  },

  // TypeScript and Vercel style buttons
  components: {
    Input: {
      baseStyle: (props) => ({
        field: {
          borderColor: props.colorMode === "dark" ? "teal.500" : "blue.500",
          _hover: {
            borderColor: props.colorMode === "dark" ? "teal.400" : "blue.400",
          },
          _focus: {
            borderColor: props.colorMode === "dark" ? "teal.300" : "blue.300",
            boxShadow: `0 0 0 1px ${
              props.colorMode === "dark" ? "teal.300" : "blue.300"
            }`,
          },
        },
      }),
    },
    Select  : {
      baseStyle: (props) => ({
        field: {
          borderColor: props.colorMode === "dark" ? "teal.500" : "blue.500",
          _hover: {
            borderColor: props.colorMode === "dark" ? "teal.400" : "blue.400",
          },
          _focus: {
            borderColor: props.colorMode === "dark" ? "teal.300" : "blue.300",
            boxShadow: `0 0 0 1px ${
              props.colorMode === "dark" ? "teal.300" : "blue.300"
            }`,
          },
        },
      }),
    },
 
    Button: {
      // Base style
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },

      // Styles for different variants
    },
    Card: {
      variants: {
        pressable: {
          padding: "40px",
        },
      },
    },
  },
});

export default theme;

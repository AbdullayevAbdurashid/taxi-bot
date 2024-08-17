/* eslint-disable @typescript-eslint/ban-ts-comment */

//@ts-nocheck
import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/inter";
import '@fontsource/poppins';
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  initialColorMode: 'dark',
  useSystemColorMode: true,
  colors: {
    primary: "#38A169",
    secondary: "#38B2AC",
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Rubik, sans-serif",
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
    InputLeftAddon: {
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
        fontWeight: "500",
        borderRadius: "lg",
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

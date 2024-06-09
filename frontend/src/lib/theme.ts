/* eslint-disable @typescript-eslint/ban-ts-comment */

//@ts-nocheck
import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/inter';
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
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
        }
      }
    }
  },
});

export default theme;

export const checkColorScheme = (tg) => {
  console.log(tg.colorScheme)
    if (tg !==undefined) {
      localStorage.setItem("chakra-ui-color-mode", "dark");
    } else {
      localStorage.setItem("chakra-ui-color-mode", "dark");
    }
  };
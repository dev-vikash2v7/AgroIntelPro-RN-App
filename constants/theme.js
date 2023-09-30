// export default colors  = {
//     primary : '#4CAF50',
//     secondary: '#FFD700',
//     background: '#FFFFFF',
//     text: '#333333',
//     accent: '#9C27B0',
//     highlight : '#FF5722',
//     success : '#4CAF50',
//     error : '#FF5252',
//     light_green:'#90EE90'
// }

const COLORS = {
    // primary: "#312651",
    primary : '#4CAF50',

    secondary: "#444262",
    tertiary: "#FF7754",
  
    gray: "#83829A",
    gray2: "#C1C0C8",
  
    white: "#F3F4F8",
    lightWhite: "#FAFAFC",

    background: '#FFFFFF',
    text: '#333333',
    accent: '#9C27B0',
    highlight : '#FF5722',
    success : '#4CAF50',
    error : '#FF5252',
    light_green:'#90EE90'
  };
  
  const FONT = {
    regular: "DMRegular",
    medium: "DMMedium",
    bold: "DMBold",
  };
  
  const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
  };
  
  const SHADOWS = {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 5,
    },
  };
  
  export { COLORS, FONT, SIZES, SHADOWS };
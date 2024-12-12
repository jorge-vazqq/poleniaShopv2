
import { extendTheme } from '@mui/joy/styles';


declare module '@mui/joy/styles' {
  // No custom tokens found, you can skip the theme augmentation.
}


const theme = extendTheme({

    components:{
        JoyMenuButton:{
            defaultProps:{
                color:'primary',
                variant:'solid',
            },
        },
    },

  "colorSchemes": {
    "light": {
      "palette": {
        "primary": {
          "50": "#eef2ff",
          "100": "#e0e7ff",
          "200": "#c7d2fe",
          "300": "#a5b4fc",
          "400": "#818cf8",
          "500": "#6366f1",
          "600": "#4f46e5",
          "700": "#4338ca",
          "800": "#3730a3",
          "900": "#312e81"
        }
      }
    },
    "dark": {
      "palette": {}
    }
  }
})

export default theme;
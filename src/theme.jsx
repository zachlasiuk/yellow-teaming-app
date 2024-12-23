import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark', 
    useSystemColorMode: true, 
  },
  fonts: {
    heading: `'Lato', 'sans-serif'`, 
    body: `'Lato', 'sans-serif'`,   
  },
  textStyles: {
    heading: {
      fontWeight: 300, 
    },
    body: {
      fontWeight: 400, 
    },
  },
  styles: {
    global: (props) => ({
      body: {
        fontSize: ['16px', '18px'], // [mobile, default]
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
      },
    }),
  },
  colors: {
    // Same scheme
    yellow: '#ffc700',      // Accent
    lightyellow: '#ffe999',
    darkyellow: '#997700',

    blue: '#11809f',        // Alternative
    lightblue: '#00c1de', 
    darkblue: '#002b49',
    
    // Grey-scale
    black: '#000',
    black1: '#010101',  // darkest
    black2: '#2d2f34',
    black3: '#383b40',
    black4: '#333e48',  // lightest
    darkgrey: '#7d868c',  
    lightgrey: '#e5eceb',
    white: '#fff',

    // State colors
    green: '#5b8200',       // success 
    orange: '#c75300',      // warning 
    red: '#e03030',         // error 


  },
  components: {
    Heading: {
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'white' : 'black',
      }),
    },
    Button: {
      baseStyle: {
        bg: 'yellow',
        color: 'black',
        _hover: {
          bg: 'lightyellow',
        },
      },
      variants: {
        solid: {
          bg: 'yellow',
          color: 'black',
          _hover: {
            bg: 'lightyellow',
          },
        },
        outline: (props) => ({
          bg: 'transparent',
          borderColor: 'yellow',
          _hover: {
            bg: props.colorMode === 'dark' ? 'black4' : 'lightgrey',
          },
        }),
      },
    },

    Table: {
      variants: {
        simple: (props) => ({
          th: {
            color: props.colorMode === "dark" ? "white" : "black",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "lg",
            margin:"0",
            paddingLeft:"0",

          },
          td: {
            color: props.colorMode === "dark" ? "white" : "black",
            paddingLeft:"0",


          },
        }),
      },
    },
    Input: {
      baseStyle: (props) => ({
        
        bg: props.colorMode === 'dark' ? 'white' : 'black4',
        color: props.colorMode === 'dark' ? 'black' : 'white',
        borderRadius: "md",
        _hover: {
          bg: "lightyellow",
        },
      }),
      variants: {
        outline: (props) => ({
          field: {
            bg: props.colorMode === 'dark' ? 'white' : 'black4',
            
            color: props.colorMode === 'dark' ? 'black' : 'white',
            borderRadius: "md",
            //borderColor: "yellow",
            borderWidth: 2,
            _hover: {
              borderColor: "yellow",
            },
            _focus: {
              bg: props.colorMode === 'dark' ? 'lightyellow' : 'darkyellow',
              borderColor: "yellow",
            },
            _placeholder: {
              color: "darkgrey", 
              fontStyle: "italic", 
            },
          },
        }),
      },
    },
    
    
    Alert: {
      baseStyle: (props) => ({
      }),
      variants: {
        subtle: (props) => ({
          container: {
            bg: props.colorMode === "dark" ? "black4" : "lightgrey", 
            color: props.colorMode === "dark" ? "white" : "black", 
            borderRadius: "md",
          },
          icon: {
            color: props.colorMode === "dark" ? "orange" : "orange", // Icon color
          },
        }),
        toast: (props) => ({
          container: {
            bg: props.colorMode === "dark" ? "lightyellow" : "lightyellow", 
            color: props.colorMode === "dark" ? "black" : "black", 
            borderColor: props.colorMode === "dark" ? "white" : "black", 
            borderRadius: "md",
            boxShadow: 'lg',
          },
          icon: {
            color: props.colorMode === "dark" ? "black" : "black", // Icon color
          },
        }),
      },
      defaultProps: {
        variant: "subtle", 
      },
    },


  },


});

export default customTheme;
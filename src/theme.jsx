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
    Accordion: {
      baseStyle: (props) => ({
        container: {
          borderTopWidth: '0px',

          borderRadius: '10px', 
          _last: {
            borderBottomWidth: '0px',
          },
        },
        button: {
          color: props.colorMode === 'dark' ? 'lightblue' : 'blue',
          fontSize: ['16px', '18px'], // Needs manual update
          _hover: {
            bg: props.colorMode === 'dark' ? 'black4' : 'lightgrey',
          },
          _expanded: {
            bg: props.colorMode === 'dark' ? 'black4' : 'lightgrey',
          },
        },
        panel: {
          pb: 4,
          bg: props.colorMode === 'dark' ? 'black4' : 'lightgrey',
        },
      }),
    },
  },


});

export default customTheme;
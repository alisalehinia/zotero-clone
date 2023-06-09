import "../../styles/globals.css"
import { Toaster } from 'react-hot-toast';
import AuthProvider from "@/context/AuthContext";
import { Container, ThemeProvider } from "@mui/material";
// import theme from "styles/theme";
import Appbar from "@/components/appbar";
import { UIProvider } from "@/context/ui"
import AppDrawer from "@/components/drawer";
import SearchBox from "@/components/search";
import "../../styles/globals.css"
import { LibraryProvider } from "@/context/LibraryContext";
import { CollectionProvider } from "@/context/CollectionContext";
import { ItemProvider } from "@/context/ItemContext";
import { CssBaseline } from '@mui/material';
import { createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { lighten } from "polished";
import { Colors } from "styles/theme";
import { MainContainer } from "styles/body";

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true
      }
    },
    MyShopButton: {
      styleOverrides: {
        root: {
          color: Colors.white
        },
        primary: {
          background: Colors.primary,
          "&:hover": {
            background: lighten(0.05, Colors.primary)
          }
        },
        secondary: {
          background: Colors.secondary,
          "&:hover": {
            background: lighten(0.05, Colors.secondary)
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 250,
          background: Colors.primary,
          color: Colors.secondary,
          borderRadius: "0px 100px 0px 0px",
          borderRight: `1px solid ${Colors.secondary}`
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: lighten(0.2, Colors.primary)
        }
      }
    }
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true
      }
    },
    MyShopButton: {
      styleOverrides: {
        root: {
          color: Colors.white
        },
        primary: {
          background: Colors.primary,
          "&:hover": {
            background: lighten(0.05, Colors.primary)
          }
        },
        secondary: {
          background: Colors.secondary,
          "&:hover": {
            background: lighten(0.05, Colors.secondary)
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 250,
          background: Colors.primary,
          color: Colors.secondary,
          borderRadius: "0px 100px 0px 0px",
          borderRight: `1px solid ${Colors.secondary}`
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: lighten(0.2, Colors.primary)
        }
      }
    }
  }
})

function getActiveTheme(themeMode) {
  return themeMode === 'light' ? lightTheme : darkTheme;
}


function MyApp({ Component, pageProps }) {
  const [activeTheme, setActiveTheme] = useState(lightTheme);
  const [selectedTheme, setSelectedTheme] = useState('light');

  const toggleTheme = () => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light';

    setSelectedTheme(desiredTheme);
  };
  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme))
  }, [selectedTheme]);

  return <AuthProvider>
    <LibraryProvider>
      <CollectionProvider>
        <ItemProvider>
          <ThemeProvider theme={activeTheme}>
            <CssBaseline />
            <MainContainer>
              <UIProvider>
                <Appbar toggleTheme={toggleTheme} />
                <Component {...pageProps} />
                <AppDrawer toggleTheme={toggleTheme} />
                <SearchBox />
                <Toaster />
              </UIProvider>
            </MainContainer>
          </ThemeProvider>
        </ItemProvider>
      </CollectionProvider>
    </LibraryProvider>
  </AuthProvider>
}

export default MyApp

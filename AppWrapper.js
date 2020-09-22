import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store'
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './App';

const AppWrapper = () => {
    return(
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <App />
            </PaperProvider>
        </Provider>
    );
};

const fontConfig = {
    default: {
      regular: {
        fontFamily: 'Raleway-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Raleway-Regular',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Raleway-Light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Raleway-Thin',
        fontWeight: 'normal',
      },
    },
  };

const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      primary: '#F24E4E',
      background: 'white',
    },
    fonts: configureFonts(fontConfig),
  };

export default AppWrapper;

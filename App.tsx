import React from 'react';
import { StatusBar, I18nManager } from 'react-native';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from '@shopify/restyle';
import theme from './src/theme/globalTheme';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import AppNavigator from 'navigation';
import tron from 'reactotron-react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import './src/i18n';
import api from 'api/api';
import { WEB_CLIENT_ID } from 'constants/index';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {
  React.useEffect(() => {
    I18nManager.forceRTL(true);
  }, []);
  const { isError } = useQuery('countries', () => {
    return api.get('/counties');
  });
  const _configureGoogleSign = () => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: false,
    });
  };
  React.useEffect(() => {
    _configureGoogleSign();
  }, []);

  return (
    <React.Fragment>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar
          barStyle={'dark-content'}
          translucent
          backgroundColor="transparent"
          animated={true}
        />
        <ThemeProvider theme={theme}>
          <AppNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
      <Toast topOffset={50} />
    </React.Fragment>
  );
};

export default () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

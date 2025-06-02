import React, {useEffect} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation';
import {StatusBar} from 'react-native';
import {theme} from './src/constants/colors';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar backgroundColor={theme.primary} barStyle="light-content" />
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;

import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </ReduxProvider>
  );
};

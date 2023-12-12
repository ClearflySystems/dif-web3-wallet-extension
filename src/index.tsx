import "reflect-metadata";
import React from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider} from '@chakra-ui/react';
import RouteBuilder from './routes/RouteBuilder';
import NautilusWalletProvider from "./services/NautilusWalletProvider";
import {VeramoProvider} from '@veramo-community/veramo-react';
import {QueryClientProvider, QueryClient} from 'react-query';
import './assets/css/theme.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('nautilus-root') as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <NautilusWalletProvider>
      <VeramoProvider>
        <ChakraProvider>
          <React.Fragment>
            <RouteBuilder/>
          </React.Fragment>
        </ChakraProvider>
      </VeramoProvider>
    </NautilusWalletProvider>
  </QueryClientProvider>
);

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { SnackbarProvider } from 'notistack';
import { RoleViewer } from './components/Role/RoleViewer';
import { MainContextProvider } from './hook/useMainContext';
import { Router } from './router/Router';
import { Role } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const App = observer(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <MainContextProvider>
          <Router />
        </MainContextProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
});

export const SingleInstanceApp = observer(({ role }: { role: Role }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <MainContextProvider>
          <RoleViewer role={role} />
        </MainContextProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
});

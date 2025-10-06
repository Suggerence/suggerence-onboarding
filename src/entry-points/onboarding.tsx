import { createRoot } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

import { Onboarding } from '@/apps/onboarding';

import '@/apps/onboarding/style.css';

/**
 * Query Client
 */

const queryClient = new QueryClient()

const persister = createAsyncStoragePersister({
    storage: window.localStorage,
})

const App = () => {
    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
            <Onboarding />
        </PersistQueryClientProvider>
    )
}

domReady(() => {
    const container = document.getElementById('suggerence-onboarding');

    if (container) {
        const root = createRoot(container);
        root.render(
            <App />
        );
    }
});
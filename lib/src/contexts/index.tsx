import React, { PropsWithChildren } from 'react';
import AppContextProvider from './App';

const PyongineProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <AppContextProvider>
            {children}
        </AppContextProvider>
    );
}

export default PyongineProvider;

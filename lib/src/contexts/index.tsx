import React, { PropsWithChildren } from 'react';
import AppContextProvider from './App';
import CodeContextProvider from './Code';
import PyodideContextProvider from './Pyodide';

const EnpyreProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
      <AppContextProvider>
        <CodeContextProvider>
          <PyodideContextProvider>
            {children}
          </PyodideContextProvider>
        </CodeContextProvider>
      </AppContextProvider>
    );
}

export default EnpyreProvider;

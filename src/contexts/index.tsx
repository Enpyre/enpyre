import React, { PropsWithChildren } from 'react';

import AppContextProvider from './App';
import CodeContextProvider from './Code';
import OutputContextProvider from './Output';
import PyodideContextProvider from './Pyodide';

const EnpyreProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <AppContextProvider>
    <CodeContextProvider>
      <OutputContextProvider>
        <PyodideContextProvider>{children}</PyodideContextProvider>
      </OutputContextProvider>
    </CodeContextProvider>
  </AppContextProvider>
);

export default EnpyreProvider;

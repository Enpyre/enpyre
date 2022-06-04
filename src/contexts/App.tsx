import { Application } from 'pixi.js';
import React, { createContext, PropsWithChildren } from 'react';

type AppContextType = {
  app: Application | undefined;
  setApp: React.Dispatch<React.SetStateAction<Application>>;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppContextProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [app, setApp] = React.useState<Application | undefined>(undefined);

  console.log('AppContextProvider: app', app);

  return (
    <AppContext.Provider value={{ app, setApp }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

import React, { createContext, PropsWithChildren } from 'react';

type CodeContextType = {
  code: string | undefined;
  setCode: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const CodeContext = createContext<CodeContextType>(
  {} as CodeContextType,
);

const CodeContextProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [code, setCode] = React.useState<string | undefined>(undefined);

  console.log('CodeContextProvider: code', code);

  return (
    <CodeContext.Provider value={{ code, setCode }}>
      {children}
    </CodeContext.Provider>
  );
};

export default CodeContextProvider;

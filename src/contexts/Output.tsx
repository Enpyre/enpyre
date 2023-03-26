import React, { createContext, PropsWithChildren, useState } from 'react';

type OutputContextType = {
  output: string[];
  setOutput: React.Dispatch<React.SetStateAction<string[]>>;
};

export const OutputContext = createContext<OutputContextType>(
  {} as OutputContextType,
);

const OutputContextProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [output, setOutput] = useState<string[]>([]);

  return (
    <OutputContext.Provider value={{ output, setOutput }}>
      {children}
    </OutputContext.Provider>
  );
};

export default OutputContextProvider;

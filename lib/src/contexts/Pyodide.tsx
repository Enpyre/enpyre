import React, { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { loadPyodide } from 'pyodide/pyodide.js';
import { loadFunctions } from '../engine';
import { useApp } from '../hooks/App';
import { useCode } from '../hooks/Code';

type PyodideContextType = {
  pyodideLoaded: boolean;
  runCode: () => void;
};

export const PyodideContext = createContext<PyodideContextType>(
    {} as PyodideContextType
);

const PyodideContextProvider: React.FC<PropsWithChildren<{}>> = ({
    children,
}) => {
    const [pyodide, setPyodide] = useState<any>();
    const [pyodidePackageLoaded, setPyodidePackageLoaded] = useState(!!window.pyodideAlreadyLoading);
    const [functionsLoaded, setFunctionsLoaded] = useState(!!window.functionsLoaded);
    const [enpyrePackageLoaded, setEnpyrePackageLoaded] = useState(!!window.enpyrePackageLoaded);
    const [pyodideLoaded, setPyodideLoaded] = useState(false);
    const { setApp } = useApp();
    const { code } = useCode();

    const runCode = useCallback(() => {
        if (pyodide) {
            pyodide.runPython(code);
        } else {
            console.error('Pyodide not loaded');
        }
    }, [pyodide, code]);

    const loadPyodideScript = useCallback(async () => {
      window.pyodideAlreadyLoading = true;
      const pyodideScript = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/'
      });
      console.log('loaded pyodide');
      setPyodide(pyodideScript);
      setPyodidePackageLoaded(true);
    }, []);

    console.log('pyodide', pyodide);
    console.log('pyodidePackageLoaded', pyodidePackageLoaded);

    const loadPackage = useCallback(async () => {
      window.enpyrePackageLoaded = true;
      console.log('loading package');
      await pyodide.loadPackage("micropip");
      await pyodide.runPythonAsync(`
          import micropip
          await micropip.install("http://localhost:8080/enpyre-0.0.1-py3-none-any.whl")
          from engine import *
      `);
      console.log('loaded package');
      setEnpyrePackageLoaded(true);
    }, [pyodide]);

    useEffect(() => {
        console.log('loadingPyodide', (window as any).loadingPyodide);
        if (!window.pyodideAlreadyLoading) {
            loadPyodideScript();
        }
    }, []);

    useEffect(() => {
        if (!window.functionsLoaded && pyodidePackageLoaded) {
            window.functionsLoaded = true;
            loadFunctions(setApp)
            setFunctionsLoaded(true);
        }
    }, [pyodidePackageLoaded]);

    useEffect(() => {
      if (!window.enpyrePackageLoaded && pyodidePackageLoaded) {
        loadPackage();
      }
    }, [pyodidePackageLoaded]);

    useEffect(() => {
        if (pyodidePackageLoaded && enpyrePackageLoaded && functionsLoaded) {
            setPyodideLoaded(true);
        }
    }, [pyodidePackageLoaded, enpyrePackageLoaded, functionsLoaded]);

    return (
        <PyodideContext.Provider value={{ pyodideLoaded, runCode }}>
            {children}
        </PyodideContext.Provider>
    );
}

export default PyodideContextProvider;

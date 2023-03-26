import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

import constants from '../config/constants';
import { loadFunctions } from '../engine';
import { useApp } from '../hooks/App';
import { useCode } from '../hooks/Code';
import { useOutput } from '../hooks/Output';
import { Pyodide } from '../types/pyodide';

type PyodideContextType = {
  pyodideLoaded: boolean;
  runCode: () => void;
};

export const PyodideContext = createContext<PyodideContextType>(
  {} as PyodideContextType,
);

const PyodideContextProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [pyodide, setPyodide] = useState<Pyodide>();
  const [functionsLoaded, setFunctionsLoaded] = useState(false);
  const [enpyrePackageLoaded, setEnpyrePackageLoaded] = useState(false);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const { setApp } = useApp();
  const { code } = useCode();
  const { setOutput } = useOutput();

  const storeOutput = React.useCallback(
    (msg: string) => {
      setOutput((previousOutput) => [...previousOutput, msg]);
    },
    [setOutput],
  );

  /**
   * Loads the pyodide engine
   */
  const loadPyodide = useCallback(async () => {
    if (window.loadPyodide && !window.pyodideAlreadyLoading && !pyodide) {
      window.pyodideAlreadyLoading = true;
      const _pyodide = await window.loadPyodide({
        stdout: storeOutput,
        stderr: storeOutput,
      });
      setPyodide(_pyodide);
      window.pyodideAlreadyLoading = false;
      setEnpyrePackageLoaded(false);
      setFunctionsLoaded(false);
      setPyodideLoaded(false);
    }
  }, [pyodide, storeOutput]);

  const loadPyodideScript = useCallback(async () => {
    const existingScript = document.getElementById('pyodide');
    if (!pyodide && !existingScript) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js';
      script.id = 'pyodide';
      document.body.appendChild(script);
      script.onload = async () => {
        await loadPyodide();
      };
    } else if (!pyodide) {
      loadPyodide();
    }
  }, [loadPyodide, pyodide]);

  useEffect(() => {
    if (!window.pyodideAlreadyLoading) {
      loadPyodideScript();
    }
  }, [loadPyodideScript, pyodide]);

  /**
   * Loads the enpyre package.
   */
  const loadPackage = useCallback(async () => {
    if (pyodide && !enpyrePackageLoaded) {
      await pyodide.loadPackage('micropip');
      await pyodide.runPythonAsync(`
          import micropip
          await micropip.install('${constants.enpyrePyURL}')
          from enpyre import *
      `);
      setEnpyrePackageLoaded(true);
    }
  }, [pyodide, enpyrePackageLoaded]);

  useEffect(() => {
    if (!enpyrePackageLoaded) {
      loadPackage();
    }
  }, [loadPackage, enpyrePackageLoaded]);

  /**
   * Loads the functions.
   */
  useEffect(() => {
    if (!functionsLoaded) {
      loadFunctions(setApp);
      setFunctionsLoaded(true);
    }
  }, [setApp, functionsLoaded]);

  /**
   * Set pyodide fully loaded.
   */
  useEffect(() => {
    if (pyodide && enpyrePackageLoaded && functionsLoaded) {
      setPyodideLoaded(true);
    }
  }, [enpyrePackageLoaded, functionsLoaded, pyodide]);

  const runCode = useCallback(() => {
    setOutput([]);
    if (pyodide && code) {
      try {
        pyodide.runPython(code);
      } catch (e) {
        if (e instanceof Error && e.name === 'PythonError') {
          const msg: string = e.message;
          setOutput((previousOutput) => [...previousOutput, msg]);
        }
      }
    } else if (!code) {
      console.error('No code to run');
    } else {
      console.error('Pyodide not loaded');
    }
  }, [pyodide, code, setOutput]);

  return (
    <PyodideContext.Provider value={{ pyodideLoaded, runCode }}>
      {children}
    </PyodideContext.Provider>
  );
};

export default PyodideContextProvider;

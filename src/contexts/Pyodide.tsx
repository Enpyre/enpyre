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

  /**
   * Loads the pyodide engine
   */
  const loadPyodide = useCallback(async () => {
    if (window.loadPyodide && !window.pyodideAlreadyLoading && !pyodide) {
      console.log('loadPyodide: Loading pyodide...');
      window.pyodideAlreadyLoading = true;
      const _pyodide = await window.loadPyodide();
      setPyodide(_pyodide);
      console.log('loadPyodide: Pyodide loaded!');
      window.pyodideAlreadyLoading = false;
      setEnpyrePackageLoaded(false);
      setFunctionsLoaded(false);
      setPyodideLoaded(false);
    }
  }, [pyodide]);

  const loadPyodideScript = useCallback(async () => {
    const existingScript = document.getElementById('pyodide');
    if (!pyodide && !existingScript) {
      console.log('loadPyodideScript: Adding pyodide script');
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js';
      script.id = 'pyodide';
      document.body.appendChild(script);
      script.onload = async () => {
        console.log('loadPyodide', window.loadPyodide);
        await loadPyodide();
      };
    } else if (!pyodide) {
      loadPyodide();
    }
  }, [loadPyodide, pyodide]);

  useEffect(() => {
    if (!window.pyodideAlreadyLoading) {
      console.log('useEffect: loadPyodideScript');
      loadPyodideScript();
    }
  }, [loadPyodideScript, pyodide]);

  /**
   * Loads the enpyre package.
   */
  const loadPackage = useCallback(async () => {
    if (pyodide && !enpyrePackageLoaded) {
      console.log('loadPackage: Loading package');
      await pyodide.loadPackage('micropip');
      await pyodide.runPythonAsync(`
          import micropip
          await micropip.install('${constants.enpyrePyURL}')
          from engine import *
      `);
      setEnpyrePackageLoaded(true);
      console.log('loadPackage: Package loaded!');
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
    console.log('runCode.pyodide', pyodide);
    console.log('runCode.code', code);
    if (pyodide && code) {
      pyodide.runPython(code);
    } else if (!code) {
      console.error('No code to run');
    } else {
      console.error('Pyodide not loaded');
    }
  }, [pyodide, code]);

  return (
    <PyodideContext.Provider value={{ pyodideLoaded, runCode }}>
      {children}
    </PyodideContext.Provider>
  );
};

export default PyodideContextProvider;

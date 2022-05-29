import React, { useState, useCallback, useEffect } from 'react';
import { loadPyodide } from 'pyodide/pyodide.js';
import { loadFunctions } from '../engine';
import { useApp } from '../hooks/App';

const Pyongine: React.FC = () => {
    const [pyodide, setPyodide] = useState<any>();
    const [pyodideLoaded, setPyodideLoaded] = useState(!!window.pyodideAlreadyLoading);
    const [functionsLoaded, setFunctionsLoaded] = useState(!!window.functionsLoaded);
    const { app, setApp } = useApp();

    const loadPyodideScript = useCallback(async () => {
        window.pyodideAlreadyLoading = true;
        const pyodideScript = await loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/'
        });
        console.log('loaded pyodide');
        setPyodide(pyodideScript);
        setPyodideLoaded(true);
    }, []);

    console.log('pyodide', pyodide);
    console.log('pyodideLoaded', pyodideLoaded);

    useEffect(() => {
        console.log('loadingPyodide', (window as any).loadingPyodide);
        if (!window.pyodideAlreadyLoading) {
            loadPyodideScript();
        }
    }, []);

    useEffect(() => {
        if (!window.functionsLoaded && pyodideLoaded) {
            window.functionsLoaded = true;
            loadFunctions(setApp)
            setFunctionsLoaded(true);
        }
    }, [app, pyodideLoaded]);

    useEffect(() => {
        if (app) {
            const canvasDiv: any = document.getElementById("canvas-container");
            canvasDiv.innerHTML = '';
            canvasDiv.appendChild(app.view);
        }
    }, [app]);

    return (
        <div>
            {functionsLoaded ? (
                <div id="canvas-container" />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Pyongine;

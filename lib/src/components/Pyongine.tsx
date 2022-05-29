import React, { useState, useCallback, useEffect } from 'react';
import { loadPyodide } from 'pyodide/pyodide.js';
import { loadFunctions } from '../engine';
import { Application } from 'pixi.js';

const Pyongine: React.FC = () => {
    const [pyodide, setPyodide] = useState<any>();
    const [pyodideLoaded, setPyodideLoaded] = useState(!!window.pyodideAlreadyLoading);
    const [functionsLoaded, setFunctionsLoaded] = useState(!!window.functionsLoaded);
    const [app, setApp] = useState<Application | undefined>(undefined);

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

    return (
        <div>
            {functionsLoaded ? (
                <>
                    <div id="canvas-container" />
                    <button onClick={() => {
                        console.log('window.drawCanvas', window.drawCanvas)
                        window.drawCanvas(300, 300, '#111111', (delta) => {})
                    }}>Render</button>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Pyongine;

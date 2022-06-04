import React from 'react';
import { EnpyreProvider, EnpyreDisplay } from '.';
import EnpyreEditor from './components/EnpyreEditor';
import { usePyodide } from './hooks/Pyodide';

const Preview: React.FC = () => {
    const { runCode } = usePyodide();
    return (
      <>
        <EnpyreDisplay />
        <EnpyreEditor />
        <button onClick={runCode}>Render</button>
      </>
    )
}

const App: React.FC = () => {
  return (
    <EnpyreProvider>
      <Preview />
    </EnpyreProvider>
  );
}

export default App;

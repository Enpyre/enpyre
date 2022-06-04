# Enpyre React Lib

A Python game engine in React.

## Install

`npm install enpyre`

`yarn add enpyre`

## Optional Dependencies

If you want to use `EnpyreEditor` you will need to install the following dependencies:

`npm install react-ace ace-builds`

`yarn add react-ace ace-builds`

## Usage

```javascript
import React from 'react';
import {
  EnpyreDisplay,
  EnpyreEditor,
  EnpyreProvider,
  usePyodide,
} from 'enpyre';

const Example: React.FC = () => {
  const { runCode } = usePyodide();

  return (
    <div>
      <EnpyreDisplay />
      <EnpyreEditor />
      <button onClick={runCode}>Run Code</button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <EnpyreProvider>
      <Example />
    </EnpyreProvider>
  );
};

export default App;
```

## Example Games

- [https://github.com/Enpyre/engine/tree/main/src/examples](https://github.com/Enpyre/engine/tree/main/src/examples)

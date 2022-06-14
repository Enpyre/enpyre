<p align="center">
  <img src="https://user-images.githubusercontent.com/7717842/173475640-ab6ca0fe-7a92-4369-92c3-3c9b72cdb21f.jpg" alt="enpyre-logo" width="358" />
</p>

<h1 align="center">
  Enpyre
</h1>

<p align="center">
  <strong>A Python game engine in React.</strong>
  <br />
  <sub>Write python games that run in React applications 👌</sub>
</p>

<br />

<p align="center">
  <a href="https://github.com/Enpyre/enpyre/actions/workflows/main.yml" target="_blank"><img src="https://github.com/Enpyre/enpyre/actions/workflows/main.yml/badge.svg" alt="build status" /></a>
  <a href="https://www.npmjs.com/package/enpyre/" target="_blank"><img src="https://img.shields.io/npm/v/enpyre/latest" alt="npm version" /></a>
  <a href="https://github.com/Enpyre/enpyre/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg" alt="license" /></a>
</p>

<br />

Enpyre is an open-source liberary to render 2D games made with Python in React with graphics by <a href="http://www.pixijs.com/">PIXI.js</a> and the power of <a href="https://pyodide.org/en/stable/">Pyodide</a>, <a href="https://webassembly.org/">WASM</a>, and modern web technologies.

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

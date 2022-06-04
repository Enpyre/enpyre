/* eslint-disable simple-import-sort/imports */
import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';

import { useCode } from '../../hooks/Code';

const EnpyreEditor: React.FC = () => {
  const { setCode } = useCode();

  return (
    <AceEditor
      mode="python"
      theme="dracula"
      name="enpyre-editor"
      onChange={setCode}
      editorProps={{ $blockScrolling: true }}
      enableBasicAutocompletion
    />
  );
};

export default EnpyreEditor;

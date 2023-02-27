/* eslint-disable simple-import-sort/imports */
import React from 'react';
import AceEditor, { IAceEditorProps } from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';

import { useCode } from '../../hooks/Code';

type EditorProps = {
  editorProps?: IAceEditorProps;
};

const EnpyreEditor: React.FC<EditorProps> = ({ editorProps }: EditorProps) => {
  const { setCode, code } = useCode();

  return (
    <AceEditor
      mode="python"
      theme="dracula"
      name="enpyre-editor"
      onChange={setCode}
      value={code}
      editorProps={{ $blockScrolling: true }}
      enableBasicAutocompletion
      {...editorProps}
    />
  );
};

export default EnpyreEditor;

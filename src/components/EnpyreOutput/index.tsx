import React from 'react';

import { useOutput } from '../../hooks/Output';

const EnpyreOutput: React.FC = () => {
  const { output } = useOutput();

  return (
    <div>
      {output?.map((msg, index) => (
        <pre key={index}>{msg}</pre>
      ))}
    </div>
  );
};

export default EnpyreOutput;

import React from 'react';

import { useOutput } from '../../hooks/Output';

const EnpyreOutput: React.FC = () => {
  const { output } = useOutput();

  return (
    <div>
      {output?.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
};

export default EnpyreOutput;

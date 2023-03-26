import { useContext } from 'react';

import { OutputContext } from '../contexts/Output';

export const useOutput = () => useContext(OutputContext);

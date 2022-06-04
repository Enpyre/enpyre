import { useContext } from 'react';

import { AppContext } from '../contexts/App';

export const useApp = () => useContext(AppContext);

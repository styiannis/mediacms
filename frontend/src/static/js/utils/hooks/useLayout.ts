import { useContext } from 'react';
import { LayoutContext } from '../contexts';

export const useLayout = () => useContext(LayoutContext);

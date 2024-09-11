/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from 'zustand';

interface IGlobalSnackbar {
  message: string;
  type: string;
  setGlobalSnackbar: any;
  onDismiss?: any;
}

export const useGlobalSnackbarStore = create<IGlobalSnackbar>((set) => ({
  message: '',
  type: 'error',
  setGlobalSnackbar: (message: string, type: string) => {
    set({ message, type });
    setTimeout(() => {
      set({ message: '', type: 'error' });
    }, 4000);
  },
  onDismiss: () => () => {},
}));

const useGlobalSnackbar = () => {
  const message = useGlobalSnackbarStore((state) => state.message);
  const type = useGlobalSnackbarStore((state) => state.type);

  const setGlobalSnackbar = useGlobalSnackbarStore(
    (state) => state.setGlobalSnackbar
  );

  const onDismiss = useGlobalSnackbarStore((state) => state.onDismiss);

  return {
    message,
    type,
    onDismiss,
    setGlobalSnackbar,
  };
};

export default useGlobalSnackbar;

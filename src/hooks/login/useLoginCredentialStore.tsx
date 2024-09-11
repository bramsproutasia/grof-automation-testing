/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from 'zustand';

interface Data {
  pin: string;
}

interface Props {
  resetPinData: Data;
  setResetPinData: (data: Data) => void;
}

export const useResetPinStore = create<Props>((set: any) => ({
  resetPinData: {
    pin: '',
    emailAddress: '',
  },
  setResetPinData: (resetPinData: any) =>
    set({
      resetPinData,
    }),
}));

export const useLoginCredentialStore = create((set: any) => ({
  credentials: {
    emailAddress: '',
    dialCode: '',
    phoneNumber: '',
    channel: '',
    mainEmailAddress: '',
  },
  updateCredentials: (credentials: any) => set(credentials),
}));

const useResetPinData = () => {
  const resetPinData = useResetPinStore((state: any) => state.resetPinData);
  const setResetPinData = useResetPinStore(
    (state: any) => state.setResetPinData
  );

  const addResetPinData = (data: any) => {
    setResetPinData({
      pin: data.pin,
      emailAddress: data.emailAddress,
    });
  };

  return { resetPinData, addResetPinData };
};

export default useResetPinData;

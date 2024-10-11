import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnected: false,
  isSolConnected: false,
  SOLpubkey:null,
  web3: null,
  darkTheme: true,
  modal: false,
  interval:null,
  inProcess: false,
  defaultAccount: null,
  chainid: null,
  translator:{},
  locale: 'en',
  
};

export const appStoreSlice = createSlice({
  name: "appStore",
  initialState: initialState,
  reducers: {
    setData: (state, action) => ({ ...state, ...action.payload }),
  }
});

export const { setData } = appStoreSlice.actions;

export const getData = (state) => state.appStore;

export default appStoreSlice.reducer;


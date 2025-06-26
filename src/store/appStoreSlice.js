import { createSlice } from '@reduxjs/toolkit';

const tredots = <><span className="loader__dot">.</span><span className="loader__dot">.</span><span className="loader__dot">.</span></>

const initialState = {
  isConnected: false,
  isSolConnected: false,
  isTronConnected: false,
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
  accountInfo:{
    balance:0,
    staked:0,
    rewards:0,
    totalOnTron:0,
    totalUnstaked:0,
    trxonpool:0,
    price:0,
    tvl:0,
    apy:0,
    fee:1000000000000000,
    withdrawable:0,
    ready:0,
  },
  emptyInfo:{
    balance:0,
    staked:0,
    rewards:0,
    totalOnTron:0,
    totalUnstaked:0,
    trxonpool:0,
    price:0,
    tvl:0,
    apy:0,
    fee:1000000000000000,
    withdrawable:0,
    ready:0,
  },
  latesttvls:{
    eth:tredots,
    bsc:tredots,
    base:tredots,
    solana:tredots,
    tron:tredots,
    polygon:tredots,
  },
  latestinfo:null,
  
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


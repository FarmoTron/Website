import './App.css';
import React, { useCallback, useState, useEffect, useMemo } from "react";
import { Route, Redirect, useHistory, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeaderSol from "./components/Header/HeaderSol";
import HeaderTron from "./components/Header/HeaderTron";
import Home from "./components/Home/Home";
import Bsc from "./components/Bsc/Bsc";
import Tron from "./components/Tron/Tron";
import Eth from "./components/Eth/Eth";
import Poly from "./components/Poly/Poly";
import Base from "./components/Base/Base";
import Sol from "./components/Sol/Sol";
import About from "./components/About/About";
import Roadmap from "./components/Roadmap/Roadmap";
import Faq from "./components/Faq/Faq";
import Bridge from "./components/Bridge/Bridge";
import Sidebar from "./components/Sidebar/Sidebar";
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { getData } from './store/appStoreSlice';
import { setStore, connect, checkBalances, getChainId, requestAccounts, connectSOL, initTronLinkWallet } from "./utils/utils";

import { ToastContainer, toast } from 'react-toastify';
import { ch,en,ru } from './utils/lang';


import 'react-toastify/dist/ReactToastify.css';



const useStyles = makeStyles((theme) => ({
  blur: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backdropFilter: "blur(3px)",
  },
  hidden: {
    display: "none",
  },
  app: {
    background: "url('/img/BG.png')",
    backgroundColor: "black",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  panelbox: {
    width: "auto",
    margin: "auto",
  },
}));

const App = (props) => {
  const classes= useStyles();
  const history = useHistory();
  const location = useLocation();
  const { modal, isConnected, defaultAccount, darkTheme, locale, web3, chainid } = useSelector(getData);
  

  
  useEffect(() => {
    if (locale == 'en') {
      setStore({translator: en});
    }
    if (locale == 'ch') {
      setStore({translator: ch});
    }
    if (locale == 'ru') {
      setStore({translator: ru});
    }
      

  }, [locale]);
  
  useEffect(() => {
    if (location.pathname =='/solana') {
      connectSOL();
    } else if (location.pathname =='/tron') {
      initTronLinkWallet();
    } else {
      connect();
    } 
  }, []);

  useEffect(() => {
    async function checkidplusaccount() {
      await requestAccounts();
      await getChainId();
    }
    checkidplusaccount();

  }, [web3]);
  
  useEffect(() => {
    if (chainid && location.pathname !='/solana' && location.pathname !='/tron' && location.pathname !='/' && location.pathname !='/about' && location.pathname !='/roadmap' && location.pathname !='/faq') {
      if (chainid == 97) { 
        if (location.pathname !='/bsc') history.push("/bsc");
      } else if (chainid == 56) { 
        if (location.pathname !='/bsc') history.push("/bsc");
      } else if (chainid == 1) { 
        if (location.pathname !='/eth') history.push("/eth");
      } else if (chainid == 11155111) { 
        if (location.pathname !='/eth') history.push("/eth");
      } else if (chainid == 137) { 
        if (location.pathname !='/polygon') history.push("/polygon");
      } else if (chainid == 80001) { 
        if (location.pathname !='/polygon') history.push("/polygon");
      } else if (chainid == 8453) { 
        if (location.pathname !='/base') history.push("/base");
      }
      checkBalances();
    }
  }, [chainid]);

  useEffect(() => {
    if (defaultAccount && chainid) {
      checkBalances();
    }
  }, [defaultAccount]);
  
  useEffect(() => {
    if (chainid) {
      if (location.pathname =='/bsc' && ( chainid != 97 && chainid != 56 )) { 
        toast("Wrong network selected.");
      } else if (location.pathname =='/eth' && ( chainid != 1 && chainid != 11155111 )) { 
        toast("Wrong network selected.");
      } else if (location.pathname =='/base' && ( chainid != 8453  && chainid != 84532)) { 
        toast("Wrong network selected.");
      } else if (location.pathname =='/polygon' && ( chainid != 137 && chainid != 80001 )) { 
        toast("Wrong network selected.");
      }
      if (defaultAccount && chainid) {
        checkBalances();
      }      
    }
  }, [location.pathname]);
  
  return (

      <div className={classes.app} id="root">
        <ToastContainer theme={darkTheme ? "dark" : "light"} />
        <Route  path="/" exact render={() =>
          <>
            <Header/>
            <Home />
            <Sidebar/>
          </>
        } />
        <Route  path="/bsc" exact render={() =>
          <>
            <Header/>
            <div className={classes.panelbox}>
              <Sidebar/>
              <Bsc />
            </div>
          </>
        } />

        <Route  path="/tron" exact render={() =>
          <>
            <HeaderTron/>
            <div className={classes.panelbox}>
              <Sidebar/>
              <Tron />
            </div>
          </>
        } />
        
        <Route  path="/eth" exact render={() =>
          <>
            <Header/>
            <div className={classes.panelbox}>
              <Sidebar/>
              <Eth />
            </div>
          </>
        } />
        
        <Route  path="/polygon" exact render={() =>
          <>
            <Header/>
            <div className={classes.panelbox}>
              <Sidebar/>
              <Poly />
            </div>
          </>
        } />
        
        <Route  path="/base" exact render={() =>
          <>
            <Header/>
            <div className={classes.panelbox}>
              <Sidebar/>
              <Base />
            </div>
          </>
        } />
        
        <Route  path="/solana" exact render={() =>

            <>
              <HeaderSol/>
              <div className={classes.panelbox}>
                <Sidebar/>
                <Sol />
              </div>
            </>

        } />
        
        <Route  path="/about" exact render={() =>
          <>
            <Header/>
            <About />
          </>
        } />
        
        <Route  path="/roadmap" exact render={() =>
          <>
            <Header/>
            <Roadmap />
          </>
        } />
        
        <Route  path="/faq" exact render={() =>
          <>
            <Header/>
            <Faq />
          </>
        } />     
        
        <Route  path="/bridge" exact render={() =>
          <>
            <Header/>
            <Bridge/>
          </>
        } />

        <Footer/>
        <div className={`${classes.blur} ${!modal ? classes.hidden : ''}`}/>

      </div>

  );
}

export default App;

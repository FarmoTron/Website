import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { getData } from "../../store/appStoreSlice";
import { useSelector } from "react-redux";
import { t, setStore, connect, minimize, mintTokens } from "../../utils/utils";
import { formatNumber } from '../../utils/helper';

import _ from "lodash";

import './style.css';

import Config from '../../config';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  firstroot: {
    padding: "20px 122px 0",
    lineHeight: "37px",
    "@media (max-width: 767.98px)": {
      width: "auto",
      height: "auto",
      padding: 0,
    },
  },
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "25px",
    lineHeight: "37px",
    margin: "12px",
    padding: "12px",
    width: "100%",
    borderRadius: "50px",
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(10px)",
    "@media (max-width: 767.98px)": {
      width: "auto",
      height: "auto",
      padding: 0,
      flexDirection:"column",
      background: "none",
    },
  },
  burger_mobile: {
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width: 767.98px)": {
      width: "100%",
    },
    
  },
  line: {
    display: "flex",
    alignItems: "center",
  },
  burger_button: {
    width: '48px',
    height: '48px',
    display: "none",
    "@media (max-width: 767.98px)": {
      display: "block",
    },
  },
  burger_menu: {
    display: "flex",
    justifyContent: "space-around",
    "@media (max-width: 767.98px)": {
      display: "none",
    },
  },
  open_burger_menu: {
    display: "flex",
    justifyContent: "space-around",
    "@media (max-width: 767.98px)": {
      flexDirection:"column",
    },
  },
  logo: {
    color: "white",
    margin: 0,
  },
  logo_link: {
    textDecoration: "none",
    color: "#b65c5d",
    lineHeight: "0px",
    marginLeft: "20px",
  },
  logo_sub: {
    color: "#090E2E",
  },
  menu_link: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "30px",
    color: "#a6817a",
    textDecoration: "none",
    cursor: "pointer",
    padding: "10px",
  },
  menu_link_active: {
    fontWeight: 800,
    fontSize: "18px",
    lineHeight: "30px",
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
    padding: "10px",
  },
  wallet_link: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "30px",
    color: "#000",
    background: "rgba(217, 217, 217, 0.79)",
    borderRadius: "30px",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", 
    textDecoration: "none",
    cursor: "pointer",
    padding: "10px 20px",
  },
  mint_link: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "30px",
    color: "#000",
    background: "rgba(217, 217, 217, 0.79)",
    borderRadius: "30px",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", 
    textDecoration: "none",
    cursor: "pointer",
    padding: "0px 10px",
    margin: "10px",
  },
  connected_wallet_link: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "30px",
    color: "#000",
    background: "rgba(217, 217, 217, 0.79)",
    borderRadius: "30px",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", 
    textDecoration: "none",
    cursor: "pointer",
    padding: "10px  20px",
  },
  search_field: {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    borderStyle: "none!important",
    borderRadius: "10px!important",
    color: "rgba(255,255,255,0.5)!important",
  },
  search_root: {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    borderStyle: "none!important",
    borderRadius: "10px!important",
    color: "rgba(255,255,255,0.5)!important",
    height: "50px",
    width: "25%",
    marginRight: "100px!important",
    "@media (max-width: 767.98px)": {
      width: "100%",
    },
  },
  search_input: {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    borderStyle: "none!important",
    borderRadius: "10px!important",
    padding: "10.5px 14px!important",
    fontFamily: "Poppins, sans-serif!important",
    fontStyle: "normal!important",
    fontWeight: "500!important",
    fontSize: "20px!important",
    lineHeight: "30px!important",
  },
  search_icon: {
    color: "rgba(255,255,255,0.5)!important",
  },
  smallline:{
    fontSize: "10px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "12px",
    padding: "12px",
    color: "#EEE",
    flexWrap: "wrap",
    width: "auto",
    "@media (max-width: 767.98px)": {
      margin: "0",
    },
  },
  delimiter: {
    margin: "6px",
  },
  smallt:{
    fontSize: "12px",
    fontWeight: "700",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const { isConnected, defaultAccount, chainid, accountInfo } = useSelector(getData);
  const [burgButton, setBurgButton] = useState(false);
  const [knownchain, setKnownchain] = useState('/img/empty.png');


  const closeBurger = () => {
    setBurgButton(false);
  }
  
  const minttoken = () => {
      mintTokens();
  }
  
  const handleBurger = () => {
    setBurgButton(!burgButton);
  }
  
  const handleConnectWallet = (e) => {
    connect();
  }
  
  useEffect(() => {
    if (chainid) {
      if (chainid == 97) { 
        setKnownchain('/img/bsc_test.png')
      } else if (chainid == 56) { 
        setKnownchain('/img/bsc.png')
      } else if (chainid == 1) { 
        setKnownchain('/img/ethereum.png')
      } else if (chainid == 11155111) { 
        setKnownchain('/img/ethereum_test.png')
      } else if (chainid == 137) { 
        setKnownchain('/img/networks/polygon.png')
      } else {
        setKnownchain('/img/empty.png')
      }
    } else {
      setKnownchain('/img/empty.png')
    }
  }, [chainid]);
  
  return (
  <div className={classes.firstroot}>
    <div className={classes.root}>
      <div className={classes.burger_mobile}>
        <Link className={classes.logo_link} exact to="/"><img src="/img/logo.png" alt="" height="80" /></Link>
        <div className={classes.burger_button} onClick={handleBurger}><img src="/img/menu.png" width="48" /></div>
      </div>
      <div className={burgButton ? classes.open_burger_menu : classes.burger_menu} >
        <Link className={ location.pathname =='/' ? classes.menu_link_active : classes.menu_link} exact to="/">
          <div className={classes.menu_text} >{t("Home")}</div>
        </Link>
        <Link className={ location.pathname =='/about' ? classes.menu_link_active : classes.menu_link} exact to="/about">
          <div className={classes.menu_text} >{t("About")}</div>
        </Link>
        <Link className={ location.pathname =='/bridge' ? classes.menu_link_active : classes.menu_link} exact to="/bridge">
          <div className={classes.menu_text} >{t("Bridge")}</div>
        </Link>
      </div>
      <div className={burgButton ? classes.open_burger_menu : classes.burger_menu} >
        <div className={classes.wallet}>
          { 
            !isConnected 
            ? <div className={classes.wallet_link} onClick={handleConnectWallet}><img width="24" height="24" src="/img/connect.png"/> {t("Connect Wallet")}</div>
            : <div className={classes.connected_wallet_link}>
                <div className={classes.line}>
                  <img src={ knownchain } alt="" height="24" width="24"  />
                  <span className={classes.delimiter}> </span>
                  { minimize(defaultAccount) }
                </div>
              </div>
          }              
        </div>
      </div>
    </div>
  
  <div className={classes.smallline}>
    <img src={ knownchain } alt="" height="24" width="24"  />
    <span className={classes.delimiter}> </span>
    {t("Available TRX Balance")}: <span  className={classes.smallt}>{ formatNumber(accountInfo.balance) }</span>TRX <span className={classes.delimiter}> | </span>
    {t("Farmotron FTT")}: <span className={classes.smallt}>{ formatNumber(accountInfo.staked) }</span>  <span className={classes.delimiter}> | </span>
    {t("Staked")}: <span className={classes.smallt}>{ formatNumber(accountInfo.staked * accountInfo.price) }</span>TRX
    
    { 
      isConnected && chainid && Config.testnet
      ? <div className={classes.mint_link} onClick={()=>minttoken()}>{t("Get 2000 Test TRX")}</div>
      : <></>
    }
  </div>
    
  </div>
  );
}

export default Header;

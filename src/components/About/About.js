import React, { useState, useEffect } from "react";
import { withRouter, Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Button,TextField,Switch } from "@mui/material";
import { setStore, t } from "../../utils/utils";
import { formatNumber, BigNumber } from '../../utils/helper';
import { toast } from 'react-toastify';
import { getData } from "../../store/appStoreSlice";
import { useSelector } from "react-redux";
import Config from '../../config';
import _ from "lodash";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontStyle: "normal",
    padding: "20px 122px 0",
    justifyContent: "space-around",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    flexDirection: "column",
    lineHeight: "20px",
    alignItems: "center",
    color: "#FFF",
    "@media (max-width: 767.98px)": {
      width: "auto",
      height: "auto",
      padding: 0,
      flexDirection:"column",
    },
  },

  title: {
    color: "#FFF",
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "18px",
    margin: "12px",
    textAlign: "center",
  },
  title_left: {
    color: "#FFF",
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "18px",
    margin: "12px",
    textAlign: "left",
  },

  imgabout: {
    maxWidth: "1024px",
    width: "100%",
  },
  pad: {
    padding: "32px",
  },
  textes:{
    
    fontFamily: 'Inter',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "29px",
    color: "#FFFFFF",
  },
  selectes:{
    
    fontFamily: 'Inter',
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "18px",
    lineHeight: "29px",
    color: "#FFFFFF",
  },
  
}));

const About = (props) => {
  const classes = useStyles();
  const { modal,isConnected,defaultAccount,activeItem,accountInfo,infoenergy } = useSelector(getData);
  const navigate = useHistory();


  return (
    <div className={classes.root}>
      <div className={ classes.title }><img  className={ classes.imgabout } src="/img/FarmoTron.png" alt=""  /></div>
      <div className={ classes.title }>Deposit your TRX tokens into a "farm".</div>
      <div className={classes.pad}> </div>
      
      <img src="/img/about.png" alt="FarmoTron" className={ classes.imgabout }/>
      <div className={classes.pad}> </div>
      
      <div>
        <div className={ classes.title_left }>How Farmotron Works:</div>

        <p className={ classes.textes }><span  className={ classes.selectes}>1. Staking Your Assets</span><br/> Farmotron allows users to stake their Tron-based assets directly on our platform. Once you stake, the assets are immediately routed through Farmotron to our smart contract, which manages the entire staking process.</p>

        <p className={ classes.textes }><span  className={ classes.selectes}>2. Tron Energy Marketplace Integration</span><br/> Once your assets are received by the smart contract, they are sent to TronEnergize.com, a decentralized energy marketplace. TronEnergize allows users to buy and sell energy, a vital resource for transactions within the Tron network. By utilizing this marketplace, your staked assets earn yield from energy sales, maximizing the return on your stake.</p>

        <p className={ classes.textes }><span  className={ classes.selectes}>3. Dynamic Locking Periods</span><br/> The locking period for your staked assets is not fixed. Instead, it depends on how much energy is available and how it is sold:<br/>
        If all energy is sold in a 30-day order, your assets will be locked for a total of 30 + 14 days (14 days for processing and settlement).<br/>
        If there is free energy available, the lock period may be as short as one day, providing you with flexibility and faster access to your rewards.</p>

        <p className={ classes.textes }><span  className={ classes.selectes}>4. Yield Distribution</span><br/> Once your staked assets generate yield from TronEnergize, the smart contract collects the earnings and distributes the rewards back to you. This automated process ensures that you consistently receive the highest possible returns, all without needing to manually manage your stake.</p>

        <p className={ classes.textes }><span  className={ classes.selectes}>5. Transparent and Secure</span><br/> All staking operations are managed by the smart contract, ensuring full transparency and security. You can track your assets, rewards, and staking periods in real-time, providing you peace of mind while your assets work for you.</p>
      </div>
      <div className={classes.pad}> </div>

    </div>
  )
}

export default withRouter(About);

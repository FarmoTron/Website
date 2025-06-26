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

const Roadmap = (props) => {
  const classes = useStyles();
  const { modal,isConnected,defaultAccount,activeItem,accountInfo,infoenergy } = useSelector(getData);
  const navigate = useHistory();


  return (
    <div className={classes.root}>
      <div className={ classes.title }><img  className={ classes.imgabout } src="/img/FarmoTron.png" alt=""  /></div>
      <div className={ classes.title }>Deposit your TRX tokens into a "farm".</div>
      <div className={classes.pad}> </div>
      
      <img src="/img/roadmap.png" alt="FarmoTron Roadmap" className={ classes.imgabout }/>
      <div className={classes.pad}> </div>
      
      <div>

      </div>
      <div className={classes.pad}> </div>

    </div>
  )
}

export default withRouter(Roadmap);

import React, { useState, useEffect } from "react";
import { withRouter, Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { t, gettvls } from "../../utils/utils";
import { getData } from "../../store/appStoreSlice";
import { useSelector } from "react-redux";
import _ from "lodash";


const useStyles = makeStyles((theme) => ({

  left: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "@media (max-width: 767.98px)": {
      flexDirection:"column",
      width: "100%",
    },
  },

  menu_link: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "30px",
    color: "#FFF",
    textDecoration: "none",
    cursor: "pointer",
    padding: "12px",
    display: "flex",
    width: "140px",
    height: "140px",
    background: "rgba(255, 255, 255, 0.17)",
    backdropFilter: "blur(20px)",
    borderRadius: "34px",
    margin: "12px",
    "@media (max-width: 767.98px)": {
      margin: "12px",
      borderRadius: "12px",
      width: "auto",
    },
  },
  block: {
    textAlign: "center",
    color: "white",
  },
  menu_link_active: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "30px",
    color: "#FFF",
    textDecoration: "none",
    cursor: "pointer",
    padding: "12px",
    alignItems: "center",
    display: "flex",
    width: "140px",
    height: "140px",
    background: "rgba(255, 255, 255, 0.64)",
    backdropFilter: "blur(20px)",
    borderRadius: "34px",
    margin: "12px",
    "@media (max-width: 767.98px)": {
      width: "auto",
      margin: "12px",
      borderRadius: "12px",
    },
    
  },
  menu_text: {

    padding: "0 12px",

  },

}));

const Sidebar = (props) => {
  const classes = useStyles();
  const { defaultAccount, latesttvls } = useSelector(getData);
  const location = useLocation();
  useEffect(() => {
    console.log(location)

  }, [location]);
  
  useEffect(() => {
    gettvls();
  }, []);
  
  
  
  

  return (

    <div className={classes.left}>
      <div className={classes.block}>
        <Link className={ location.pathname =='/eth' ? classes.menu_link_active : classes.menu_link} exact to="/eth">
          <img src="/img/networks/ethereum.png" alt="" width="100"  />
        </Link>
        <span>{latesttvls.eth}</span>
      </div>
      <div className={classes.block}>
        <Link className={ location.pathname =='/bsc' ? classes.menu_link_active : classes.menu_link} exact to="/bsc">
          <img src="/img/networks/bsc.png" alt="" width="100"  />
        </Link>
        <span>{latesttvls.bsc}</span>
      </div>
      <div className={classes.block}>
        <Link className={ location.pathname =='/base' ? classes.menu_link_active : classes.menu_link} exact to="/base">
          <img src="/img/networks/base.png" alt="" width="100"  />
        </Link>
        <span>{latesttvls.base}</span>
      </div>
      <div className={classes.block}>
        <Link className={ location.pathname =='/solana' ? classes.menu_link_active : classes.menu_link} exact to="/solana">
          <img src="/img/networks/solana.png" alt="" width="100"  />
        </Link>
        <span>{latesttvls.solana}</span>
      </div>
      <div className={classes.block}>
        <Link className={ location.pathname =='/tron' ? classes.menu_link_active : classes.menu_link} exact to="/tron">
          <img src="/img/networks/tron.png" alt="" width="100"  />
        </Link>
        <span>{latesttvls.tron}</span>
      </div>


      </div>
  )
}

export default withRouter(Sidebar);

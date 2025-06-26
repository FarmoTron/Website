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
    color: "#FFF",
    "@media (max-width: 767.98px)": {
      width: "auto",
      height: "auto",
      padding: 0,
      flexDirection:"column",
    },
  },
  title_left: {
    color: "#FB3103",
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "18px",
    margin: "12px",
    textAlign: "left",
  },
  title: {
    color: "#FB3103",
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "18px",
    margin: "12px",
    textAlign: "center",
  },
  img: {
    maxWidth: "100%",
  },
  hidden: {
    display: "none",
  },
  faqblock: {
    display: "flex",
    flexWrap: "wrap",
  },
  container: {
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.99)",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    margin: "12px",
    padding: "12px",
    color:"#000",
    flex: "0 1 calc(50% - 54px)",
    "@media (max-width: 767.98px)": {
      flex: "1",
    },
  },
  minus: {
    textAlign: "right",
    color: "#FFF",
    background: "#FD9302",
    borderRadius: "8px",
    padding: "12px 18px",
    height: "fit-content",
  },
  containertitle: {
    display: "flex",
    justifyContent: "space-between",
  },
  textes: {
    margin: "14px",
  },
}));

const Faq = (props) => {
  const classes = useStyles();
  const { modal,isConnected,defaultAccount,activeItem,accountInfo,infoenergy } = useSelector(getData);
  const navigate = useHistory();

  const faq = [
    {title:"How does staking on Farmotron work?", txts:"Farmotron allows users to stake their Tron-based assets. Once staked, these assets are sent to a smart contract, which forwards them to TronEnergize.com, where they earn yield from energy sales.", open:false},
    {title:"What is TronEnergize.com?", txts:"TronEnergize.com is a decentralized marketplace that facilitates the sale of Tron energy, which is required for processing transactions within the Tron network. Farmotron uses this marketplace to generate yield from the energy sales, benefiting users who stake their assets.", open:false},
    {title:"How is the yield determined?", txts:"The yield is generated based on how much Tron energy is sold on TronEnergize.com. It can vary depending on energy demand and market conditions. The more energy sold, the higher the yield for your staked assets.", open:false},
    {title:"How long will my assets be locked?", txts:"The lock period depends on how energy is sold: If all energy is sold in a 30-day order, your assets will be locked for 30 days plus an additional 14 days for processing. If there is free energy available, your assets may only be locked for one day.", open:false},
    {title:"What happens after the locking period ends?", txts:"After the locking period ends, the smart contract collects the yield from TronEnergize and distributes the rewards directly to your wallet.", open:false},
    {title:"How often are rewards distributed?", txts:"Rewards are distributed once the staking period ends and the yield is collected from the energy marketplace. You can view your reward status in real-time on the Farmotron platform.", open:false},

  ]
  const [items, setItems ] = useState(faq);
  
  const opclo = (item) => {
    item.open = !item.open;
    setItems([...items]);
  }
  
  const renderFQs = (items) => {
    return (
      items.map((item)=>{
        return (
          <div className={classes.container} onClick={()=>opclo(item)}>
            <div className={classes.containertitle}>
              <div className={ classes.title_left }>{item.title}</div>
              <div className={ item.open? classes.minus : classes.hidden }>-</div>
              <div className={ item.open? classes.hidden : classes.minus }>+</div>
            </div>
            <div className={ item.open? classes.textes : classes.hidden }>{item.txts}</div>
          </div>
        )
      })
    )
  }
  return (
    <div className={classes.root}>
      <div className={ classes.title }><img  className={ classes.img } src="/img/FarmoTron.png" alt=""  /></div>
      <div className={ classes.title_left }>Deposit your TRX tokens into a "farm".</div>
      <div className={ classes.title }>FAQ</div>
      <div className={ classes.faqblock }>
        {renderFQs(items)}
      </div>
    </div>
  )
}

export default withRouter(Faq);

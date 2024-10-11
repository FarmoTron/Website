import React, { useState, useEffect } from "react";
import { withRouter, Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Button,TextField,Switch } from "@mui/material";
import { setStore, t, stakeSOL, withdrawSOL, unstakeSOL } from "../../utils/utils";

import { toast } from 'react-toastify';
import { getData } from "../../store/appStoreSlice";
import { useSelector } from "react-redux";
import Config from '../../config';
import _ from "lodash";
import { formatNumber } from '../../utils/helper';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontStyle: "normal",

    justifyContent: "space-between",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",

    lineHeight: "20px",
    color: "#FFF",
    "@media (max-width: 767.98px)": {
      width: "auto",
      height: "auto",
      padding: 0,
      flexDirection:"column",
    },
  },
  titlebox: {
    color: "#FFF",
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "18px",
    margin: "12px",
    textAlign: "center",
  },
  title: {
    textAlign: "center",
  },
  tvlblock: {
    padding: "12px",
    transition: "all 1s",
  },
  ordercard: {
    padding: "12px",
    margin: "12px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(0, 0, 0, 0.10)",
    borderRadius: "5px",

    background: "rgba(138, 123, 123, 0.34)",


  },
  line: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    width: "11%",
    fontWeight: "700",
    "@media (max-width: 767.98px)": {
      width: "30%",
    },
  },
  line_s: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "-14px",
    padding: "0 24px",
  },
  item_s: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    width: "11%",
    fontWeight: "700",
    "@media (max-width: 767.98px)": {
      width: "30%",
    },
  },
  item_ss: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    width: "124px",
    fontWeight: "700",
    "@media (max-width: 767.98px)": {
      width: "30%",
    },
  }, 
  itemaw: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",

    fontWeight: "700",

  },
  mitem: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",

    fontWeight: "700",


  },
  ritem: {
    fontSize: "14px",
    fontWeight: "700",
    textAlign:"right",
  },  
  linebutton: {
    borderRadius: "5px",
    display: "flex",
    background: "rgba(254, 44, 44, 0.31)",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "37px",
    textAlign: "center",
    margin: "8px 12px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#FFF",
  },
  disabledbutton: {
    borderRadius: "5px",
    display: "flex",
    background: "rgba(138, 123, 123, 0.34)",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "37px",
    textAlign: "center",
    marginTop:  "14px",
    fontSize: "12px",
    color: "#FFF",
    fontWeight: "400",
    width:"124px",
    cursor:"pointer",
    "@media (max-width: 767.98px)": {
      width: "100%",
    },
  },
  box: {
    display: "flex",
    flexDirection:"column",
    height: "100vh",
    overflowY: "auto",
  },
  infobox: {
    display: "flex",
    flexDirection:"row",
    height: "0px",
    overflow: "visible",
    paddingLeft: "8px",
    paddingRight: "8px",
    "@media (max-width: 767.98px)": {
      height: "auto",
    },
  },
  
  infoboxflex: {
    display: "flex",
    flexDirection:"row",
    height: "0px",
    overflow: "visible",
    paddingLeft: "8px",
    paddingRight: "8px",
    justifyContent: "space-between",
    "@media (max-width: 767.98px)": {
      height: "auto",
    },
  },
  left: {
    flexDirection: "column",
    width: "430px",
    display: "flex",
  },
  container: {
    borderRadius: "40px",
    background: "rgba(255, 255, 255, 0.08)",
    border: "2px solid rgba(255, 255, 255, 0.12)",
    margin: "12px",
    padding: "12px",
  },
  smitem: {
    fontWeight: "normal",
    fontSize: "9px",
    lineHeight: "14px",
    margin: "0",
    fontWeight: "400",
  },
  smitemclick: {
    fontWeight: "normal",
    fontSize: "9px",
    lineHeight: "14px",
    margin: "0",
    fontWeight: "400",
    cursor:"pointer",
  },
  bitem: {
    fontSize: "14px",
    lineHeight: "14px",
    margin: "0",
    fontWeight: "700",
  },
  smritem: {
    fontWeight: "normal",
    fontSize: "10px",
    lineHeight: "14px",
    margin: "0",
    textAlign: "right",
    fontWeight: "400",
  },
  right: {
    width: "100%",
  },
  menu_link: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "30px",
    color: "#FFF",
    textDecoration: "none",
    cursor: "pointer",
    padding: "12px",
    alignItems: "center",
    display: "flex",
  },
  menu_link_active: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "30px",
    color: "#FFF",
    textDecoration: "none",
    cursor: "pointer",
    padding: "12px",
    alignItems: "center",
    display: "flex",
    borderRadius: "16px",
    background: "linear-gradient(164deg, #BEAE1F 13.54%, #950404 43.23%, #951E04 68.86%, #CD9402 97.92%)",
    
  },
  menu_text: {

    padding: "0 12px",

  },
  hidden: {

    display: "none",

  },
  innerblock: {
    height:"230px",
  },
  block_flex: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    margin: "4px",
  },
  zcontainer: {
    borderRadius: "10px",
    background: "rgba(138, 123, 123, 0.6)",
    margin: "auto",
    padding: "12px",
    zIndex: "111",
    width: "400px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  filledbox: {
    justifyContent: "center",
    display: "flex",
    borderRadius: "5px",

    flexDirection:"column",
    padding: "24px",
    width: "240px",
    margin: "auto",
    alignItems: "center",
  },
  bigimg: {
    width: "180px",
    height: "180px",
    transition: "all 0.2s",
    background: "rgba(0, 0, 0, 0.64)",
    backdropFilter: "blur(20px)",
    borderRadius: "34px",
    
  },
  smallimg: {
    width: "60px",
    height: "60px",
    transition: "all 0.2s",
    background: "rgba(0, 0, 0, 0.64)",
    backdropFilter: "blur(20px)",
    borderRadius: "8px",
    
  },

  start_button: {
    borderRadius: "5px",
    display: "flex",
    background: "rgba(138, 123, 123, 0.34)",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "37px",
    textAlign: "center",
    fontSize: "10px",
    color: "#FFF",
    fontWeight: "400",
    marginTop: "14px!important",
    width: "100%",
    cursor: 'pointer',

    backgroundColor: "rgba(138, 123, 123, 0.34)!important",
    textTransform: "initial!important",
    "&:hover": {
      backgroundColor: "rgba(138, 123, 123, 0.34)!important",
    }
  },
  disabled_button: {
    borderRadius: "5px",
    display: "flex",
    background: "rgba(138, 123, 123, 0.34)",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "37px",
    textAlign: "center",
    fontSize: "10px",
    color: "#eee",
    fontWeight: "400",
    marginTop: "14px!important",
    width: "100%",


    backgroundColor: "rgba(138, 123, 123, 0.34)!important",
    textTransform: "initial!important",
    "&:hover": {
      backgroundColor: "rgba(138, 123, 123, 0.34)!important",
    }
  },
  textField_root: {
    marginTop: "15px!important",
    width: "100%",
  },
  textField: {
    color: "#FFF!important",
    "&::before": {
      borderBottom: "1px solid #FFF!important",
    },
    "&::after": {
      borderBottom: "1px solid rgba(138, 123, 123, 0.5)!important",
    }
  },
  block: {
    margin: "4px",
  },
  
  
    swroot: {
      width: "38px !important",
      height: "28px !important",
    },
    swswitchBase: {
//      padding: 1,
      '&.Mui-checked': {
        // This is the part that animates the thumb when the switch is toggled (to the right)
//        transform: 'translateX(10px) !important',
        // This is the thumb color
        //color: theme.palette.common.white,
        '& + .MuiSwitch-track': {
          // This is the track's background color (in this example, the iOS green)
          backgroundColor: '#B40F09 !important',
//          opacity: 1,
//          border: 'none',
        },
      },
    },
    swthumb: {
      width: "10px !important",
      height: "10px !important",
    },
    swtrack: {
//      padding: 2,
      //borderRadius: 19,
      //border: `1px solid ${theme.palette.grey[300]}`,
      // This is the background color when the switch is off
      //backgroundColor: theme.palette.grey[200],
      //height: 30,
      //opacity: 1,

      //transition: theme.transitions.create(['background-color', 'border']),
    },
    swchecked: {
            transform: 'translateX(10px) !important',
            color: '#B40F09 !important',

    },
    swfocusVisible: {
//            padding: 4,

    },
  
}));

const Sol = (props) => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>

      <div className={classes.right}>
        <div className={classes.container}>
          <div className={classes.headerblok}>
            <div className={classes.infoboxflex}>
              <div className={classes.infobox}>
                <div className={classes.block}>
                  <p className={classes.smitem}>{t("Pools")}</p>
                  <p className={classes.bitem}>1</p>
                </div>
                <div className={classes.block}>
                  <p className={classes.smitem}>{t("APY")}</p>
                  <p className={classes.bitem}>{ formatNumber(bscInfo.apy) }<span className={classes.smritem}>%</span></p>
                </div>
              </div>
              <div className={classes.infobox}>
                <div className={classes.block}>
                  <p className={classes.smitem}>{t("TVL")}</p>
                  <p className={classes.bitem}>{ formatNumber(bscInfo.tvl * bscInfo.price) }<span className={classes.smritem}>TRX</span></p>
                </div>
                <div className={classes.block}>
                  <p className={classes.smitem}>{t("Rewards")}</p>
                  <p className={classes.bitem}>{ formatNumber( (bscInfo.tvl * bscInfo.price) - bscInfo.tvl ) }<span className={classes.smritem}>TRX</span></p>
                </div>
              </div>
            </div>          
            <h1 className={classes.titlebox}>{t("Pools")}</h1>
            
            <div className={ classes.filledbox }>
              <div className={ classes.title } >TRX Pool (Solana)</div>
              <div className={ classes.smritem }>Buy and Stake your TRX and get rewards</div>
              <div className={ classes.innerblock }>
                <div className={ state=='new' ? classes.block : classes.block_flex }>
                  <img src="/img/tron.png" alt="TRX"  className={state=='new' ? classes.bigimg : classes.smallimg} />
                  <div className={ classes.tvlblock }>
                    <div className={ classes.title }>{ formatNumber(bscInfo.apy) }% APY </div>
                    <div className={ classes.title }>{ formatNumber(bscInfo.tvl * bscInfo.price) }<span className={ classes.smritem }>TRX</span> TVL </div>
                  </div>
                </div>
                <div className={ state=='stake' ? classes.block : classes.hidden }>
                  <TextField 
                    id="amount" 
                    label={t("Sol amount")}
                    type="number" 
                    variant="standard"
                    error={vnrgMsg != ""}
                    helperText={vnrgMsg}
                    onChange={changeAmount()}
                    value={amount}
                    classes={{root: classes.textField_root}}
                    InputLabelProps={{classes: {root: classes.textField}}}
                    InputProps={{classes: {underline: classes.textField}}}
                  />            

                </div>
                <div className={ state=='withdraw' ? classes.block : classes.hidden }>
                  {bscInfo.withdrawable} SOL
                </div>
                <div className={  state=='unstake' ? classes.block : classes.hidden  }>
                  <TextField 
                    id="withdrawTRXamount" 
                    label={t("TRX amount")}
                    type="number" 
                    variant="standard"
                    error={vnrgMsg != ""}
                    helperText={vnrgMsg}
                    onChange={changeWithdrawTRXamount()}
                    value={withdrawTRXamount}
                    classes={{root: classes.textField_root}}
                    InputLabelProps={{classes: {root: classes.textField}}}
                    InputProps={{classes: {underline: classes.textField}}}
                  />            

                </div>
              </div>

              
              { state == 'stake' && 
                <>
                  <div className={ inProcess ? classes.disabled_button : classes.start_button } onClick={confirmStake}>{btnTXT}</div>
                </>
              }
              { state == 'unstake' && 
                <>
                  <div className={ inProcess ? classes.disabled_button : classes.start_button } onClick={confirmUnstake}>{btnTXT}</div>
                </>
              }
              { state == 'withdraw' && 
                <>
                  <div className={ inProcess ? classes.disabled_button : classes.start_button } onClick={confirmWithdraw}>{btnTXT}</div>
                </>
              }

              { state == 'new' && 
                <>
                  <div className={ inProcess ? classes.disabled_button : classes.start_button } onClick={()=>changeState("stake")}>{stakeBtnTXT}</div>
                </>
              }              
              { state == 'new' && bscInfo.withdrawable > 0 && 
                <>
                  <div className={ inProcess ? classes.disabled_button : classes.start_button } onClick={()=>changeState("withdraw")}>WITHDRAW</div>
                </>
              }
              { state == 'new' && bscInfo.staked > 0 && 
                <>
                  <div className={ inProcess ? classes.disabled_button : classes.start_button } onClick={()=>changeState("unstake")}>UNSTAKE</div>
                </>
              }
              { state == 'new' && bscInfo.withdrawable == 0 && bscInfo.ready > 0 && 
                <>
                  <div className={ classes.disabled_button } >UNSTAKING {formatNumber(bscInfo.ready)} TRX</div>
                </>
              }              
              { state != 'new' && 
                <>
                  <div className={ inProcess ? classes.disabled_button : classes.start_button } onClick={()=>changeState("new")}>CANCEL</div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default withRouter(Sol);

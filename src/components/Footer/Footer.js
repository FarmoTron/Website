import React from "react";
import { makeStyles } from '@mui/styles';
import { t, setStore } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "0 122px",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "30px",
    "@media (max-width: 767.98px)": {
      width: "auto",
      padding: "0 12px",
    },
  },
  top: {
    width: "100%",

    display: "flex",
    justifyContent: "space-between",

    "@media (max-width: 767.98px)": {
      height: "auto",
      display: "block",
    },
  },
  logo_box: {
    width: "288px",
    height: "100%",
  },
  logo: {
    color: "#5c8cb6",
    margin: 0,
    fontWeight: "700",
    textAlign: "left",
    fontSize: "25px",
    lineHeight: "37px",
  },
  logo_sub: {
    color: "rgba(255,255,255,0.5)",
  },
  logo_description: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "12px",
    lineHeight: "22px",
    textAlign: "left",
    margin: "10px 0 0 0",
  },
  about_box: {
    width: "133px",
    height: "100%",
  },
  company_box: {
    width: "119px",
    height: "100%",
  },
  contact_box: {
    width: "186px",
    height: "100%",
  },
  bottom_title: {
    margin: "auto",
    color: "rgba(255,255,255,0.5)",
  },
  bottom_title_name: {
    color: "white",
  },
  box_title: {
    fontWeight: "bold",
    textAlign: "left",
    color: "#5c8cb6",
    margin: 0,
  },
  link_content: {
    fontSize: "15px",
    lineHeight: "22px",
    color: "rgba(255,255,255,0.5)",
    marginTop: "20px",
    textDecoration: "none",
    display: "block",
    textAlign: "left",
  },
  sns_content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20px",
    width: "155px",
  },
  pointer:{
    cursor:"pointer",
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.logo_box}>
          <p className={classes.logo}>FarmoTron.com</p>

          <div className={classes.sns_content}>
            <img className={classes.pointer} width="24" height="24" alt="English" src="/img/en.png" onClick={()=>setStore({locale: 'en'})} />
            <img className={classes.pointer} width="24" height="24" alt="Chinese" src="/img/ch.png" onClick={()=>setStore({locale: 'ch'})} />
            <img className={classes.pointer} width="24" height="24" alt="Russian" src="/img/ru.png" onClick={()=>setStore({locale: 'ru'})} />
          </div>
        </div>

        <div className={classes.company_box}>
          <p className={classes.box_title}></p>
          <a href="#" className={classes.link_content}></a>
          <a href="#" className={classes.link_content}></a>
        </div>
        <div className={classes.contact_box}>
          <p className={classes.box_title}>{t("Contact")}</p>
          <a href="#" className={classes.link_content}></a>
          <a href="mailto:info@farmotron.com?subject=Contact to Farmotron.com" className={classes.link_content}>info@farmotron.com</a>
          <div className={classes.sns_content}>

            <a href="https://x.com/Farmotron1" target="_blank"><img width="24" height="24" src="/img/x.webp"/></a>
            <a href="https://github.com/farmotron" target="_blank"><img width="24" height="24" src="/img/github.png"/></a>
            <a href="https://t.me/farmotron" target="_blank"><img width="24" height="24" src="/img/tg.png"/></a>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

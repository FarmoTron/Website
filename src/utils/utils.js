import { useCallback, useState } from "react";
import store from "../store";
import { setData } from "../store/appStoreSlice";

import Config from '../config';
import { toast } from 'react-toastify';
import { BigNumber } from './helper';

import { Program, BN, AnchorProvider,setProvider } from '@coral-xyz/anchor';

import {TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, Token} from '@solana/spl-token'

const {
 Connection,
 PublicKey,
 clusterApiUrl,
 Keypair,
 LAMPORTS_PER_SOL,
 Transaction,
 Account,
 SystemProgram,
 
} = require("@solana/web3.js");


const Web3 = require('web3')

export const SOLconnection = new Connection(clusterApiUrl(Config.SOLnetwork), "confirmed");

export const numberWithCommas = (value)=> value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const setStore = (payload) => {
  store.dispatch(setData(payload));
};

export const getStore = () => {
  return store.getState().appStore;
};


export const setReady = (inProcess) => {
  store.dispatch(setData({inProcess}));
}


export const setSearch = (search) => {
  setStore({ search });
}

export const updateState = (key) => {
  return (value) => {
    setStore({ [key]: value });
  };
}

export const minimize = (address) => {
    if (address) {
      return address.substring(0,6)+'...'+address.substring(address.length-4,address.length)
    } else {
      return "";
    }
}

export const connect = async () => {
  if (window.ethereum) {
    // use the injected Ethereum provider to initialize Web3.js
    setStore({web3: new Web3(window.ethereum)});

    // check if Ethereum provider comes from MetaMask
    if (window.ethereum.isMetaMask) {
      toast("Connected with MetaMask.");
    } else {
      toast("Non-MetaMask provider detected.");
    }
    
    
    window.ethereum.on('accountsChanged', function (accounts) {
      requestAccounts();
    })

    window.ethereum.on('networkChanged', function (networkId) {
      setStore({chainid: Number(networkId)});
    })
  } else {
    // no Ethereum provider - instruct user to install MetaMask
    toast("Please install MetaMask");

  }
}
export const getChainId = async () => {
  const { web3 } =  getStore();
  if (web3 === null) {
    return;
  }
  // get chain ID and populate placeholder
  let chainid = await web3.eth.getChainId()
  setStore({chainid: Number(chainid)});
}

export const requestAccounts = async () => {
  const { web3 } =  getStore();
  if (web3 === null) {
    return;
  }
  // request accounts from MetaMask
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // get list of accounts
  const allAccounts = await web3.eth.getAccounts();
  setStore({
    defaultAccount:allAccounts[0],
    isConnected:true
  });
  
}

export const checkId = () => {
  const { chainid } =  getStore();
  if (Config.testnet) {
   return Config.allovedTestId.includes(chainid);
  } else {
   return Config.allovedId.includes(chainid);
  }
}

export const canchangeId = (tochain) => {
  if (Config.testnet) {
   return Config.allovedTestId.includes(tochain);
  } else {
   return Config.allovedId.includes(tochain);
  }
}



export const changeChainId = async (tochain) => {
  const { web3 } =  getStore();

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(tochain) }]
        });
        toast("Network has been changed.");
      } catch (err) {
          // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              Config.netparams[tochain]
            ]
          });
          toast("Network has been added.");
        }
      }
    }
export const getChainConfig = () => {
  const { chainid } =  getStore();
  if (checkId()) {
    return Config[Config.idtoNet[chainid]]
  } else {
    toast.error("Wrong network selected.");
    return null
  }
}

export const checkBalances = async () => {
  setReady(true);
  const chainConfig = getChainConfig();
  if (chainConfig) {
    try {
      const { web3, defaultAccount, emptyInfo } =  getStore();
      const stakecontract = new web3.eth.Contract(Config.STAKEABI, chainConfig.stake_addr)
      var trxbalance = 0;
      var trxonpool = 0;
      
      if (chainConfig.token_addr == '0x0') {
        trxbalance = await web3.eth.getBalance(defaultAccount)
        console.log(trxbalance)
        trxbalance = parseFloat(trxbalance)/10**18
      } else {
        const erc20Contract = new web3.eth.Contract(Config.ERCABI, chainConfig.token_addr)
        trxbalance = await erc20Contract.methods.balanceOf(defaultAccount).call({ from: defaultAccount })
        trxbalance = parseFloat(trxbalance)/10**6
        trxonpool = await erc20Contract.methods.balanceOf(chainConfig.stake_addr).call({ from: defaultAccount })
      }
      const tvl = await stakecontract.methods.totalSupply().call({ from: defaultAccount })
      const stakedbalance = await stakecontract.methods.balanceOf(defaultAccount).call({ from: defaultAccount })
      const withdrawable = await stakecontract.methods.withdrawable(defaultAccount).call({ from: defaultAccount })
      const ready = await stakecontract.methods.ready(defaultAccount).call({ from: defaultAccount })
      const price = await stakecontract.methods.getPrice().call({ from: defaultAccount })
      const fee = await stakecontract.methods.getFee().call({ from: defaultAccount })
      const getTotalOnTron = await stakecontract.methods.getTotalOnTron().call({ from: defaultAccount })
      const getTotalUnstaked = await stakecontract.methods.getTotalUnstaked().call({ from: defaultAccount })
      var apy = 0;
      if (parseFloat(tvl)>0) {
        apy = 100*(parseFloat(getTotalOnTron)+parseFloat(trxonpool)-parseFloat(getTotalUnstaked)-parseFloat(tvl))/parseFloat(tvl);
      }
//      var price = 1
//      if (parseFloat(getTotalOnTron)>0) {
//        price = (parseFloat(getTotalOnTron) + parseFloat(trxonpool) - parseFloat(getTotalUnstaked)) / (parseFloat(tvl))
//      }
      
      setStore({accountInfo: {
          balance:trxbalance,
          staked:parseFloat(stakedbalance)/10**6,
          rewards:parseFloat(0)/10**6,
          totalOnTron:parseFloat(getTotalOnTron)/10**6,
          totalUnstaked:parseFloat(getTotalUnstaked)/10**6,
          trxonpool:parseFloat(trxonpool)/10**6,
          price:parseFloat(price)/10**6,
          tvl:parseFloat(tvl)/10**6,
          fee:parseFloat(fee),
          apy:apy,
          withdrawable:parseFloat(withdrawable)/10**6,
          ready:parseFloat(ready)/10**6,
      }});
      
    } catch(error) {
      if(error.message) {
        toast.error(error.message)
        console.log(error.message)
      }
    }
  } else {
      const { emptyInfo } =  getStore();
      setStore({accountInfo: emptyInfo});
  }
  setReady(false);
}

const checkApproval = async (token, amount, contract) => {
  try {
    const { web3, defaultAccount } =  getStore();

    const erc20Contract = new web3.eth.Contract(Config.ERCABI, token)
    const allowance = await erc20Contract.methods.allowance(defaultAccount, contract).call({ from: defaultAccount })
    const supply = await erc20Contract.methods.totalSupply().call({ from: defaultAccount })

    const ethAllowance = web3.utils.fromWei(allowance, "ether")

    if(parseFloat(ethAllowance) < parseFloat(amount)) {
      await erc20Contract.methods.approve(contract, supply).send({ from: defaultAccount })
      toast("Approving ...");
    } 
  } catch(error) {
    if(error.message) {
      toast.error(error.message)
    }
  }
}


export const stakeBSCTRX = async (amount) => {
  setReady(true);
  const chainConfig = getChainConfig();
  if (chainConfig)
    try {
      const { web3, defaultAccount, accountInfo } =  getStore();
      const stakecontract = new web3.eth.Contract(Config.STAKEABI, chainConfig.stake_addr)
    
      await checkApproval(chainConfig.token_addr, amount, chainConfig.stake_addr);
      await stakecontract.methods.deposit(amount*10**6).send({ from: defaultAccount, value: accountInfo.fee })
      toast("Transaction confirmed ...");
      checkBalances();
    } catch(error) {
      if(error.message) {
        toast.error(error.message)
      }
    }
  setReady(false);
}

export const stakeETHTRX = async (amount) => {
  setReady(true);
  const chainConfig = getChainConfig();
  if (chainConfig)
    try {
      const { web3, defaultAccount, accountInfo } =  getStore();
      const stakecontract = new web3.eth.Contract(Config.STAKEABI, chainConfig.stake_addr)
    

      await stakecontract.methods.deposit(amount*10**18).send({ from: defaultAccount, value: amount*10**18 + accountInfo.fee })
      toast("Transaction confirmed ...");
      checkBalances();
    } catch(error) {
      if(error.message) {
        toast.error(error.message)
      }
    }
  setReady(false);
}

export const mintTokens = async () => {
  setReady(true);
  const chainConfig = getChainConfig();
  if (chainConfig)
    try {
      const { web3, defaultAccount, accountInfo } =  getStore();
      const erc20Contract = new web3.eth.Contract(Config.ERCABI, chainConfig.token_addr)
    
      await erc20Contract.methods.mint(2000*10**6).send({ from: defaultAccount })
      toast("Transaction confirmed ...");
      checkBalances();
    } catch(error) {
      if(error.message) {
        toast.error(error.message)
      }
    }
  setReady(false);
}


export const unstakeBSCTRX = async (amount) => {
  setReady(true);
  const chainConfig = getChainConfig();
  if (chainConfig)
    try {
      const { web3, defaultAccount, accountInfo } =  getStore();
      const stakecontract = new web3.eth.Contract(Config.STAKEABI, chainConfig.stake_addr)
      await stakecontract.methods.stopStaking(amount*10**6).send({ from: defaultAccount, value: accountInfo.fee })
      toast("Transaction confirmed ...");
      checkBalances();
    } catch(error) {
      if(error.message) {
        toast.error(error.message)
      }
    }
  setReady(false);
}

export const withdrawBSCTRX = async () => {
  setReady(true);
  const chainConfig = getChainConfig();
  if (chainConfig)
    try {
      const { web3, defaultAccount, accountInfo } =  getStore();
      const stakecontract = new web3.eth.Contract(Config.STAKEABI, chainConfig.stake_addr)
      await stakecontract.methods.withdraw().send({ from: defaultAccount, value: accountInfo.fee })
      toast("Transaction confirmed ...");
      checkBalances();
    } catch(error) {
      if(error.message) {
        toast.error(error.message)
      }
    }
  setReady(false);
}

export const unstakeETHTRX = async (amount) => {
  setReady(true);
  const chainConfig = getChainConfig();
  if (chainConfig)
    try {
      const { web3, defaultAccount, accountInfo } =  getStore();
      const stakecontract = new web3.eth.Contract(Config.STAKEABI, chainConfig.stake_addr)
      await stakecontract.methods.stopStaking(amount*10**6).send({ from: defaultAccount, value: accountInfo.fee })
      toast("Transaction confirmed ...");
      checkBalances();
    } catch(error) {
      if(error.message) {
        toast.error(error.message)
      }
    }
  setReady(false);
}

export const withdrawETHTRX = async () => {
  setReady(true);
  const chainConfig = getChainConfig();
  if (chainConfig)
    try {
      const { web3, defaultAccount, accountInfo } =  getStore();
      const stakecontract = new web3.eth.Contract(Config.STAKEABI, chainConfig.stake_addr)
      await stakecontract.methods.withdraw().send({ from: defaultAccount, value: accountInfo.fee })
      toast("Transaction confirmed ...");
      checkBalances();
    } catch(error) {
      if(error.message) {
        toast.error(error.message)
      }
    }
  setReady(false);
}

export const t = (key) => {
  const { translator } =  getStore();
  
  if (translator[key]) {
    return translator[key];
  } else {
    return key
  }
}

export const connectSOL = async () => {
  console.log("connectSOL");
  if (Config.testnet) 
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log("phantom wallet found");
          // When using this flag, Phantom will only connect and emit a connect event if the application is trusted. Therefore, this can be safely called on page load for new users, as they won't be bothered by a pop-up window even if they have never connected to Phantom before.
          // if user already connected, { onlyIfTrusted: true }
          const response = await solana.connect({ onlyIfTrusted: false });
          getSOLbalances(response.publicKey)
          console.log(
            "public key",
            response.publicKey.toString()
          );
            setStore({
              defaultAccount:response.publicKey.toString(),
              SOLpubkey:response.publicKey,
              isSolConnected:true
            });
            
          solana.on('accountChanged', (publicKey) => {
              if (publicKey) {
                getSOLbalances(publicKey)
                setStore({
                  defaultAccount:publicKey.toString(),
                  SOLpubkey:response.publicKey,
                  isSolConnected:true
                });
              } else {
                setStore({
                  defaultAccount:null,
                  SOLpubkey:null,
                  isSolConnected:false
                });
              }
          });
        } else {
          console.log("NON phantom wallet found");
          // When using this flag, Phantom will only connect and emit a connect event if the application is trusted. Therefore, this can be safely called on page load for new users, as they won't be bothered by a pop-up window even if they have never connected to Phantom before.
          // if user already connected, { onlyIfTrusted: true }
          const response = await solana.connect({ onlyIfTrusted: false });
          console.log(
            "public key",
            response.publicKey.toString()
          );
          getSOLbalances(response.publicKey)
            setStore({
              defaultAccount:response.publicKey.toString(),
              SOLpubkey:response.publicKey,
              isSolConnected:true
            });

           solana.on('accountChanged', (publicKey) => {
              if (publicKey) {
                getSOLbalances(publicKey)
                setStore({
                  defaultAccount:publicKey.toString(),
                  SOLpubkey:response.publicKey,
                  isSolConnected:true
                });
              } else {
                setStore({
                  defaultAccount:null,
                  SOLpubkey:null,
                  isSolConnected:false
                });
              }
          });
            
        }
      } else {
          toast.error("Please install Solana wallet");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
export const getSOLbalances = async (publicKey) => {
  const walletBalance = await SOLconnection.getBalance(
            new PublicKey(publicKey)
  );
      const associatedTokenAccount = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            new PublicKey(Config.SOLtoken),
            publicKey
      )

      let tokenAmount = await SOLconnection.getTokenAccountBalance(associatedTokenAccount);
      let tokenSupply = await SOLconnection.getTokenSupply(new PublicKey(Config.SOLtoken));
  console.log(tokenSupply)
      var apy = 0;
      var price = 933.20;
      var priceold = 930;
      var tvl = parseFloat(tokenSupply.value.amount)/10**9;
      var trxonpool = parseFloat(tokenSupply.value.amount)/10**9 * priceold;

      if (parseFloat(tvl)>0) {
        apy = 100*(tvl*price-trxonpool)/(tvl*price);
      }
      setStore({accountInfo: {
          balance:parseFloat(walletBalance)/10**9,
          staked:parseFloat(tokenAmount.value.amount)/10**9,
          rewards: tvl*price - trxonpool,
          totalOnTron:parseFloat(0)/10**6,
          totalUnstaked:parseFloat(0)/10**6,
          trxonpool:trxonpool,
          price:parseFloat(price),
          tvl:tvl,
          fee:parseFloat(0),
          apy:apy,
          withdrawable:parseFloat(0)/10**6,
          ready:parseFloat(0)/10**6,
      }});

}

export const mintSOL = async () => {
  setReady(true);
  const { SOLpubkey } =  getStore();
  if (SOLpubkey) {
    try {
      const fromAirDropSignature = await SOLconnection.requestAirdrop(
          new PublicKey(SOLpubkey),
          5 * LAMPORTS_PER_SOL
      );
      await SOLconnection.confirmTransaction(fromAirDropSignature);
      toast("Transaction confirmed ...");
      getSOLbalances(SOLpubkey);
    } catch (err) {
        toast.error(err.message)
        console.log(err);
        
    }
  } else {
    toast.error("Please connect Solana wallet");
  }
  setReady(false);
}

const createAccount = async (SOLpubkey, associatedTokenAccount) => {
        const { solana } = window;
        let transactione = new Transaction({feePayer: SOLpubkey,});
        let blockhash = (await SOLconnection.getLatestBlockhash('finalized')).blockhash;
        transactione.recentBlockhash = blockhash;

        transactione.add(
          Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            new PublicKey(Config.SOLtoken),
            associatedTokenAccount,
            SOLpubkey,
            SOLpubkey,
          )
        );
        await solana.signAndSendTransaction(transactione);
        toast("Transaction confirmed ...");
        getSOLbalances(SOLpubkey);

}

export const stakeSOL = async (amount) => {
  setReady(true);
  const { solana } = window;
  const { SOLpubkey } =  getStore();
  if (solana && SOLpubkey) {
    try {
      console.log("make transaction");

      
      const associatedTokenAccount = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            new PublicKey(Config.SOLtoken),
            SOLpubkey
      )
      console.log(associatedTokenAccount)
      try {
        const tokenAccount = await SOLconnection.getAccountInfo(associatedTokenAccount);
        console.log(tokenAccount)
        if (!tokenAccount) {
          await createAccount(SOLpubkey, associatedTokenAccount);
        }
      } catch (errorAccount) {
        await createAccount(SOLpubkey, associatedTokenAccount);
      }
      


//        let transaction = new Transaction({feePayer: SOLpubkey,});
//        let blockhash = (await SOLconnection.getLatestBlockhash('finalized')).blockhash;
//        transaction.recentBlockhash = blockhash;
//
//        transaction.add(
//          SystemProgram.transfer({
//            fromPubkey: SOLpubkey,
//            toPubkey: new PublicKey(Config.SOLowner),
//            lamports: LAMPORTS_PER_SOL * amount,
//          }),
//        );
//        await solana.signAndSendTransaction(transaction);
//        toast("Transaction confirmed ...");
//        getSOLbalances(SOLpubkey);
        
        
        
      const wallet = new Wallet(new PublicKey(SOLpubkey))
      const provider = new AnchorProvider(SOLconnection, wallet, {
            preflightCommitment: "confirmed"
        })
      setProvider(provider);
      console.log("make program ID");
      const programId = new PublicKey(Config.SOLcontract);
      console.log("make program");
      const farmoRrogram = new Program(Config.SOLIDL, programId, provider );
      console.log("deposit");
      let transaction1 = await farmoRrogram.methods.deposit(new BN(LAMPORTS_PER_SOL * amount)).accounts({user:new PublicKey(SOLpubkey), userTknAcc:new PublicKey(associatedTokenAccount), pool:new PublicKey(Config.SOLpool), mintaccount:new PublicKey(Config.SOLtoken), systemProgram:new PublicKey('11111111111111111111111111111111'), tokenProgram:new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }).transaction();
      let blockhash1 = (await SOLconnection.getLatestBlockhash('finalized')).blockhash;
      transaction1.recentBlockhash = blockhash1;
      transaction1.feePayer = SOLpubkey;

      
      
      console.log(transaction1)
      
      
      await solana.signAndSendTransaction(transaction1);

      console.log("done");
      getSOLbalances(SOLpubkey);
      
    } catch (err) {
        toast.error(err.message)
        console.log(err);
    }
  } else {
    toast.error("Please connect Solana wallet");
  }
  setReady(false);
}
export const withdrawSOL = async (amount) => {
  setReady(true);

  setReady(false);
}
export const unstakeSOL = async (amount) => {
  setReady(true);
  const { solana } = window;
  const { SOLpubkey } =  getStore();
  if (solana && SOLpubkey) {
    try {
      console.log("make transaction");
      console.log(amount);

      
      const associatedTokenAccount = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            new PublicKey(Config.SOLtoken),
            SOLpubkey
      )


      const poolassociatedTokenAccount = 
            new PublicKey(Config.SOLpooltokenacc)

      console.log(poolassociatedTokenAccount.toString() )
        
      const wallet = new Wallet(new PublicKey(SOLpubkey))
      const provider = new AnchorProvider(SOLconnection, wallet, {
            preflightCommitment: "confirmed"
        })
      setProvider(provider);
      console.log("make program ID");
      const programId = new PublicKey(Config.SOLcontract);
      console.log("make program");
      const farmoRrogram = new Program(Config.SOLIDL, programId, provider );
      console.log("withdraw");
      let transaction1 = await farmoRrogram.methods.withdraw(new BN(LAMPORTS_PER_SOL * amount)).accounts({user:new PublicKey(SOLpubkey), userTknAcc:new PublicKey(associatedTokenAccount), pool:new PublicKey(Config.SOLpool), pooltokenaccount:poolassociatedTokenAccount, systemProgram:new PublicKey('11111111111111111111111111111111'), tokenProgram:new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }).transaction();
      let blockhash1 = (await SOLconnection.getLatestBlockhash('finalized')).blockhash;
      transaction1.recentBlockhash = blockhash1;
      transaction1.feePayer = SOLpubkey;

      
      
      console.log(transaction1)
      
      
      await solana.signAndSendTransaction(transaction1);

      console.log("done");
      getSOLbalances(SOLpubkey);
      
    } catch (err) {
        toast.error(err.message)
        console.log(err);
    }
  } else {
    toast.error("Please connect Solana wallet");
  }
  getSOLbalances(SOLpubkey);
  setReady(false);
}





export const tredots = <><span className="loader__dot">.</span><span className="loader__dot">.</span><span className="loader__dot">.</span></>






export const initTronLinkWallet = async (cb, cbn) => {
    try {
      let timeCount = 0;

      const tmpTimer1 = setInterval(() => {
        timeCount++;
        if (timeCount > Config.tronLinkTime) {
          setStore({isTronConnected: false});

          cbn && cbn();
          clearInterval(tmpTimer1);
        }
        if (window.tronWeb && window.tronWeb.ready) {
          console.log("window.tronWeb.ready")
          var isconn = true;
          const { trongrid } = Config;
          
          if (Config.testnet) {
            window.tronWeb.setFullNode(Config.chain.fullHost);
            window.tronWeb.setSolidityNode(Config.chain.fullHost);
          } else if (trongrid && window.tronWeb.setHeader && window.tronWeb.fullNode.host.includes(trongrid.hostname)) {
            window.tronWeb.setHeader({ 'TRON-PRO-API-KEY': trongrid.key });
          }

          if (!window.tronWeb.fullNode.host.includes(trongrid.hostname)) {
            console.log(window.tronWeb.fullNode.host);
            console.log(trongrid.hostname)
            toast("Wrong network selected. Please verity your TronLink settings. Hostname");
            isconn = false;
          }

          setStore({
            tronWeb: window.tronWeb,
            defaultAccount: window.tronWeb.defaultAddress.base58,
            isTronConnected: isconn,
          })

          window.defaultAccount = window.tronWeb.defaultAddress.base58;

          cb && cb();
          setVariablesInterval(); // Global scheduled tasks
          clearInterval(tmpTimer1);
        } else {
          const { trongrid } = Config;
          if (window.tronWeb.fullNode.host != trongrid.host) {
            console.log(window.tronWeb.fullNode.host);
            console.log(trongrid.host)
            toast("Wrong network selected. Please verity your TronLink settings. Host");
          }
          
          console.log("tronLink.request")
          if (window.tronLink.ready) {
            window.tronWeb = window.tronLink.tronWeb;
            console.log("tronLink.ready")
          } else {
            console.log("toast")
            toast("Make sure TronLink is unlocked!");
            clearInterval(tmpTimer1);

          }
        }
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };
  
const setVariablesInterval = () => {
  const { interval } =  getStore();
    if (!interval) {
      setStore({ interval: setInterval(async () => {
        try {
          const { defaultAccount,accountInfo } =  getStore();
          if (defaultAccount && !accountInfo.success) {
            const accountInfo = await  getTrxBalance(defaultAccount);
            setStore({accountInfo: accountInfo});
          }

        } catch (err) {
          console.log('interval error:' + err);
        }
      }, 3000)})
    }
};



export const getTrxBalance = async (defaultAccount) => {
  try {
    if ( window.tronWeb && window.tronWeb.ready ) {
      let tronWeb = window.tronWeb;
      const balance = await tronWeb.trx.getBalance(defaultAccount);
      console.log(balance)
      let abi = Config.trxabi;
      let contract = await tronWeb.contract(abi, Config.contract);
console.log("contract")
      var trxbalance = 0;
      var trxonpool = 0;
      

      const tvl = await contract.totalSupply().call();
console.log("tvl")
      console.log(tvl)
      const stakedbalance = await contract.balanceOf(defaultAccount).call()
      const withdrawable = await contract.withdrawable(defaultAccount).call()
      const ready = await contract.ready(defaultAccount).call()
      const price = await contract.getPrice().call()
      const fee = await contract.getFee().call()
      const getTotalOnTron = await contract.getTotalOnTron().call()
      const getTotalUnstaked = await contract.getTotalUnstaked().call()
      var apy = 0;
      if (parseFloat(tvl)>0) {
        apy = 100*(parseFloat(getTotalOnTron)+parseFloat(trxonpool)-parseFloat(getTotalUnstaked)-parseFloat(tvl))/parseFloat(tvl);
      }



      return {
        balance: parseFloat(balance)/(10**6),
        staked:parseFloat(stakedbalance)/10**6,
        rewards:parseFloat(0)/10**6,
        totalOnTron:parseFloat(getTotalOnTron)/10**6,
        totalUnstaked:parseFloat(getTotalUnstaked)/10**6,
        trxonpool:parseFloat(trxonpool)/10**6,
        price:parseFloat(price)/10**6,
        tvl:parseFloat(tvl)/10**6,
        fee:parseFloat(fee),
        apy:apy,
        withdrawable:parseFloat(withdrawable)/10**6,
        ready:parseFloat(ready)/10**6,
        success: true
      };
    }
  } catch (err) {
    console.log(`getTrxBalance: ${err}`, defaultAccount);
    const { emptyInfo } =  getStore();
    return emptyInfo;
  }
};

export const listenTronLink = () => {
    window.addEventListener('message', res => {
      const { defaultAccount } =  getStore();
      if (res.data.message && res.data.message.action == 'setAccount') {
        if (window.tronWeb) {
          if (res.data.message.data.address != defaultAccount) {
            window.location.reload();
          }
        } else {
          window.location.reload();
        }
      }
      if (res.data.message && res.data.message.action == 'setNode') {
        window.location.reload();
      }
    });
};



export const stakeTRX = async (amount) => {
  setReady(true);
  const { tronWeb, defaultAccount, accountInfo, isTronConnected } =  getStore();

  if (isTronConnected)
    try {
      
    let abi = Config.trxabi;
    let contract = await tronWeb.contract(abi, Config.contract);
      

    let res = await contract.deposit(amount*10**6).send({
        feeLimit:100_000_000,
        callValue:amount*10**6 + accountInfo.fee,
        shouldPollResponse:true
    });

    console.log(res);
      toast("Transaction confirmed ...");
      const accountInfoN = await  getTrxBalance(defaultAccount);
      setStore({accountInfo: accountInfoN});
    } catch(error) {
      if(error.message) {
        toast.error(error.message)
      }
    }
  setReady(false);
}

export const unstakeTRX = async (amount) => {
  setReady(true);
  const { tronWeb, defaultAccount, accountInfo, isTronConnected } =  getStore();
  if (isTronConnected)
    try {

    let abi = Config.trxabi;
    let contract = await tronWeb.contract(abi, Config.contract);
      

    let res = await contract.stopStaking(amount*10**6).send({
        feeLimit:100_000_000,
        callValue:accountInfo.fee,
        shouldPollResponse:true
    });

      toast("Transaction confirmed ...");
      const accountInfoN = await  getTrxBalance(defaultAccount);
      setStore({accountInfo: accountInfoN});
    } catch(error) {
      if(error.message) {
        toast.error(error.message)
      }
    }
  setReady(false);
}

export const withdrawTRX = async () => {
  setReady(true);
  const { tronWeb, defaultAccount, accountInfo, isTronConnected } =  getStore();
  if (isTronConnected)
    try {

    let abi = Config.trxabi;
    let contract = await tronWeb.contract(abi, Config.contract);
      

    let res = await contract.withdraw().send({
        feeLimit:100_000_000,
        callValue:accountInfo.fee,
        shouldPollResponse:true
    });
      toast("Transaction confirmed ...");
      const accountInfoN = await  getTrxBalance(defaultAccount);
      setStore({accountInfo: accountInfoN});
    } catch(error) {
      if(error.message) {
        toast.error(error.message)
      }
    }
  setReady(false);
}

  
export const   gettvls = async () => {
    const response = await fetch(`/api/tvls`);
    const result = await response.json();
    setStore({
      latesttvls: result.data,
      latestinfo: result.info,
    });
};

export class Wallet {
  constructor(publicKey) {
    this._publicKey = publicKey;
  }
  async signTransaction(tx) {
    tx.sign(this._publicKey);
    return tx;
  }
  async signAllTransactions(txs) {
    txs.map(tx => tx.sign(this._publicKey));
    return txs;
  }
  get publicKey() {
    return this._publicKey;
  }
}

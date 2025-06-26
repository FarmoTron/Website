const env = process.env.REACT_APP_ENV;

const prodConfig = {
  version: 'v1.0.0',
  name: 'Mainnet',
  chainid: '0x2b6653dc',
  testnet: false,
  relayer: 'TLwpQv9N6uXZQeE4jUudLPjcRffbXXAuru',
  chain: {
    privateKey: '01',
    fullHost: 'https://cors-anywhere.herokuapp.com/api.trongrid.io'
  },
  trongrid: {
    host: 'https://api.trongrid.io',
    hostname: 'api.trongrid.io',
    key: 'eb311b22-c773-4953-a2e0-b255be7568cc'
  },
  service: {},
  contract: 'TP5e45bVKt9So6Z8ac3HLBSZgqRm2pg6en',
  defaultDecimal: 6,
  tronLinkTime: 8,
  justSwap: 'https://justswap.org/',
  tronscanUrl: 'https://tronscan.io/#'
};

const devNileConfig = {
  version: 'v1.0.0',
  name: 'Nile',
  chainid: '0xcd8690dc',
  testnet: true,
  relayer: 'TLwpQv9N6uXZQeE4jUudLPjcRffbXXAuru',
  chain: {
    privateKey: '01',
    fullHost: 'https://nile.trongrid.io',
  },
  trongrid: {
    host: 'https://nile.trongrid.io',
    hostname: 'nile.trongrid.io',
    
    key: 'xxxxxx'
  },
  service: {},
  contract: 'TXH91cKd7WxqB9N6oe9cnrjgfHfdWTGMeR',
  defaultDecimal: 6,
  tronLinkTime: 8,
  justSwap: 'https://justswap.org/',
  tronscanUrl: 'https://nile.tronscan.io/#'
}
let Config = devNileConfig
    Config.testnet = true
    Config.SOLnetwork = "devnet"
    Config.SOLowner = '8fiTcoEinJ3mmke5XsUSxMiQshyPBiXMPDJ1fSs9Ba8z'
    Config.SOLcontract = '5pS8dpxoXG1SaMRAuxaEVVRroNFw42YAvmrht9vxzvkz'
    Config.SOLpool = 'HnYg8933eCrXGV2WposjsafqMfBaVCkh5YnLP7GeZWYn'
    Config.SOLtoken = '9UqEwYzk8A4395CJhVgiRC2SgFNRm4qcd3rCbH1fZX3M'
    Config.SOLpooltokenacc = '82dMUfdJmCwfY7emGCnGUyLPqbWK2k8t9yCfAzrx3VgC'
    Config.allovedId = [1,56]
    Config.allovedTestId = [97,11155111,84532]
    Config.faucetId = [97,11155111]
    Config.idtoNet = {1:'ETH',11155111:'ETHTEST',56:'BSC',97:'BSCTEST',137:'POLYGON',8453:'BASE',84532:'BASETEST'}
    Config.netparams = {
      1:{
          chainName: 'Ethereum',
          chainId: '0x1',
          nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
          rpcUrls: ['https://eth.llamarpc.com']
        },
      11155111:{
          chainName: 'Sepolia Testnet',
          chainId: '0xAA36A7',
          nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
          rpcUrls: ['https://ethereum-sepolia-rpc.publicnode.com']
        },
      56:{
          chainName: 'Binance Smart Chain',
          chainId: '0x38',
          nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
          rpcUrls: ['https://bsc-dataseed1.bnbchain.org']
        },
      97:{
          chainName: 'BSC Testnet',
          chainId: '0x61',
          nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
          rpcUrls: ['https://data-seed-prebsc-2-s1.bnbchain.org:8545']
        },
      137:{
          chainName: 'Polygon Mainnet',
          chainId: '0x89',
          nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
          rpcUrls: ['https://polygon-rpc.com/']
        },
      8453:{
          chainName: 'Base',
          chainId: '0x2105',
          nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
          rpcUrls: ['https://base.llamarpc.com']
        },
      84532:{
          chainName: 'Base Sepolia Testnet',
          chainId: '0x14a34',
          nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
          rpcUrls: ['https://sepolia.base.org']
        }
      
    };
    Config.BSCTEST = {
      stake_addr: '0x6ab1112487a8AbC511068532BaE20b9b65639859',
      token_addr: '0x64f21D2e411F85FdAc1f567a4EE98455d449EC84',
    };
    Config.BSC = {
      stake_addr: '0x0CCf6A9b17b9336E26378b9788B08ec567193888',
      token_addr: '0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3',
    };
    Config.BASE = {
      stake_addr: '0x0CCf6A9b17b9336E26378b9788B08ec567193888',
      token_addr: '0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3',
    };
    Config.BASETEST = {
      stake_addr: '0x45cB27BC481e0814bE4D9514F0d09024d4FAde06',
      token_addr: '0x0',
    };
    Config.ETH = {
      stake_addr: '0x0CCf6A9b17b9336E26378b9788B08ec567193888',
      token_addr: '0x50327c6c5a14DCaDE707ABad2E27eB517df87AB5',
    };
    Config.POLYGON = {
      stake_addr: '0x0CCf6A9b17b9336E26378b9788B08ec567193888',
      token_addr: '0x2cAAfE631A1578c1adAf488b3097Eb252Adb1CB2',
    };
    Config.ETHTEST = {
      stake_addr: '0x6Ab46d7Cb1e7cE1e36A84bc66a32F2443f244693',
      token_addr: '0x2a985D9dA6E38E8e944A0071Fdc2ddE5CfE16702',
    };
	Config.trxabi = [{"stateMutability":"Payable","type":"Constructor"},{"inputs":[{"name":"spender","type":"address"},{"name":"allowance","type":"uint256"},{"name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"Error"},{"inputs":[{"name":"sender","type":"address"},{"name":"balance","type":"uint256"},{"name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"Error"},{"inputs":[{"name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"Error"},{"inputs":[{"name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"Error"},{"inputs":[{"name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"Error"},{"inputs":[{"name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"Error"},{"inputs":[{"name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"Error"},{"inputs":[{"name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"Error"},{"name":"ReentrancyGuardReentrantCall","type":"Error"},{"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"Approval","type":"Event"},{"inputs":[{"indexed":true,"name":"sender","type":"address"},{"name":"amount","type":"uint256"}],"name":"Deposit","type":"Event"},{"inputs":[{"indexed":true,"name":"sender","type":"address"},{"name":"amount","type":"uint256"},{"name":"chain","type":"uint256"},{"name":"trxAmount","type":"uint256"}],"name":"MoveTo","type":"Event"},{"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"Event"},{"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"Transfer","type":"Event"},{"inputs":[{"indexed":true,"name":"sender","type":"address"},{"name":"amount","type":"uint256"},{"name":"chain","type":"uint256"},{"name":"trxAmount","type":"uint256"}],"name":"UpFrom","type":"Event"},{"inputs":[{"indexed":true,"name":"sender","type":"address"},{"name":"amount","type":"uint256"}],"name":"Withdraw","type":"Event"},{"outputs":[{"type":"uint256"}],"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","stateMutability":"View","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"uint256"}],"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","stateMutability":"View","type":"Function"},{"inputs":[{"name":"amount","type":"uint256"}],"name":"burn","stateMutability":"Nonpayable","type":"Function"},{"inputs":[{"name":"tronAmount","type":"uint256"}],"name":"confirmUnstake","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"uint8"}],"name":"decimals","stateMutability":"View","type":"Function"},{"inputs":[{"name":"amount","type":"uint256"}],"name":"deposit","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"uint256"}],"name":"getFee","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"name":"getPrice","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"name":"getTotalMoved","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"name":"getTotalOnTron","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"name":"getTotalUnstaked","stateMutability":"View","type":"Function"},{"outputs":[{"type":"bool"}],"name":"isConfirmed","stateMutability":"View","type":"Function"},{"inputs":[{"name":"amount","type":"uint256"}],"name":"mint","stateMutability":"Nonpayable","type":"Function"},{"inputs":[{"name":"_chain","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"moveto","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"string"}],"name":"name","stateMutability":"View","type":"Function"},{"outputs":[{"type":"address"}],"name":"owner","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"inputs":[{"name":"account","type":"address"}],"name":"ready","stateMutability":"View","type":"Function"},{"name":"renounceOwnership","stateMutability":"Nonpayable","type":"Function"},{"inputs":[{"name":"_core","type":"address"}],"name":"setCore","stateMutability":"Nonpayable","type":"Function"},{"inputs":[{"name":"_fee","type":"uint256"}],"name":"setFee","stateMutability":"Nonpayable","type":"Function"},{"inputs":[{"name":"amount","type":"uint256"}],"name":"stopStaking","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"string"}],"name":"symbol","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"name":"totalSupply","stateMutability":"View","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","stateMutability":"Nonpayable","type":"Function"},{"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","stateMutability":"Nonpayable","type":"Function"},{"inputs":[{"name":"_chain","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"account","type":"address"},{"name":"trxAmount","type":"uint256"}],"name":"upFrom","stateMutability":"Payable","type":"Function"},{"inputs":[{"name":"tronAmount","type":"uint256"}],"name":"updateAmount","stateMutability":"Payable","type":"Function"},{"name":"withdraw","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"bool"}],"inputs":[{"name":"_token","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawToken","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"uint256"}],"inputs":[{"name":"account","type":"address"}],"name":"withdrawable","stateMutability":"View","type":"Function"}];


    Config.ERCABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ReentrancyGuardReentrantCall",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawToken",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
    Config.STAKEABI = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ReentrancyGuardReentrantCall",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "chain",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "trxAmount",
				"type": "uint256"
			}
		],
		"name": "MoveTo",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "chain",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "trxAmount",
				"type": "uint256"
			}
		],
		"name": "UpFrom",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tronAmount",
				"type": "uint256"
			}
		],
		"name": "confirmUnstake",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalMoved",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalOnTron",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalUnstaked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isConfirmed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "chain",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "moveTo",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "ready",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_core",
				"type": "address"
			}
		],
		"name": "setCore",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fee",
				"type": "uint256"
			}
		],
		"name": "setFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "stopStaking",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "chain",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "trxAmount",
				"type": "uint256"
			}
		],
		"name": "upFrom",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tronAmount",
				"type": "uint256"
			}
		],
		"name": "updateAmount",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawToken",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "withdrawable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
    Config.SOLIDL = {"version":"0.1.0","name":"farmotron","instructions":[{"name":"deposit","accounts":[{"name":"user","isMut":true,"isSigner":true},{"name":"userTknAcc","isMut":true,"isSigner":false},{"name":"pool","isMut":true,"isSigner":false},{"name":"mintaccount","isMut":true,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false}],"args":[{"name":"n","type":"u64"}]},{"name":"init","accounts":[{"name":"owner","isMut":true,"isSigner":true},{"name":"pool","isMut":true,"isSigner":false},{"name":"mint","isMut":true,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false}],"args":[]},{"name":"initAssociatedTokenAccount","accounts":[{"name":"newTokenAccount","isMut":true,"isSigner":false},{"name":"mint","isMut":true,"isSigner":false},{"name":"signer","isMut":true,"isSigner":true},{"name":"rent","isMut":false,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false}],"args":[]},{"name":"withdraw","accounts":[{"name":"user","isMut":true,"isSigner":true},{"name":"userTknAcc","isMut":true,"isSigner":false},{"name":"pool","isMut":true,"isSigner":false},{"name":"pooltokenaccount","isMut":true,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false}],"args":[{"name":"n","type":"u64"}]}],"accounts":[{"name":"DepositPool","type":{"kind":"struct","fields":[{"name":"bump","type":"u8"}]}}]};
export default Object.assign(Config);

import { getContract } from './Helpers/contract';
import { Web3Provider } from '@ethersproject/providers';
import React from 'react';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import WalletLink from 'walletlink';

const VanillaConnectionComponent = () => {
	const [ web3Library, setWeb3Library ] = React.useState();
	const [ web3Account, setWeb3Account ] = React.useState();
	const [ walletlinkProvider, setWalletlinkProvider ] = React.useState();
	const [ walletConnectProvider, setWalletConnectProvider ] = React.useState();
	//vanilla
	const writeToContract = async () => {
		try {
			const randomNumber = Math.floor(Math.random() * 100);
			const myContract = getContract(web3Library, web3Account);
			const overrides = {
				gasLimit: 230000
			};
			const response = await myContract.store(randomNumber, overrides);
			alert('write ' + randomNumber);
		} catch (ex) {
			console.log(ex);
			alert(ex);
		}
	};

	//vanilla metamask
	const connectMetamask = async () => {
		try {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			const account = accounts[0];
			console.log(account);
			setWeb3Account(account);
			const library = new Web3Provider(window.ethereum, 'any');
			console.log('library');
			console.log(library);
			setWeb3Library(library);
		} catch (ex) {
			console.log(ex);
		}
	};

	//vanilla walletconnect
	const connectWaletConnect = async () => {
		try {
			const RPC_URLS = {
				1: 'https://mainnet.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4',
				4: 'https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4'
			};
			const provider = new WalletConnectProvider({
				rpc: {
					1: RPC_URLS[1],
					4: RPC_URLS[4]
				},
				qrcode: true,
				pollingInterval: 15000
			});
			setWalletConnectProvider(provider);
			const accounts = await provider.enable();
			const account = accounts[0];

			const library = new Web3Provider(provider, 'any');

			console.log('library');
			console.log(library);
			setWeb3Library(library);
			setWeb3Account(account);
		} catch (ex) {
			console.log(ex);
		}
	};

	//vanilla coinbase
	const connectCoinbase = async () => {
		try {
			// Initialize WalletLink
			const walletLink = new WalletLink({
				appName: 'demo-app',
				darkMode: true
			});
			
			const provider = walletLink.makeWeb3Provider(
				'https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4',
				4
			);
			setWalletlinkProvider(provider);
			const accounts = await provider.request({
				method: 'eth_requestAccounts'
			});
			const account = accounts[0];

			const library = new Web3Provider(provider, 'any');

			console.log('library');
			console.log(library);
			setWeb3Library(library);
			setWeb3Account(account);
		} catch (ex) {
			console.log(ex);
		}
	};
	const disconnectCoinbase = () => {
		walletlinkProvider.close();
		setWalletlinkProvider(null);
	};
	const disconnectWalletconnect = ()=>{
		walletConnectProvider.disconnect()
		setWalletConnectProvider(null);
	}
	return (
		<div className="flex flex-col space-y-7 items-start pt-10 w-1/2 border-2 border-yellow-300">
			<h2>Vanilla Control</h2>
			{web3Account ? <p>{web3Account}</p> : <p>Not Connected</p>}
			<div className="flex space-x-3">
				<button
					className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					onClick={writeToContract}
				>
					Write to Contract
				</button>
			</div>
			<div className="flex space-x-3">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={connectMetamask}
				>
					Connect Metamask
				</button>
			</div>
			<div className="flex space-x-3">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={connectWaletConnect}
				>
					Connect walletconnect
				</button>
				<button
					className=" bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
					onClick={disconnectWalletconnect}
				>
					Disconnect
				</button>
			</div>
			<div className="flex space-x-3">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={connectCoinbase}
				>
					Connect coinbase
				</button>
				<button
					className=" bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
					onClick={disconnectCoinbase}
				>
					Disconnect
				</button>
			</div>
		</div>
	);
};
export default VanillaConnectionComponent;

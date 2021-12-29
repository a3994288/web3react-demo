import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import VanillaConnectionComponent from './VanillaConnectionComponent';
import Web3ReactConnectionComponent from './Web3ReactConnectionComponent';
window.onload = function() {
	localStorage.clear();
};

function App() {
	const getLibrary = (provider) => {
		const library = new Web3Provider(provider, 'any');
		library.pollingInterval = 15000;
		return library;
	};

	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<div className="flex space-x-3">
				<Web3ReactConnectionComponent />
				<VanillaConnectionComponent />
			</div>
		</Web3ReactProvider>
	);
}

export default App;

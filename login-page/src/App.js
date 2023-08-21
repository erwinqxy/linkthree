import './App.css';
import { MetamaskLoginButton } from 'react-social-login-buttons';
import icon from './icon.png';
import Popup from './Popup';
import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

import { formatBalance, formatChainAsNum } from './utils';

export function shortenAddress(address) {
  if (address.length < 10) {
    return address; // Address is too short to shorten
  }
  const firstPart = address.slice(0, 8);
  const lastPart = address.slice(-4);
  return `${firstPart}...${lastPart}`;
}

function App() {
  const [hasProvider, setHasProvider] = useState(null);
  const initialState = { accounts: [], balance: '', chainId: '' };
  const [wallet, setWallet] = useState(initialState);

  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        // if length 0, user is disconnected
        setWallet(initialState);
      }
    };

    const refreshChain = (chainId) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        refreshAccounts(accounts);
        window.ethereum.on('accountsChanged', refreshAccounts);
        window.ethereum.on('chainChanged', refreshChain);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener('accountsChanged', refreshAccounts);
      window.ethereum?.removeListener('chainChanged', refreshChain);
    };
  }, []);

  const updateWallet = async (accounts) => {
    const balance = formatBalance(
      await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      })
    );
    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    });
    setWallet({ accounts, balance, chainId });
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    await window.ethereum
      .request({
        method: 'eth_requestAccounts',
      })
      .then((accounts) => {
        setError(false);
        updateWallet(accounts);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
      });
    setIsConnecting(false);
  };

  const disableConnect = Boolean(wallet) && isConnecting;

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='header-content'>
          <div className='logo-name'>
            <img src={icon} alt='LinkThree Logo' className='company-logo' />
            <span className='company-name'>LinkThree</span>
          </div>
          <div className='metamask-button-container'>
            {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
              <MetamaskLoginButton disabled={disableConnect} onClick={handleConnect} />
            )}
            {wallet.accounts.length > 0 && (
              <div className='wallet-accounts-container'>
                <div className='wallet-accounts'>
                  <p>Wallet: {shortenAddress(wallet.accounts[0])} connected 🟢</p>
                </div>
              </div>
            )}
            {error && (
              <div onClick={() => setError(false)}>
                <strong>Error:</strong> {errorMessage}
              </div>
            )}
          </div>
        </div>

        <div className='login-box'>
          <Popup />
        </div>
      </header>
    </div>
  );
}

export default App;

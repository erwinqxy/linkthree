// App.js
import './App.css';
import {
  FacebookLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
  TwitterLoginButton,
} from 'react-social-login-buttons';
import icon from './icon.png';
import Popup from './Popup';

function App() {
  function handleLoginClick() {
    alert('Login button clicked!');
  }

  function handleConnectWalletClick() {
    alert('Connect Wallet button clicked!');
    // You can implement wallet connection logic here
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='header-content'>
          <div className='logo-name'>
            <img src={icon} alt='LinkThree Logo' className='company-logo' />
            <span className='company-name'>LinkThree</span>
          </div>
          <button className='connect-wallet-button' onClick={handleConnectWalletClick}>
            Connect Wallet
          </button>
        </div>
        <div className='login-box'>
          <Popup></Popup>
        </div>
      </header>
    </div>
  );
}

export default App;

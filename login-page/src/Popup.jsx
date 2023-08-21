import React, { useState } from 'react';
import './Popup.css';
import verified from './assets/img/verified.png';
import noun from './assets/img/noun.png';
import instagram from './assets/img/instagram.png';
import facebook from './assets/img/facebook.png';
import linkedinLogo from './assets/img/linkedinLogo.png';
import twitter from './assets/img/twitter.png';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';

export function shortenAddress(address) {
  if (address.length < 10) {
    return address; // Address is too short to shorten
  }
  const firstPart = address.slice(0, 8);
  const lastPart = address.slice(-4);
  return `${firstPart}...${lastPart}`;
}

const registerPage = 'https://verilancer-fe.vercel.app/';

const SocialMediaContainer = ({ platformIcon, handle, redirectUrl, isVerified, img }) => {
  if (platformIcon === linkedinLogo) {
    return <div className='social-media-container'>{img}</div>;
  }
  return (
    <a
      href={redirectUrl ? redirectUrl : registerPage}
      target='_blank'
      className='social-media-link'
      rel='noreferrer'
    >
      <div className='social-media-container'>
        <p>
          <img className='social-media-icon' src={platformIcon} alt='social media Icon' />
        </p>
        <p className='social-details'>
          {handle ? handle : 'Login now'}{' '}
          {isVerified && (
            <img className='social-media-verified' src={verified} alt='social verified' />
          )}
        </p>
      </div>
    </a>
  );
};

const Popup = () => {
  const { linkedInLogin } = useLinkedIn({
    clientId: '86vhj2q7ukf83q',
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: (code) => {
      console.log(code);
      setCode(code);
      setErrorMessage('');
      setIsLoggedIn(true); // Move this line outside the callback
      console.log('im in');
    },
    scope: 'r_emailaddress r_liteprofile',
    onError: (error) => {
      console.log(error);
      setCode('');
      setErrorMessage(error.errorMessage);
    },
  });

  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div className='popup-container'>
      <div className='profile-header'>
        <h1 className='profile-name'>
          John Doe
          <img className='verified-icon' src={verified} alt='Profile Icon' />
        </h1>
      </div>
      <div className='profile-container'>
        <p>
          <a
            href='https://etherscan.io/address/0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c'
            target='_blank'
            rel='noreferrer'
          >
            {' '}
            {shortenAddress('0xE94f1fa4F27D9d288FFeA234bB62E1fBC086CA0c')}
          </a>
        </p>
        <div className='profile-icon'>
          <img src={noun} alt='Profile Icon' />
        </div>
        <div className='profile-details'>
          <p>
            <strong>About</strong>: Web3 Developer @ FuturistConf
          </p>
          <p>
            <strong>Website</strong>:{' '}
            <a href='https://www.example.com' target='_blank' rel='noreferrer'>
              https://www.example.com
            </a>
          </p>
        </div>
        <div className='grid-container'>
          <SocialMediaContainer
            platformIcon={facebook}
            handle=''
            redirectUrl='https://www.facebook.com/'
          />
          <SocialMediaContainer
            platformIcon={twitter}
            handle='@KingJames'
            redirectUrl='https://twitter.com/KingJames'
            isVerified={true}
          />
          <SocialMediaContainer
            platformIcon={linkedinLogo}
            img={
              isLoggedIn ? (
                <div className='connected-label'>Connected</div>
              ) : (
                <img
                  onClick={linkedInLogin}
                  src={linkedin}
                  alt='Log in with Linked In'
                  style={{ maxWidth: '180px', cursor: 'pointer' }}
                />
              )
            }
          />
          <SocialMediaContainer
            platformIcon={instagram}
            handle='@kingjames'
            redirectUrl='https://www.instagram.com/kingjames/'
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;

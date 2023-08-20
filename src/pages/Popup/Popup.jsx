import React from 'react';
import './Popup.css';
import verified from '../../assets/img/verified.png';
import noun from '../../assets/img/noun.png';
import instagram from '../../assets/img/instagram.png';
import facebook from '../../assets/img/facebook.png';
import linkedinLogo from '../../assets/img/linkedinLogo.png';
import twitter from '../../assets/img/twitter.png';
import icon from '../../assets/img/icon.png';

export function shortenAddress(address) {
  if (address.length < 10) {
    return address; // Address is too short to shorten
  }
  const firstPart = address.slice(0, 6);
  const lastPart = address.slice(-3);
  return `${firstPart}...${lastPart}`;
}

const registerPage = 'https://verilancer-fe.vercel.app/';

const SocialMediaContainer = ({ platformIcon, handle, redirectUrl, isVerified }) => {
  return (
    <a
      href={redirectUrl ? redirectUrl : registerPage}
      target='_blank'
      className='social-media-link'
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
  return (
    <div className='popup-container'>
      <div className='linkthree-banner'>
        <div className='linkthree-left'>
          <img src={icon} alt='LinkThree Banner' />
          <p>LinkThree</p>
        </div>
        {/* <div className='linkthree-right'>
          <button className='connect-wallet-button'>Connect Wallet</button>
        </div> */}
      </div>
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
            <a href='https://www.example.com' target='_blank'>
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
            handle='@abc'
            redirectUrl='https://twitter.com/home'
          />
          <SocialMediaContainer
            platformIcon={linkedinLogo}
            handle='@def'
            redirectUrl='https://www.linkedin.com/feed/'
            isVerified={true}
          />
          <SocialMediaContainer
            platformIcon={instagram}
            handle=''
            redirectUrl='https://www.instagram.com/'
            isVerified={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;

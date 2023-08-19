import React from 'react';
import './Popup.css';
import profileIcon from '../../assets/img/profileIcon.png';
import verified from '../../assets/img/verified.png';

export function shortenAddress(address) {
  if (address.length < 10) {
    return address; // Address is too short to shorten
  }
  const firstPart = address.slice(0, 6);
  const lastPart = address.slice(-3);
  return `${firstPart}...${lastPart}`;
}

const TwitterContainer = ({ platform, handle }) => {
  return (
    <div className='twitter-container'>
      <p>
        {platform}: {handle}
      </p>
    </div>
  );
};

const Popup = () => {
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
          <a href='https://etherscan.io/address/0xe94f1fa4f27d9d288ffea234bb62e1fbc086ca0c'>
            {' '}
            {shortenAddress('0xE94f1fa4F27D9d288FFeA234bB62E1fBC086CA0c')}
          </a>
        </p>
        <div className='profile-icon'>
          <img src={profileIcon} alt='Profile Icon' />
        </div>
        <div className='profile-details'>
          <p>
            <strong>About</strong>: Web3 Developer @ FuturistConf
          </p>
          <p>
            <strong>Website</strong>:{' '}
            <a href='https://www.example.com'>https://www.example.com</a>
          </p>
        </div>
          <div className='grid-container'>
            <TwitterContainer platform='facebook' handle='@abc' />
            <TwitterContainer platform='twitter' handle='@def' />
            <TwitterContainer platform='linkedin' handle='@ghi' />
            <TwitterContainer platform='instagram' handle='@jkl' />
          </div>
        </div>
    </div>
  );
};

export default Popup;

import React, { useCallback, useState, useEffect } from 'react';
import './Popup.css';
import verified from './assets/img/verified.png';
import noun from './assets/img/noun.png';
import facebook from './assets/img/facebook.png';
import linkedinLogo from './assets/img/linkedinLogo.png';
import twitter from './assets/img/twitter.png';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import { LoginSocialGithub } from 'reactjs-social-login';
import { GithubLoginButton } from 'react-social-login-buttons';
import githubLogo from './assets/img/github-logo.png';
import axios from 'axios';

export function shortenAddress(address) {
  if (address?.length < 10) {
    return address;
  }
  const firstPart = address?.slice(0, 8);
  const lastPart = address?.slice(-4);
  return `${firstPart}...${lastPart}`;
}

export async function writeGithubToChain(address, githubUser) {
  try {
    const httpClient = axios.create({
      baseURL: 'https://link3-backend.vercel.app/proxy',
    });

    const requestData = {
      address,
      github: githubUser,
    };

    const response = await httpClient.post('/setGithub', requestData);

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const registerPage = 'https://linkthree-nu.vercel.app/';

const SocialMediaContainer = ({
  platformIcon,
  handle,
  redirectUrl,
  isVerified,
  component,
}) => {
  if (platformIcon === linkedinLogo) {
    return <div className='social-media-container'>{component}</div>;
  } else if (platformIcon === githubLogo) {
    return <div>{component}</div>;
  } else {
    return (
      <a
        href={redirectUrl ? redirectUrl : registerPage}
        target='_blank'
        className='social-media-link'
        rel='noreferrer'
      >
        <div className='social-media-container'>
          <p>
            <img
              className='social-media-icon'
              src={platformIcon}
              alt='social media Icon'
            />
          </p>
          <p className='social-details'>
            {handle ? handle : 'Login now'}{' '}
            {isVerified && (
              <img
                className='social-media-verified'
                src={verified}
                alt='social verified'
              />
            )}
          </p>
        </div>
      </a>
    );
  }
};

const Popup = (address) => {
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState();
  const [isLinkedinLoggedIn, setIsLinkedinLoggedIn] = useState(false);
  const [isGithubLoggedIn, setIsGithubLoggedIn] = useState(false);

  const onLoginStart = useCallback(() => {
    alert('logging in');
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
    alert('logout success');
  }, []);

  const { linkedInLogin } = useLinkedIn({
    clientId: '86fceak5pj0zeh',
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: (code) => {
      console.log(code);
      setCode(code);
      setErrorMessage('');
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

  useEffect(() => {
    setIsLinkedinLoggedIn(Boolean(code));
  }, [code]);

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
            {shortenAddress(address.address)}
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
            component={
              isLinkedinLoggedIn ? (
                <div>
                  <p>
                    <img
                      className='social-media-icon'
                      src={linkedinLogo}
                      alt='social media Icon'
                    />
                  </p>
                  <p>
                    {'hehe'}
                    <img
                      className='social-media-verified'
                      src={verified}
                      alt='social verified'
                    />
                  </p>
                </div>
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
            platformIcon={githubLogo}
            isVerified={true}
            component={
              profile ? (
                <div className='social-media-container'>
                  <p>
                    <img
                      className='social-media-icon'
                      src={githubLogo}
                      alt='social media Icon'
                    />
                  </p>
                  <p className='social-details'>
                    {'@' + profile.login}
                    <img
                      className='social-media-verified'
                      src={verified}
                      alt='social verified'
                    />
                  </p>
                </div>
              ) : (
                <LoginSocialGithub
                  className='social-media-container'
                  client_id={process.env.REACT_APP_GITHUB_APP_ID || ''}
                  client_secret={process.env.REACT_APP_GITHUB_APP_SECRET || ''}
                  redirect_uri={process.env.REACT_APP_REDIRECT_URI}
                  onLoginStart={onLoginStart}
                  onLogoutSuccess={onLogoutSuccess}
                  onResolve={async ({ provider, data }) => {
                    console.log(data);
                    setProvider(provider);
                    setProfile(data);
                    setIsGithubLoggedIn(true);
                    await writeGithubToChain(address.address, data.login);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <GithubLoginButton />
                </LoginSocialGithub>
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;

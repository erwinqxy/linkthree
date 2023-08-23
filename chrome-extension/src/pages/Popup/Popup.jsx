import React, { useEffect, useState } from 'react';
import './Popup.css';
import verified from '../../assets/img/verified.png';
import noun from '../../assets/img/noun.png';
import github from '../../assets/img/github.png';
import facebook from '../../assets/img/facebook.png';
import linkedinLogo from '../../assets/img/linkedinLogo.png';
import twitter from '../../assets/img/twitter.png';
import icon from '../../assets/img/icon.png';
import { ethers } from 'ethers';
import { abi } from './LinkThreeProfileAbi'



const contractOn = {
    sepolia: "0xbe4c1F5E32744C26b3d6Ad802f99696c1239f0Cc",
    xdc: "0x7b741f88a74912801ec967e2fe24af633a668319"
}
const rpcFor = {
    sepolia: "https://eth-sepolia.g.alchemy.com/v2/nhlteAOKtzO7rSq44OUNOVixQph-nSjU",
    xdc: "https://erpc.apothem.network"
}

const deployedContractAddress = contractOn.xdc;
const providerUrl = rpcFor.xdc;

export function shortenAddress(address) {
    if (address.length < 10) {
        return address; // Address is too short to shorten
    }
    const firstPart = address.slice(0, 6);
    const lastPart = address.slice(-3);
    return `${firstPart}...${lastPart}`;
}
const SocialMediaContainer = ({ platformIcon, handle, redirectUrl, isVerified, display = true }) => {
    return (
        <>
            {display && (
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
            )}
        </>
    );
};

const Popup = () => {

    console.log("popup")
    const [ethereumAddress, setEthereumAddress] = useState('');
    const [userProfile, setUserProfile] = useState(null);
    const [hasProfile, setHasProfile] = useState(false);

    function convertXDCtoEthereum(xdcAddress) {
        if (xdcAddress.startsWith('xdc')) {
            const ethereumAddress = '0x' + xdcAddress.slice(3);
            return ethereumAddress;
        } else {
            throw new Error('Invalid XDC address format');
        }
    }



    const fetchUserProfile = async (userAddress) => {
        console.log("get contract...")
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);

        const theContract = new ethers.Contract(
            deployedContractAddress,
            abi,
            provider
        );

        console.log(theContract)

        try {

            const userProfileData = await theContract.getUserProfile(userAddress);
            setUserProfile(userProfileData);
            console.log("userProfileData", userProfileData)
        } catch (error) {
            console.log("error fetching smart contract data")
            console.log(error)
        }
    };

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        const addressParam = params.get('ethereumAddress');

        if (addressParam) {
            const ethStyleAddress = convertXDCtoEthereum(addressParam)
            setEthereumAddress(ethStyleAddress);
            console.log('addressParam', ethStyleAddress);
        }


    }, []);

    useEffect(() => {
        if (ethereumAddress) {
            fetchUserProfile(ethereumAddress)
                .then(() => setHasProfile(true))
                .catch(error => console.error("Error fetching user profile:", error));
        }
    }, [ethereumAddress]);

    useEffect(() => {
        let hasValueInFirstFourPositions;

        if (userProfile) {
            console.log("Got user profile yo: ", userProfile)
            hasValueInFirstFourPositions = userProfile.slice(0, 4).some(item => item !== '');
        }

        if (!hasValueInFirstFourPositions) {
            setHasProfile(false);
            return;
        }
    }, [userProfile]);

    useEffect(() => {
        console.log("hasProfile", hasProfile)
    }, [hasProfile]);


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
                    {shortenAddress(ethereumAddress)}
                    {hasProfile && (
                        <img className='verified-icon' src={verified} alt='Profile Icon' />
                    )}
                </h1>
            </div>
            <div className='profile-container'>

                <div className='profile-icon'>
                    <img src={noun} alt='Profile Icon' />
                </div>
                <div className='profile-details'>

                    {hasProfile &&
                        <p><strong>About</strong>: {userProfile.about} </p>}


                </div>
                {hasProfile ? (
                    <div className='grid-container'>

                        <SocialMediaContainer
                            platformIcon={twitter}
                            handle={userProfile.twitter}
                            redirectUrl={`https://twitter.com/${userProfile.twitter}`}
                            isVerified={true}
                            display={userProfile.twitter}
                        />
                        <SocialMediaContainer
                            platformIcon={linkedinLogo}
                            handle={userProfile.linkedin}
                            redirectUrl={`https://www.linkedin.com/in/${userProfile.linkedin}`}
                            isVerified={true}
                            display={userProfile.linkedin}
                        />
                        <SocialMediaContainer
                            platformIcon={github}
                            handle={userProfile.github}
                            redirectUrl={`https://www.github.com/${userProfile.github}`}
                            isVerified={true}
                            display={userProfile.github}
                        />
                    </div>
                ) : (
                    <div className='no-profile-text'>No profile for this address</div>
                )}
            </div>
        </div>
    );
};

export default Popup;

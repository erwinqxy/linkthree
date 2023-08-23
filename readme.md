## Eth Toronto 2023 submission

### About
Linktree for Web3 that only lists VERIFIED web2 social accounts.
Packaged as a chrome extension for easy lookup while browsing block explorers.
Built on XDC network (testnet).

Web3 is still the wild west where anyone can pretend to be someone else. Anyone can deploy a malicious smart contract and block explorers don’t tell you much about the creator.

Web3 Developers that register a LinkThree profile can build trust for their users. As a 3rd party, we verify that a user has logs in to each web2 social media account they claim is theirs. If it all checks out, then we store their profile ID on our smart contract. 

Users with the chrome extension can right click on any link containing an XDC address, and with 1-click they can display the address’s LinkThree page.

### Implementation
Our functional chrome extension lets you right click on any link containing an XDC address to look up their profile.  You can see which verified social media profiles are linked to that address, plus a short description about the address owner.

It is built on top of a smart contract deployed on XDC apothem network. The smart contract is here:
https://explorer.apothem.network/address/xdc7b741f88a74912801ec967e2fe24af633a668319#transactions

The solidity source code is here:
https://github.com/alinobrasil/link3ethtoronto/tree/main/hardhat



Our registration page and backend API is still a work in progress. 



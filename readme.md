## Eth Toronto 2023 submission

<img width="1017" alt="Register page" src="https://github.com/erwinqxy/linkthree/assets/72030222/a278b7a0-7b0b-45a5-b961-ea9fb2a6b1ab">

<img width="575" alt="Chrome extension" src="https://github.com/erwinqxy/linkthree/assets/72030222/1458ecda-6833-4007-af32-b131adab754f">

<img width="1842" alt="contract" src="https://github.com/erwinqxy/linkthree/assets/72030222/3601cb32-ae68-4abc-aa0b-bb8294170f74">


## Demo Video:
https://youtu.be/fxCgHr__1fM

### About
Linktree for Web3 that only lists VERIFIED web2 social accounts.
Packaged as a chrome extension for easy lookup while browsing block explorers.
Built on XDC network (testnet).

LinkThree helps build trust between builders and users, to help an app chain ecosystem grow.

Web3 is still the wild west where anyone can pretend to be someone else. Anyone can deploy a malicious smart contract and block explorers don’t tell you much about the creator of a smart contract.

As a 3rd party, we verify that a user has logs in to each web2 social media account they claim is theirs. If it all checks out, then we store their profile ID on our smart contract. 

Users with the chrome extension can right click on any link containing an XDC address, and with 1-click they can display the address’s LinkThree page.

### Implementation
Our functional chrome extension lets you right click on any link containing an XDC address to look up their profile.  You can see which verified social media profiles are linked to that address, plus a short description about the address owner.

The source code & setup instructions are in the folder "chrome extension":
https://github.com/erwinqxy/linkthree/tree/main/chrome-extension

It is built on top of a smart contract deployed on XDC apothem network. The smart contract is here:
https://explorer.apothem.network/address/xdc7b741f88a74912801ec967e2fe24af633a668319#transactions

The solidity source code is here:
https://github.com/alinobrasil/link3ethtoronto/tree/main/hardhat


### WIP
Our registration page and backend API is still a work in progress. 
The login page is in the folder "login-page" in this repository.
Backend API is here:
https://github.com/alinobrasil/link3ethtoronto/tree/main


Hopefully we can complete this later, plus many improvements like:
-subsidized gas, instead of server executing
-ethereum attestation service, for better composabilty/expanding to attestations from more trustworthy entities
-web2 APIs to allow entities to attest/verify profile ownership easily.



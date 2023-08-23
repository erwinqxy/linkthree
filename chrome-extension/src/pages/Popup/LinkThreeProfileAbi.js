export const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getUserProfile",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "about",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "linkedin",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "twitter",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "github",
                        "type": "string"
                    }
                ],
                "internalType": "struct LinkThreeProfile.UserProfile",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_about",
                "type": "string"
            }
        ],
        "name": "setAbout",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_github",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "setGithub",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_linkedin",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "setLinkedin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_twitter",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "setTwitter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
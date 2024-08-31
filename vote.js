window.addEventListener('load', async () => {
    // Check if Web3 has been injected by the browser (MetaMask)
    if (window.ethereum) {
        // Use Web3 provider from MetaMask
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Define the contract ABI and address
        const contractABI = [ [
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    }
                ],
                "name": "addCandidate",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "_messageHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes",
                        "name": "_signature",
                        "type": "bytes"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_candidateId",
                        "type": "uint256"
                    }
                ],
                "name": "authenticateAndVote",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_voterAddress",
                        "type": "address"
                    }
                ],
                "name": "registerVoter",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "tallyVotes",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "name": "CandidateAdded",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256[]",
                        "name": "results",
                        "type": "uint256[]"
                    }
                ],
                "name": "ResultsTallied",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "voter",
                        "type": "address"
                    }
                ],
                "name": "VoteCast",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "voter",
                        "type": "address"
                    }
                ],
                "name": "VoterRegistered",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "admin",
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
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "candidates",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "voteCount",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "candidatesCount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "_ethSignedMessageHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes",
                        "name": "_signature",
                        "type": "bytes"
                    }
                ],
                "name": "recoverSigner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "pure",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes",
                        "name": "_sig",
                        "type": "bytes"
                    }
                ],
                "name": "splitSignature",
                "outputs": [
                    {
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "pure",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "_messageHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes",
                        "name": "_signature",
                        "type": "bytes"
                    },
                    {
                        "internalType": "address",
                        "name": "_voterAddress",
                        "type": "address"
                    }
                ],
                "name": "verifySignature",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "pure",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "voters",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "hasVoted",
                        "type": "bool"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "encryptedVote",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ] ];
        const contractAddress = '0x83d3FE497AaBcb8c065CFeC53691d5D5b431B0c0'; // Replace with your deployed contract address

        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();

        // Function to load candidates
        const loadCandidates = async () => {
            const candidates = await contract.methods.getResults().call();
            const select = document.getElementById('candidateSelect');
            select.innerHTML = '';

            candidates.forEach(candidate => {
                const option = document.createElement('option');
                option.value = candidate.id;
                option.textContent = `${candidate.name} (${candidate.voteCount} votes)`;
                select.appendChild(option);
            });
        };

        // Function to handle voting
        const vote = async () => {
            const selectedCandidateId = document.getElementById('candidateSelect').value;
            try {
                await contract.methods.vote(selectedCandidateId).send({ from: accounts[0] });
                alert('Vote cast successfully!');
                loadCandidates();
            } catch (error) {
                console.error('Error voting:', error);
            }
        };

        // Event listeners
        document.getElementById('voteButton').addEventListener('click', vote);

        // Initial load of candidates
        loadCandidates();
    } else {
        alert('Please install MetaMask to use this app.');
    }
});

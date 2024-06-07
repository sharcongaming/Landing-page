const express = require('express');
const Web3 = require('web3');
require('dotenv').config();

const app = express();
const port = 3000;

const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`));



async function authenticate() {
    const provider = await detectEthereumProvider();
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
  
    const message = 'Please sign this message to authenticate with our service.';
    const signature = await provider.request({
      method: 'personal_sign',
      params: [message, account]
    });
  
    // Send the signature to the backend for verification
    const response = await fetch('/verify-signature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ account, message, signature })
    });
  
    const result = await response.json();
    if (result.success) {
      console.log('Authenticated!');
    } else {
      console.log('Authentication failed');
    }
  }
  













app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
import React from 'react';
//import nft from 'images'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import Web3 from "web3/dist/web3.min.js";
import {
    nftAddress
}from  '../../config'

import NFT from '../../artifacts/contracts/Mint.sol/NFT.json'
import MyToken from "../../artifacts/contracts/Mytoken.sol/MyToken.json"
export default function LoadNFT(){
    var web3 = null;
    var account = null;
    let tx, value,tokenId, event, transaction= null;


async function Allowance(){
    BuyNFT();
}


async function BuyNFT(){
   
    const web3Modal = new Web3Modal()
      var provider = await web3Modal.connect();
		web3 = new Web3(provider); 
		await provider.send('eth_requestAccounts'); 
		var accounts = await web3.eth.getAccounts(); 
		account = accounts[0]; 
        console.log(account)
        let contract = new web3.eth.Contract(NFT.abi,nftAddress)
     console.log(contract)
      const token = await contract.methods.tokenAddress.call().call()
      console.log(token)
      let rate = await contract.methods.mintingRate.call().call()
      rate = rate.toString();
      console.log(rate) 
      const token1 = new web3.eth.Contract(MyToken.abi,token)
      token1.methods.approve(nftAddress,rate).send({from:account}).on("confirmation", async (num)=>{
        if(num == 0){
            transaction = await contract.methods.createToken(account).send({from:account,
                gasLimit: null,
        })
        tx = await transaction
        event = tx.events[0]
        console.log(event)
        value = event.transactionHash
        console.log(value)
       const myTid = await web3.eth.getTransactionReceipt(value).then(function(data){
            let trans = data;
            let logs = data.logs;
            console.log(logs);
            tokenId = web3.utils.hexToNumber(logs[1].topics[3])
            console.log(tokenId);
            console.log("done")
            getMintedNFT(tokenId);
        });
    }

    })
        

}

async function getMintedNFT(tokenId){
    const web3Modal = new Web3Modal()
      var provider = await web3Modal.connect();
		web3 = new Web3(provider); 
		await provider.send('eth_requestAccounts'); 
		var accounts = await web3.eth.getAccounts(); 
		account = accounts[0]; 
        console.log(account)
        let contract = new web3.eth.Contract(NFT.abi,nftAddress)
     console.log(contract)
    let tokenURI = await contract.methods.tokenURI(tokenId).call()
    console.log(tokenURI);
    
    fetch(tokenURI)
    .then(function (response) {
        return response.json ()
    }) 
    .then(function (data) {
        console.log(data)
        console.log("https://gateway.pinata.cloud/"+ data.image)
    }) 
    .catch(function (error) {
        console.log("Not Working Properly");
        console.error(error)

    })
   
}

    return(
    // <!-- Shop Product Start -->
    <div class="col-lg-9 col-md-8">
        <div class="row pb-3">

                        <div class="d-flex align-items-center justify-content-center mb-1">
                        <button type="button" onClick={Allowance} class=" inline-block px-6 py-2.5 bg-blue-600 absolute absolute inset-x-30 bottom-15 h-10 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">MINT NFT</button>
                        </div>

                    </div>
                </div>
                                                
          
);
}

//import { useState } from "react";
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';import Web3Modal from 'web3modal'
import Web3 from "web3/dist/web3.min.js";
import {
    nftAddress
}from  '../../config'
1
import NFT from '../../artifacts/contracts/Mint.sol/NFT.json'
import MyToken from "../../artifacts/contracts/Mytoken.sol/MyToken.json"


export default function NavBar() {
    const [navbar, setNavbar] = useState(false);
    const [haveMetamask, sethaveMetamask] = useState(true);
    const [accountAddress, setAccountAddress] = useState('');
    const [accountBalance, setAccountBalance] = useState('');
    const [isConnected, setIsConnected] = useState(false);
  let url,Ione,Itwo,Ithree;
    const styless = {
        paddingBottom: "2px"
    }
  
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    useEffect(() => {
      const { ethereum } = window;
      const checkMetamaskAvailability = async () => {
        if (!ethereum) {
          sethaveMetamask(false);
        }
        sethaveMetamask(true);
      };
      checkMetamaskAvailability();
    }, []);
  
    async function connectWallet() {
      try {
        if (!ethereum) {
          sethaveMetamask(false);
        }
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        let balance = await provider.getBalance(accounts[0]);
        let bal = ethers.utils.formatEther(balance);
        setAccountAddress(accounts[0]);
        setAccountBalance(bal);
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    };


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
         url = data.image;
         Ione = String(url)
        console.log(Ione)
    }) 
    .catch(function (error) {
        console.log("Not Working Properly");
        console.error(error)

    })
   
}
  
    return (
       
        
    <div>
      
           
  <div className="page-heading normal-space">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h2>Minting Dapp</h2>
          <div className="buttons">
            <div className="main-button">
              <a  onClick={connectWallet}>Connect Wallet</a>
            </div>
            <div className="border-button">
              <a onClick={Allowance}>Mint Your NFT</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
          
  <div class="categories-collections">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="categories">
            <div class="row">
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="collections">
            <div class="row">
              <div class="col-lg-12">
                <div class="section-heading">
                  <div class="line-dec"></div>
                  <h2>Limited NFT <em>Collections</em></h2>
                </div>
              </div>
              <div class="item">
                <div class="left-image">
                  <h2>Your NFT {Ione}</h2>
                  <img src={Ione} alt="" style={{borderRadius: "20px", maxWidth: "350px", maxHeight:"350px"}} />
                </div>
                </div>
           </div> 
          </div>
        </div>
      </div>
    </div>
  </div>

                           
    </div>
        //ending
    );
}
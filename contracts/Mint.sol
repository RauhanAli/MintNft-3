
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";  
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";



contract NFT is ERC721URIStorage, Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 public tokenAddress;
    address public marketContract;
    address payable nftowner;
     string public baseExtension = ".json";
      string public BASE_URI = "https://gateway.pinata.cloud/ipfs/QmYSSAphE1WeqVAPwj91fuDZo7LiSRkUeLQ36x1fRyzme1";
    uint256 public Maxsupply = 4;
    uint256 public supply = 3;

    uint256 public mintingRate = 0.5 * 10**10;
     
     constructor(address _contractaddress) ERC721("Crypto League Gaming", "CLGNFT") {
        tokenAddress = IERC20(_contractaddress);
               nftowner = payable(msg.sender);

     }

      function _baseURI() internal view override returns (string memory) {
        return string(abi.encodePacked(BASE_URI, "/"));
    }
    
       
        function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory) {
            require(
                _exists(tokenId),
                "ERC721Metadata: URI query for nonexistent token"
                );
                
                string memory currentBaseURI = _baseURI();
                return bytes(currentBaseURI).length > 0 ? string(abi.encodePacked(currentBaseURI, Strings.toString(tokenId),baseExtension)): "";
        }

      function changebaseURI(string memory baseURI) public onlyOwner {
        BASE_URI = baseURI;
      }

     function createToken(address _to) public payable returns (uint) {
        _tokenIds.increment();
        uint256 newitemId = _tokenIds.current();
         if (newitemId > 3) {
    revert("NFT collection is sold out");
         }
        // require(supply < Maxsupply);
         tokenAddress.transferFrom(msg.sender,address(this),mintingRate);
        _safeMint(_to,newitemId);
    //    _setTokenURI(newitemId, tokenURI);
        return newitemId;
     }

        function withdraw() public payable onlyOwner() {
        tokenAddress.transfer(msg.sender,tokenAddress.balanceOf(address(this)));
     }

}  
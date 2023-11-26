import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";

export default function Marketplace() {
const sampleData = [
    {
        "name": "NFT#1",
        "description": "First NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "NFT#2",
        "description": "Second NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "NFT#3",
        "description": "Third NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
];
const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);

async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        console.log("getting this tokenUri", tokenURI);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

if(!dataFetched)
    getAllNFTs();

return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-20">
            <div className="md:text-xl font-bold text-white">
                These Are Some of The NFT About Poem
            </div>
            <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
            <p style={{color:'white', fontFamily:'cursive', fontSize:'20px'}}>You can check the details of NFT by clicking at the picture as well</p>
        </div>  
        
        <div className="poem-marketplace-description">
      <h2 style={{ 
        color: 'white',
        fontSize: '24px', 
        marginBottom: '15px',
        paddingLeft: '40px',
        paddingTop: '20px',
        fontWeight: 'bold'
        
         }}>Posting Poems on the NFT Poem Marketplace</h2>
      <p style={{color: 'white', paddingLeft:'40px', paddingTop:'10px'}}>
        Welcome to the NFT Poem Marketplace, where creativity meets blockchain!
         In this vibrant corner of the digital realm, poets and wordsmiths alike 
         have the opportunity to share their literary masterpieces as unique and 
         valuable NFTs. Our platform provides a space for the poetic community to 
         showcase their talent, connect with enthusiasts, and potentially earn recognition 
         for their work in the form of blockchain-based assets.</p>
        
         <h2 style={{ 
        color: 'white',
        fontSize: '24px', 
        marginBottom: '15px',
        paddingLeft: '40px',
        paddingTop: '20px',
        fontWeight: 'bold'
        
         }}>Navigating the Digital Verse

         </h2>
      <p style={{color: 'white', paddingLeft:'40px', paddingTop:'10px'}}>
      As you traverse our user-friendly interface, you'll find a seamless 
      experience tailored to poets and NFT enthusiasts. The "Home" section 
      serves as your poetic haven, featuring a curated collection of NFT poems 
      waiting to be explored. Dive into a world where each verse is not just a 
      creation but a tokenized masterpiece.</p>
         <h2 style={{ 
        color: 'white',
        fontSize: '24px', 
        marginBottom: '15px',
        paddingLeft: '40px',
        paddingTop: '20px',
        fontWeight: 'bold'
        
         }}>Bringing Your Poems to Life

         </h2>
      <p style={{color: 'white', paddingLeft:'40px', paddingTop:'10px'}}>
      Ready to make your mark on the blockchain? Head over to the "Upload" section, 
      where you can effortlessly transform your poems into NFTs. Whether you're a 
      seasoned poet or a newcomer to the world of blockchain, our intuitive platform 
      guides you through the process of minting your poetic creations into unique digital assets.</p>

         <h2 style={{ 
        color: 'white',
        fontSize: '24px', 
        marginBottom: '15px',
        paddingLeft: '40px',
        paddingTop: '20px',
        fontWeight: 'bold',
        
         }}>Discover What You Own

         </h2>
      <p style={{color: 'white', paddingLeft:'40px', paddingTop:'10px', paddingBottom:'50px'}}>
      Curious about your NFT portfolio? The "What you own" section provides a 
      comprehensive view of your collected poems. Track the unique tokens that 
      represent your creative expressions and witness the impact your words have on 
      the growing NFT Poem Marketplace community.
        </p>

    </div>     
    <footer className="text-cente" style={{color:'white', fontSize:'20px', backgroundColor:'#161E94',marginTop:'10px,'
    

}}>   
        <p style={{ fontSize: '16px',paddingTop:'50px', paddingBottom:'50px',textAlign:'center' }}>
          © 2023 NFT Poem Marketplace. All rights reserved.
        </p>
      </footer>     
    </div>
);

}
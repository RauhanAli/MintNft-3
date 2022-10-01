import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import HomePage from '../src/pages/home'

export default function App(){
  
 return(
  <div class="bg-gradient-to-r from-purple-500 to-indigo-900">
     {/* <nav className="border-b">
    <p className='text-4xl font-bold text-blue-900'>Crypto Gaming League NFTS</p>
    <div className="mt-4"> */}
   <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/nft" element={<NFT />} /> */}
      </Routes>
    </BrowserRouter>
    

      </div>
  
 );
}
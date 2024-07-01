import React from "react";
import btc from '../assets/btc.png'

function Home() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <img src={btc} alt={'bitcoin image'} className="grayscale md:w-[600px] w-[500px] animate-imgUp" />
      <h1 className="text-white text-4xl font-semibold tracking-wider">Crypto<span className="text-purple-400">Horizon</span></h1>
    </div>
  )
}

export default Home;

import React from "react";
import { Link } from 'react-router-dom'

function CoinCard({ id, name, price, img, symbol, currencySymbol }) {
    return (

        <Link to={`/coin/${id}`}>
            <div className="p-2 py-5 w-[200px] h-[200px] bg-white shadow-lg flex flex-col justify-center items-center rounded hover:shadow-xl gap-2 duration-200 hover:scale-110">
                <img className="w-[50px]" src={img} alt={name} />
                <p className="font-bold">{symbol}</p>
                <h1 className="text-ellipsis whitespace-nowrap overflow-hidden font-semibold text-lg w-full text-center">{name}</h1>
                <h2 className="text-green-500 font-semibold tracking-wider">{price ? `${currencySymbol}${price}`  : "NA"}</h2>
            </div>
        </Link>



    )
}

export default CoinCard;

import React, { useEffect, useState } from "react";
import axios from 'axios';
import Loading from "./Loading";
import Error from "./Error";
import CoinCard from "./CoinCard";

const api = 'https://api.coingecko.com/api/v3';

function Coins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');


  const currencySymbol = (
    currency === "inr" ? '₹' : currency === 'eur' ? "€" : "$"
  )

  const changePage = (newPage) => {
    setLoading(true)
    setPage(newPage)
  }

  const btns = new Array(132).fill(1)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        // const response = await fetch(`${api}/coins/markets?vs_currency=${currency}&page=${page}`)
        // const data = await response.json()
        const { data } = await axios.get(
          `${api}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true)
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={"Error While Fetching Data"} />
  }

  if (!coins.length) {
    return <h2>NOTHING TO DISPLAY</h2>;
  }

  return (
    <main className="w-[90vw] flex flex-col m-auto mt-14 ">
       <form className="flex gap-4 mb-4 font-bold  ">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="inr"
            name="currency"
            checked={currency === "inr"}
            onChange={(e) => setCurrency(e.target.value)}
          />
          INR
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="usd"
            name="currency"
            checked={currency === "usd"}
            onChange={(e) => setCurrency(e.target.value)}
          />
          USD
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="eur"
            name="currency"
            checked={currency === "eur"}
            onChange={(e) => setCurrency(e.target.value)}
          />
          EUR
        </label>
      </form>


      <div className="flex flex-wrap items-center justify-center mb-5  gap-3">
        {coins.map((item) => (
          <CoinCard
            id={item.id}
            key={item.id}
            name={item.name}
            price={item.current_price}
            img={item.image}
            symbol={item.symbol}
            currencySymbol={currencySymbol}
          />
        ))}
      </div>

      <div className="w-full flex overflow-x-scroll overflow-y-hidden gap-2">
        {btns.map((item, index) => (
          <button
            key={index}
            onClick={() => changePage(index + 1)}
            className="bg-black text-white px-3 py-2 rounded"
          >
            {index + 1}
          </button>
        ))}
      </div>

    </main>
  );
}

export default Coins;

import React, { useEffect, useState } from "react";
import axios from 'axios';
import Loading from "./Loading";
import Error from "./Error";
import { useParams } from "react-router-dom";
import { VscTriangleUp, VscTriangleDown } from 'react-icons/vsc'
import Chart from "./Chart";

const api = 'https://api.coingecko.com/api/v3';

function CoinDetails() {
  const params = useParams()
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol = (
    currency === "inr" ? '₹' : currency === 'eur' ? "€" : "$"
  )

  const btns = ["24h", "7d", "14d", "30d", "60d", "200", "1y"]

  const switchChartStats = (key) => {
    setDays(key);
    setLoading(true);
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        // const response = await fetch(`${api}/coins/markets?vs_currency=${currency}&page=${page}`)
        // const data = await response.json()
        const { data } = await axios.get(`${api}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${api}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices)
        setLoading(false);
      } catch (error) {
        setError(true)
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={"Error While Fetching Data"} />
  }


  return (
    <main className="w-[90vw] flex flex-col m-auto mt-16">

      <div className="w-[70vw] m-auto">
        <Chart arr={chartArray} currency={currencySymbol} days={days} />

        <div className="flex gap-2 mt-2 flex-wrap">
          {btns.map((btn) => (
            <button
              key={btn}
              className={`px-3 py-2 rounded text-white font-bold duration-200 ${days === btn ? 'bg-blue-500' : 'bg-gray-400 hover:bg-gray-500'}`}
              disabled={days === btn}
              onClick={() => switchChartStats(btn)}
              
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <section className="flex self-center flex-col w-[80vw] sm:w-[60vw] lg:w-[30vw] gap-5 my-10">
        <form className="flex gap-4 mb-4 font-bold">
          <label className="flex items-center gap-2 cursor-pointer ">
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

        <div className="text-center font-semibold text-xl">
          Last Updated On{" "}
          {Date(coin.market_data.last_updated).split("G")[0]}
        </div>

        <div className="flex flex-col gap-3">
          <img
            src={coin.image.large} alt={coin.name}
            className="w-[100px] self-center"
          />
          <div>
            <h1 className="font-semibold text-xl">{coin.name}</h1>
            <p className="text-2xl font-semibold tracking-wider text-green-500">{`${currencySymbol}${coin.market_data.current_price[currency]}`}</p>
            <div>
              {coin.market_data.price_change_percentage_24h > 0 ? (
                <p className="flex items-center text-gray-600 font-semibold gap-2">
                  <VscTriangleUp className="text-2xl text-green-500" />
                  {coin.market_data.price_change_percentage_24h}%
                </p>
              ) : (
                <p className="flex items-center text-gray-600 font-semibold gap-2">
                  <VscTriangleDown className="text-2xl text-red-500" />
                  {coin.market_data.price_change_percentage_24h}%
                </p>
              )}
            </div>
          </div>
        </div>

        <h1 className="px-3 py-2 bg-black text-white w-fit rounded font-bold text-xl" title="Rank">#{coin.market_data.market_cap_rank}</h1>

        <div className="flex flex-col gap-2">
          <div
            className="p-2 bg-teal-700 rounded-sm"
          >
          </div>
          <div className="flex justify-between font-bold ">
            <p className="bg-green-200 text-green-500 px-[5px] rounded">{`${currencySymbol}${coin.market_data.high_24h[currency]}`}</p>
            <p className="text-gray-600">24H Range</p>
            <p className="bg-red-200 text-red-500 px-[5px] rounded">{`${currencySymbol}${coin.market_data.low_24h[currency]}`}</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-5 text-xl tracking-wider">
          <div
            className="flex justify-between"
          >
            <p className="font-['Bebas_Neue']">{"MAX SUPPLY"}</p>
            {coin.market_data.max_supply || 'NA'}
          </div>

          <div
            className="flex justify-between"
          >
            <p className="font-['Bebas_Neue']">{"CIRCULATING SUPPLY"}</p>
            <p>{coin.market_data.circulating_supply}</p>
          </div>

          <div
            className="flex justify-between"
          >
            <p className="font-['Bebas_Neue']">{"MARKET CAP"}</p>
            <p>{`${currencySymbol}${coin.market_data.market_cap[currency]}`}</p>
          </div>

          <div
            className="flex justify-between"
          >
            <p className="font-['Bebas_Neue']">{"ALL TIME HIGH"}</p>
            <p>{`${currencySymbol}${coin.market_data.ath[currency]}`}</p>
          </div>

          <div
            className="flex justify-between"
          >
            <p className="font-['Bebas_Neue']">{"ALL TIME LOW"}</p>
            <p>{`${currencySymbol}${coin.market_data.atl[currency]}`}</p>
          </div>
        </div>

      </section>

    </main>
  )
}


export default CoinDetails;

import React, { useEffect, useState } from "react";
import axios from 'axios';
import Loading from "./Loading";
import Error from "./Error";

const api = 'https://api.coingecko.com/api/v3';

function Exchanges() {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${api}/exchanges`);
                setExchanges(data);
                setLoading(false);
            } catch (error) {
                setError(true)
                setLoading(false);
            }
        };
        fetchExchanges();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error message={"Error While Fetching Data"} />
    }

    if (!exchanges.length) {
        return <h2>NOTHING TO DISPLAY</h2>;
    }

    return (
        <main className="w-[90vw] flex justify-center mt-16 flex-wrap m-auto gap-3">
            {exchanges.map((item) => {
                const { image: img, trust_score_rank: rank, name, url } = item;
                return (
                    <a href={url} key={item.id} target="_blank" className="">
                        <div className="p-2 w-[150px] bg-white h-[150px] sm:w-[200px] sm:h-[200px] shadow-lg flex flex-col justify-center items-center rounded hover:shadow-xl gap-2 duration-200 hover:scale-110">
                            <img src={img} alt={name} />
                            <p className="font-bold">{rank}</p>
                            <h1 className="text-ellipsis whitespace-nowrap overflow-hidden font-semibold text-lg w-full text-center">{name}</h1>
                        </div>
                    </a>
                )
            })}
        </main>
    );
}

export default Exchanges;

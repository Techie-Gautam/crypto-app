import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-black text-white px-4 py-3 fixed top-0 w-full z-10">
        <ul className="flex items-center justify-center gap-7 text-xl">
            <li>
                <NavLink
                to={'/'}
                className={({isActive}) => `hover:text-purple-300 font-semibold ${isActive ? 'text-purple-400' : 'text-white'}`}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                to={'/exchanges'}
                className={({isActive}) => `hover:text-purple-300 font-semibold ${isActive ? 'text-purple-400' : 'text-white'}`}
                >
                    Exchanges
                </NavLink>
            </li>
            <li>
                <NavLink
                to={'/coins'}
                className={({isActive}) => `hover:text-purple-300 font-semibold ${isActive ? 'text-purple-400' : 'text-white'}`}
                >
                    Coins
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Header;

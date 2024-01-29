import React from "react";
import logo from "../../assets/images/logo-large-white.png";
import { openNewTab } from "../../shared/services/tabManager";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return (
    <div className="flex-col justify-between items-center">
      <img src={logo} />
      {!isLoggedIn && (
        <button className="border-solid border-2 border-opacity-30 border-slate-800 bg-blue-500 px-5 py-2 rounded-full" onClick={() => openNewTab("/login")}>
          <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  text-white font-medium text-l ">Sign In</p>
        </button>
      )}
    </div>
  );
};

export default HomePage;

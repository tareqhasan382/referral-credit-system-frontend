"use client"
import React from "react";
import TotalReferralUser from "@/componets/dashboard/TotalReferralUser";

const Header = () => {

  return (
    <header
      className="w-full flex items-center flex-row justify-between"
    >
      <div className={"w-full"}>
        <TotalReferralUser/>
      </div>

    </header>
  );
};

export default Header;

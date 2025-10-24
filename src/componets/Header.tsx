"use client"
import React, {useState} from "react";
import LoginModal from "@/componets/LoginModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDeactivate = () => {
    setIsModalOpen(false);
  };
  return (
    <header
      className="h-[80px] bg-blue-400 px-2 flex items-center flex-row justify-between"
    >
      <div>Header</div>
      <div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setIsModalOpen(true)}
        >
          Sign in
        </button></div>
      <LoginModal isOpen={isModalOpen} onClose={handleClose} onDeactivate={handleDeactivate}/>
    </header>
  );
};

export default Header;

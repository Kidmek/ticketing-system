import React from "react";

const Header: React.FC<{ header: string }> = ({ header }) => {
  return (
    <h1 className="p-6 text-2xl font-bold text-gray-800 mb-6">{header}</h1>
  );
};

export default Header;

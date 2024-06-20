import React from "react";

const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className="bg-blue-800 p-4 m-4 text-xl font-bold rounded-lg w-[80%]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

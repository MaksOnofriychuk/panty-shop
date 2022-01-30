import React from "react";
import "./_button.scss";

const button = ({ children, className, onClick }) => {
  return <button onClick={onClick} className={className}>{children}</button>;
};

export default button;

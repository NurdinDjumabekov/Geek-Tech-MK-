import React from "react";
import "./style.scss";

const Krest = ({ onClick }) => {
  return (
    <div className="krest" onClick={onClick}>
      <div className="krest__inner">
        <div className="line deg" />
        <div className="line degMinus" />
      </div>
    </div>
  );
};

export default Krest;

import React from "react";
import "./style.scss";

const ChoiceAgents = ({ item, setState, prev, keyGuid, keyText }) => {
  /////// для выбора агнетов

  const changeSelect = (value) => setState({ ...prev, [keyGuid]: value });

  const activeBl = prev?.[keyGuid] === item?.[keyGuid];

  const activeText = prev?.[keyGuid] === item?.[keyGuid];

  return (
    <button
      className={`selectBlockInnerAgent ${activeBl ? "activeSelectAgent" : ""}`}
      onClick={() => changeSelect(item?.[keyGuid])}
    >
      <p className={`selectText ${activeText ? "activeSelectText" : ""}`}>
        {item?.[keyText]}
      </p>
    </button>
  );
};

export default ChoiceAgents;

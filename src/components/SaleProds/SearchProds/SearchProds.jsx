/////// fns
import { changeSearchProd } from "../../../store/reducers/stateSlice";
import { clearListProductTT } from "../../../store/reducers/requestSlice";
import { searchProdTT } from "../../../store/reducers/requestSlice";

/////// hooks
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback } from "react";
import { debounce } from "lodash";

/////// imgs
import searchIcon from "../../../assets/icons/searchIcon.png";

/////// style
import "./style.scss";

const SearchProds = ({ refInput }) => {
  const dispatch = useDispatch();

  const { searchProd } = useSelector((state) => state.stateSlice);

  const searchData = useCallback(
    debounce((text) => {
      if (text?.length > 1) {
        dispatch(searchProdTT(text)); // Выполнение поиска с заданными параметрами
      }
    }, 800),
    []
  );

  const onChange = (e) => {
    const text = e.target.value;
    dispatch(changeSearchProd(text));
    searchData(text);
    if (text === "") {
      dispatch(clearListProductTT());
    }
  };

  return (
    <div className="blockSearch">
      <input
        ref={refInput}
        placeholder="Поиск..."
        onChange={onChange}
        value={searchProd}
      />
      <button onClick={() => refInput?.current?.focus()}>
        <img src={searchIcon} alt="o" />
      </button>
    </div>
  );
};

export default SearchProds;

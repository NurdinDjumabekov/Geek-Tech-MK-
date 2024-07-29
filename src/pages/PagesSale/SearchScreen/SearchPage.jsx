//////// hooks
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

//////// fns
import { clearListProductTT } from "../../../store/reducers/requestSlice";
import { changeSearchProd } from "../../../store/reducers/stateSlice";

//////// components
import EveryProduct from "../../../components/SaleProds/EveryProduct/EveryProduct";
import NavMenu from "../../../common/NavMenu/NavMenu";
import SearchProds from "../../../components/SaleProds/SearchProds/SearchProds";

//////// style
import "./style.scss";

const SearchPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { guid } = location.state; ////guid созданной накладной

  const { listProductTT } = useSelector((state) => state.requestSlice);

  const refInput = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      refInput?.current?.focus();
    }, 300);

    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      dispatch(clearListProductTT());
      dispatch(changeSearchProd(""));
    };
    //// очищаю список категорий и товаров
  }, []);

  return (
    <>
      <NavMenu>
        <SearchProds refInput={refInput} />
      </NavMenu>
      <div className="parentBlockSearch">
        {listProductTT?.map((item, index) => (
          <EveryProduct key={item.guid} obj={item} index={index} guid={guid} />
        ))}
      </div>
    </>
  );
};

export default SearchPage;

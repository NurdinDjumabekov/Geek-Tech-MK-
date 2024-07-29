/// hooks
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

///fns
import { clearListProductTT } from "../../../store/reducers/requestSlice";
import { changeSearchProd } from "../../../store/reducers/stateSlice";

///components
import NavMenu from "../../../common/NavMenu/NavMenu";
import ListSoldProduct from "../../../components/SaleProds/ListSoldProduct/ListSoldProduct";
import SaleMenu from "../../../common/SaleMenu/SaleMenu";

///style
import "./style.scss";

const AddProdSoputkaPage = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { guid } = location.state?.forAddTovar; ////guid созданной накладной

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      dispatch(clearListProductTT());
      dispatch(changeSearchProd(""));
    };
    //// очищаю список категорий и товаров
  }, []);

  const openScanerAddProd = () => {
    navigate("/sale/scanner_prod", { state: { guid } });
    ////guid созданной накладной
  };

  return (
    <>
      <NavMenu navText={"Выбор товара"} />
      <div className="addProds">
        <div className="childBlock">
          <button onClick={openScanerAddProd} className="arrowBlock">
            <p className="textBtn">Сканировать товар</p>
            <div className="arrow"></div>
          </button>
          <ListSoldProduct guidInvoice={guid} />
        </div>
        {/* ///// модалка для добавления товаров */}
        <SaleMenu guid={guid} />
      </div>
    </>
  );
};

export default AddProdSoputkaPage;

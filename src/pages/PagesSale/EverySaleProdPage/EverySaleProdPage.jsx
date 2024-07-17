///hooks
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

////// fns
import { addProductSoputkaTT } from "../../../store/reducers/requestSlice.js";
import { getListSoputkaProd } from "../../../store/reducers/requestSlice.js";
import { getEveryProd } from "../../../store/reducers/requestSlice.js";

////components
import NavMenu from "../../../common/NavMenu/NavMenu.jsx";
import Krest from "../../../common/Krest/Krest.jsx";

////style
import "./style.scss";

const EverySaleProdPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const refInput = useRef(null);

  const invoice_guid = location.state?.guid; //// guid созданной накладной
  const guid = location.state?.obj?.guid; //// guid товара

  const { data } = useSelector((state) => state.saveDataSlice);

  const { everyProdSale } = useSelector((state) => state.requestSlice);

  const [sum, setSum] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    if (/^\d*\.?\d*$/.test(value)) {
      // Проверяю, не является ли точка первым символом
      if (value === "." || value?.indexOf(".") === 0) {
        return;
      }
      setSum(value);
    }
  };

  useEffect(() => {
    if (!!guid) {
      setTimeout(() => {
        refInput?.current?.focus();
      }, 400);
    }
    dispatch(getEveryProd({ guid, seller_guid: data?.seller_guid }));
    /////// получаю каждый продукт для продажи

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getData = () => {
    dispatch(getListSoputkaProd(invoice_guid));
  }; /// для отображения всех проданных товаров

  const addInInvoice = (e) => {
    e.preventDefault();

    if (sum == "" || sum == 0) {
      alert("Введите количество");
    } else {
      const data = {
        invoice_guid,
        count: sum,
        price: everyProdSale?.product_price,
        guid,
      };

      dispatch(addProductSoputkaTT({ data, navigate, getData }));
      ///// продаю товар
    }
  };

  const onClose = () => navigate(-1);

  return (
    <>
      <NavMenu navText={"Назад"} />
      <form className="parentEveryProdSale" onSubmit={addInInvoice}>
        <p className="title">{everyProdSale?.product_name}</p>
        <Krest onClick={onClose} />
        <div className="addDataBlock">
          <div className="inputBlock">
            <p className="inputTitle">Цена продажи за шт.</p>
            <input
              className="input"
              value={`${everyProdSale?.product_price} сомони`}
              readOnly
            />
          </div>
          <div className="inputBlock">
            <p className="inputTitle">Введите итоговое количество товара</p>
            <input
              className="input"
              ref={refInput}
              value={sum}
              onChange={onChange}
              maxLength={8}
            />
          </div>
        </div>
        <button className="btnAddProds" type="submit">
          Продать товар
        </button>
      </form>
    </>
  );
};

export default EverySaleProdPage;

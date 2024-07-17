///hooks
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////components
import { addProductSoputkaTT } from "../../../store/reducers/requestSlice.js";
import { getListSoputkaProd } from "../../../store/reducers/requestSlice.js";
import { getEveryProd } from "../../../store/reducers/requestSlice.js";

////style
import "./style.scss";

const EverySaleProdScreen = ({ route }) => {
  const invoice_guid = route.params?.guid; //// guid созданной накладной
  const guid = route.params?.obj?.guid; //// guid товара

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refInput = useRef(null);

  const [sum, setSum] = useState("");

  const { everyProdSale } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const onChange = (e) => {
    const text = e.taget.value;
    if (/^\d*\.?\d*$/.test(text)) {
      // Проверяем, не является ли точка или запятая первым символом
      if (text === "." || text?.indexOf(".") === 0) {
        return;
      }
      setSum(text);
    }
  };

  useEffect(() => {
    if (!!invoice_guid) {
      setTimeout(() => {
        refInput?.current?.focus();
      }, 400);
    }

    dispatch(getEveryProd({ guid, seller_guid: data?.seller_guid }));
    /////// получаю каждый продукт для продажи
  }, []);

  const getData = () => {
    dispatch(getListSoputkaProd(invoice_guid));
  }; /// для отображения всех проданных товаров

  const addInInvoice = () => {
    if (sum == "" || sum == 0) {
      Alert.alert("Введите количество");
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
    <div className="parentSale">
      <p className="title">{everyProdSale?.product_name}</p>

      <Krest onClick={onClose} />
      <div className="addDataBlock">
        <div className="inputBlock">
          <p className="inputTitle">Цена продажи за шт.</p>
          <div className="inputPrice">
            <p className="price">{everyProdSale?.product_price} сомони</p>
          </div>
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
      <button className="btnAdd" onclick={addInInvoice}>
        Продать товар
      </button>
    </div>
  );
};

export default EverySaleProdScreen;

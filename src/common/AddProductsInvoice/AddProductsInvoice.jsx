//////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

//////// fns
import { changeSearchProd } from "../../store/reducers/stateSlice";
import { clearTemporaryData } from "../../store/reducers/stateSlice";
import { changeTemporaryData } from "../../store/reducers/stateSlice";
// import { addProductReturn } from "../../store/reducers/requestSlice";
import { addProductSoputkaTT } from "../../store/reducers/requestSlice";
import { getWorkShopsGorSale } from "../../store/reducers/requestSlice";
import { changeLocalData } from "../../store/reducers/saveDataSlice";

///////// helpers
import { getLocalDataUser } from "../../helpers/returnDataUser";

///////// components
import Modals from "../Modals/Modals";
import Krest from "../Krest/Krest";

///////// style
import "./style.scss";

const AddProductsInvoice = (props) => {
  const { forAddTovar } = props;

  //// для добавления продуктов в список в ревизии и сопутке
  ///  location тут каждая страница, исходя их страницы я делаю действия
  const dispatch = useDispatch();
  const location = useLocation();

  const refInput = useRef(null);

  const { data } = useSelector((state) => state.saveDataSlice);

  const { temporaryData } = useSelector((state) => state.stateSlice);

  const { infoKassa } = useSelector((state) => state.requestSlice);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (/^\d*\.?\d*$/.test(value)) {
      dispatch(changeTemporaryData({ ...temporaryData, [name]: value }));
    }
  };

  const addInInvoice = () => {
    if (
      temporaryData?.price === "" ||
      temporaryData?.ves === "" ||
      temporaryData?.price == 0 ||
      temporaryData?.ves == 0
    ) {
      const text = `Введите цену и ${
        temporaryData?.unit_codeid == 1 ? "количество" : "вес"
      }`;
      alert(text);
    } else {
      const data = {
        guid: temporaryData?.guid,
        count: temporaryData?.ves,
        invoice_guid: infoKassa?.guid,
        price: temporaryData?.price,
        sale_price: temporaryData?.sale_price,
      };

      if (location?.pathname === "/soputka/add") {
        /// сопутка
        const obj = { ...data, ...forAddTovar };
        dispatch(addProductSoputkaTT({ obj, getData }));
      } else if (location?.pathname === "AddProdReturnSrceen") {
        /// возврат
        // const obj = { ...data, ...forAddTovar }; //// доделать
        // dispatch(addProductReturn({ obj, getData }));
      }
    }
  };

  const getData = async () => {
    await getLocalDataUser({ changeLocalData, dispatch });
    const sendData = { seller_guid: data?.seller_guid, type: "sale" };
    // ////// внутри есть getCategoryTT и getProductTT
    dispatch(getWorkShopsGorSale({ ...sendData, location }));

    dispatch(changeSearchProd(""));
    ////// очищаю поиск
  }; /// для вызова категорий и продуктов

  const onClose = () => dispatch(clearTemporaryData());

  useEffect(() => {
    if (!!temporaryData?.guid) {
      setTimeout(() => {
        refInput?.current?.focus();
      }, 200);
    }
  }, [temporaryData?.guid]);

  const textTitle = `Введите  ${
    temporaryData?.unit_codeid == 1 ? "кол-во товара" : "вес товара"
  }`;

  return (
    <Modals openModal={!!temporaryData?.guid} setOpenModal={onClose}>
      <div className="addProdParent">
        <div className="addProdchild">
          <h6>{temporaryData?.product_name}</h6>
          <Krest onClick={onClose} />
          <div className="addDataBlock">
            <div className="inputBlock">
              <h5>Введите цену</h5>
              <input
                value={`${temporaryData?.price?.toString()} сом`}
                onChange={onChange}
                name="price"
                maxLength={8}
              />
            </div>
            <div className="inputBlock">
              <h5>{textTitle}</h5>
              <input
                ref={refInput}
                value={temporaryData?.ves}
                onChange={onChange}
                name="ves"
                maxLength={8}
              />
            </div>
          </div>
          <button className="btnAddProds" onClick={addInInvoice}>
            Добавить
          </button>
        </div>
      </div>
    </Modals>
  );
};

export default AddProductsInvoice;

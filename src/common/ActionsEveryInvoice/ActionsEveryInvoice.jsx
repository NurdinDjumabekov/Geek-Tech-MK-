///// hooks
import { useDispatch, useSelector } from "react-redux";

/////fns
import { getProductTT, getCategoryTT } from "../../store/reducers/requestSlice";
import { clearLeftovers } from "../../store/reducers/requestSlice";
import { getMyLeftovers } from "../../store/reducers/requestSlice";
import { clearListCategory } from "../../store/reducers/requestSlice";
import { clearListProductTT } from "../../store/reducers/requestSlice";
import { changeActiveSelectCategory } from "../../store/reducers/stateSlice";
import { clearTemporaryData } from "../../store/reducers/stateSlice";
import { changeActiveSelectWorkShop } from "../../store/reducers/stateSlice";
import { changeSearchProd } from "../../store/reducers/stateSlice";

/////// components
import Selects from "../Selects/Selects";

////style
import "./style.scss";

const ActionsEveryInvoice = ({ location, type }) => {
  const dispatch = useDispatch();

  const { listCategory, listWorkShopSale } = useSelector(
    (state) => state.requestSlice
  );

  const { activeSelectCategory, activeSelectWorkShop } = useSelector(
    (state) => state.stateSlice
  );

  const { data } = useSelector((state) => state.saveDataSlice);

  const { seller_guid } = data;

  const onChangeWorkShop = ({ value }) => {
    if (value !== activeSelectCategory) {
      dispatch(clearListCategory()); //// очищаю список категорий перед отправкой запроса
      const send = { seller_guid, type, workshop_guid: value };
      setTimeout(() => {
        dispatch(getCategoryTT({ ...send, location }));
      }, 300);
      dispatch(changeActiveSelectWorkShop(value));
      /// хранение активной категории, для сортировки товаров(храню guid категории)
      clear();
    }
  };

  const onChangeCateg = ({ value }) => {
    if (value !== activeSelectCategory) {
      dispatch(clearListProductTT()); //// очищаю список товаров перед отправкой запроса
      dispatch(clearLeftovers()); //// очищаю массив данныз остатков
      dispatch(changeActiveSelectCategory(value));

      setTimeout(() => {
        if (type == "sale") {
          const obj = { workshop_guid: activeSelectWorkShop, location };
          dispatch(getProductTT({ ...obj, guid: value, seller_guid }));
        } else if (type == "leftovers") {
          const obj = { workshop_guid: activeSelectWorkShop, seller_guid };
          dispatch(getMyLeftovers({ ...obj, category_guid: value }));
        }
      }, 300);

      /// хранение активной категории, для сортировки товаров(храню guid категории)
      clear();
    }
  };

  const clear = () => {
    dispatch(changeSearchProd(""));
    ////// очищаю поиск
    dispatch(clearTemporaryData());
    ////// очищаю временный данные для продажи
  };

  return (
    <div className="parentSelects">
      <p className="choiceCateg">Выберите цех</p>
      <div className="blockSelect">
        <Selects
          list={listWorkShopSale}
          activeValue={activeSelectWorkShop}
          onChange={onChangeWorkShop}
          placeholder={"Выберите цех"}
        />
        <div className="arrowSelect"></div>
      </div>
      <p className="choiceCateg">Выберите категорию</p>
      <div className="blockSelect">
        <Selects
          list={listCategory}
          activeValue={activeSelectCategory}
          onChange={onChangeCateg}
          placeholder={"Выберите категорию"}
        />
        <div className="arrowSelect"></div>
      </div>
    </div>
  );
};

export default ActionsEveryInvoice;

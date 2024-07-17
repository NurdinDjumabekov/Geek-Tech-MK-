////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// fns
import { confirmSoputka } from "../../../store/reducers/requestSlice";
import { deleteSoputkaProd } from "../../../store/reducers/requestSlice";
import { getListSoputkaProd } from "../../../store/reducers/requestSlice";

////// components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import Krest from "../../../common/Krest/Krest";

////// style
import "./style.scss";

const ListSoldProduct = ({ guidInvoice }) => {
  //// список проданных продуктов
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalItemGuid, setModalItemGuid] = useState(null); // Состояние для идентификатора элемента, для которого открывается модальное окно
  const [modalConfirm, setModalConfirm] = useState(false);

  const { listProdSoputka } = useSelector((state) => state.requestSlice);

  const list = listProdSoputka?.[0]?.list;

  const getData = () => dispatch(getListSoputkaProd(guidInvoice));

  useEffect(() => {
    getData();
  }, [guidInvoice]);

  const del = (product_guid) => {
    dispatch(deleteSoputkaProd({ product_guid, getData }));
    setModalItemGuid(null);
    ////// удаление продуктов сопутки
  };

  const confirmBtn = () => {
    const products = listProdSoputka?.[0]?.list?.map((item) => ({
      guid: item?.guid,
    }));
    const sendData = { products, invoice_guid: guidInvoice };
    dispatch(confirmSoputka({ sendData, navigate }));
    ///// подтверждение накладной сопутки
  };

  //////// беру в списке товаров guid для отправки для подтверждения

  const emptyList = listProdSoputka?.length === 0;
  const moreOne = list?.length > 0;

  return (
    <>
      {emptyList ? (
        <p className="noneData">Список пустой</p>
      ) : (
        <div className="listSoldsParent">
          <div className="flatList">
            {list?.map((item, index) => (
              <div className="containerList" key={item?.guid}>
                <div className="parentBlock">
                  <div className="mainData">
                    <p className="indexNums">{list?.length - index} </p>
                    <div>
                      <p className="titleDate">{item?.date || "..."}</p>
                      <p className="totalPrice">
                        {item?.product_price} х {item?.count} = {item?.total}{" "}
                        сомони
                      </p>
                    </div>
                  </div>
                  <Krest onClick={() => setModalItemGuid(item?.guid)} />
                </div>
                <div>
                  <p className="title">{item?.product_name}</p>
                </div>

                <ConfirmationModal
                  visible={modalItemGuid == item.guid}
                  message="Отменить ?"
                  onYes={() => del(item.guid)}
                  onNo={() => setModalItemGuid(null)}
                  onClose={() => setModalItemGuid(null)}
                />
              </div>
            ))}
          </div>
          {moreOne && (
            <button className="sendBtn" onClick={() => setModalConfirm(true)}>
              Подтвердить
            </button>
          )}
        </div>
      )}
      <ConfirmationModal
        visible={modalConfirm}
        message="Подтвердить ?"
        onYes={confirmBtn}
        onNo={() => setModalConfirm(false)}
        onClose={() => setModalConfirm(false)}
      />
    </>
  );
};

export default ListSoldProduct;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmSoputka,
  deleteSoputkaProd,
  getListSoputkaProd,
} from "../../../store/reducers/requestSlice";
import { formatCount } from "../../../helpers/amounts";
import { useState } from "react";
import Krest from "../../../common/Krest/Krest";
import { useLocation, useNavigate } from "react-router-dom";
import NavMenu from "../../../common/NavMenu/NavMenu";
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";

////// style
import "./style.scss";

const SoputkaProdHistoryPage = () => {
  //// история каждой накладной сапутки
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { guidInvoice } = location.state;

  const [modalItemGuid, setModalItemGuid] = useState(null); // Состояние для идентификатора элемента, для которого открывается модальное окно
  const [confirm, setConfirm] = useState(false); // Состояние для идентификатора элемента, для которого открывается модальное окно

  const { listProdSoputka } = useSelector((state) => state.requestSlice);

  const getData = () => dispatch(getListSoputkaProd(guidInvoice));

  useEffect(() => {
    getData();
  }, [listProdSoputka?.[0]?.doctor]);

  const confirmBtn = () => {
    const products = listProdSoputka?.[0]?.list?.map((item) => ({
      guid: item?.guid,
    }));
    const sendData = { products, invoice_guid: guidInvoice };

    dispatch(confirmSoputka({ sendData, navigate }));
    /// подтверждение накладной сопутки
  };

  const addProd = () => {
    const forAddTovar = { guid: guidInvoice };
    navigate("/sale/add_prod", { state: { forAddTovar } });
  };

  const del = (product_guid) => {
    dispatch(deleteSoputkaProd({ product_guid, getData }));
    setModalItemGuid(null);
  };

  const status = listProdSoputka?.[0]?.status === 0;
  /// 0 - не подтверждён else подтверждён

  const listData = listProdSoputka?.[0]?.list;

  return (
    <>
      <NavMenu navText={`${listProdSoputka?.[0]?.doctor}`} />
      <div className="saleHistory">
        <div className="historyParent">
          {listData?.map((item, index) => (
            <div key={item?.guid}>
              <div className="everyInner">
                <div className="mainData">
                  <div className="mainDataInner">
                    <p className="indexNums">{index + 1}</p>
                    <div>
                      <p className="date">{item.date} </p>
                      <p className="sum">
                        {item.product_price} х {item.count} ={" "}
                        {formatCount(item.total)} сомони
                      </p>
                    </div>
                  </div>
                  {status && (
                    <Krest onClick={() => setModalItemGuid(item?.guid)} />
                  )}
                </div>
                <p className="title">{item.product_name}</p>
              </div>
              <ConfirmationModal
                visible={modalItemGuid === item?.guid}
                message="Отменить продажу ?"
                onYes={() => del(item.guid)}
                onNo={() => setModalItemGuid(null)}
                onClose={() => setModalItemGuid(null)}
              />
            </div>
          ))}
        </div>
        {status && (
          <div className="actions">
            <button className="sendBtn" onClick={() => setConfirm(true)}>
              Подтвердить
            </button>
            <button className="sendBtn" onClick={addProd}>
              Добавить товар
            </button>
          </div>
        )}
      </div>
      <ConfirmationModal
        visible={confirm}
        message="Подтвердить ?"
        onYes={() => confirmBtn()}
        onNo={() => setConfirm(false)}
        onClose={() => setConfirm(false)}
      />
    </>
  );
};

export default SoputkaProdHistoryPage;

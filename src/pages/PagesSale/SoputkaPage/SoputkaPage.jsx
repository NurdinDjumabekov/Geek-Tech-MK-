//////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//////// fns
import { clearListCategory } from "../../../store/reducers/requestSlice";
import { clearListProductTT } from "../../../store/reducers/requestSlice";
import { getHistorySoputka } from "../../../store/reducers/requestSlice";

//////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

//////// helpers
import { formatCount } from "../../../helpers/amounts";

//////// style
import "./style.scss";

const SoputkaPage = () => {
  //// Сопутка
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.saveDataSlice);

  const { listHistorySoputka } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      dispatch(clearListCategory());
      dispatch(clearListProductTT());
      //// очищаю список категорий и товаров
    };
  }, []);

  const getData = () => {
    dispatch(getHistorySoputka(data?.seller_guid));
  };

  const nav = (guidInvoice) => {
    navigate("/sale/every_list_history", { state: { guidInvoice } });
  };

  const openScaner = () => navigate("/doctor/scanner");

  const openListDoctors = () => navigate("/doctor/main");

  return (
    <>
      <NavMenu navText={"Проданные товары"} />
      <div className="containerMainSale">
        <div className="soputkaBlock">
          <button className="soputkaBtn" onClick={openScaner}>
            Отсканировать QR код врача
          </button>
          <button className="soputkaBtn" onClick={openListDoctors}>
            Выбрать врача в ручную
          </button>
        </div>
        <div className="selectBlock">
          <p className="title">История продаж</p>
          {listHistorySoputka?.map((item, index) => (
            <div
              className="everyProd"
              key={item.guid}
              onClick={() => nav(item?.invoice_guid)}
            >
              <div className="everyProdInner">
                <div className="blockTitle">
                  <p className="nameDoctor">{item?.doctor}</p>
                  <div className="blockTitleInner">
                    <p className="indexNums">{index + 1} </p>
                    <div>
                      <p className="date">{item?.date}</p>
                      <p className="sum">
                        {formatCount(item?.total_price)} сомони
                      </p>
                    </div>
                  </div>
                </div>
                <div className="status">
                  {item?.status === 0 ? (
                    <p className="bad">Не подтверждено</p>
                  ) : (
                    <p className="good">Подтверждено</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SoputkaPage;

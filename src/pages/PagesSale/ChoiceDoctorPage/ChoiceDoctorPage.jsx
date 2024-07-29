/// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/// fns
import { createInvoiceSoputkaTT } from "../../../store/reducers/requestSlice";
import { getListAgents } from "../../../store/reducers/requestSlice";

/// style
import "./style.scss";
import NavMenu from "../../../common/NavMenu/NavMenu";

const ChoiceDoctorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listAgents } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);
  const { seller_guid } = data;

  const getData = () => dispatch(getListAgents({ seller_guid }));

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const choiceDoctor = (obj) => {
    const dataObj = { ...obj, seller_guid };
    dispatch(createInvoiceSoputkaTT({ navigate, dataObj }));
    //// после выбора доктора перекидываю в продажи товаров
  };

  return (
    <>
      <NavMenu navText={"Выбор врача"} />
      <div className="parentBlockDoctor">
        {listAgents?.map((item, index) => (
          <button
            className="blockMain"
            key={item.guid}
            onClick={() => choiceDoctor(item)}
          >
            <div className="blockMainInner">
              <div>
                <div className="mainContent">
                  <p className="title">{index + 1}. </p>
                  <p className="title ">{item?.fio}</p>
                </div>
              </div>
              <div className="arrow"></div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default ChoiceDoctorPage;

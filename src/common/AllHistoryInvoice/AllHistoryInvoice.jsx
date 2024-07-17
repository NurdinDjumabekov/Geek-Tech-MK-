import { useNavigate } from "react-router-dom";

/////// helpers
import { formatCount } from "../../helpers/amounts";

/////// style
import "./style.scss";

export const AllHistoryInvoice = (props) => {
  ////// отображаю все истории накладных
  const { item, index, keyLink } = props;

  const navigate = useNavigate();

  const nav = (guidInvoice) => navigate(keyLink, { state: { guidInvoice } });

  return (
    <div className="everyProdHistory" onClick={() => nav(item?.invoice_guid)}>
      <div className="everyProdInner">
        <div className="blockTitle">
          <div className="blockTitleInner">
            <p className="indexNums">{index + 1} </p>
            <div>
              <p className="date">{item?.date}</p>
              <p className="sum">{formatCount(item?.total_price)} сом</p>
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
      {item?.comment && <p className="comment">{item?.comment}</p>}
    </div>
  );
};

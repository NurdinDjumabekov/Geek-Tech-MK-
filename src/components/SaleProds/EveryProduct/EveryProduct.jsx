////// hooks
import { useNavigate } from "react-router-dom";

///// style
import "./style.scss";

const EveryProduct = (props) => {
  const navigate = useNavigate();

  //// SalePointScreen - для продажи
  const { obj, index, guid } = props;

  const addInTemporary = () => {
    navigate("/sale/every_prod", { state: { obj, guid } });
  };

  return (
    <button className="blockMainEveryProd" onClick={addInTemporary}>
      <div className="blockMainInner">
        <div>
          <div className="mainContent">
            <p className="title">{index + 1}. </p>
            <p className="title">{obj?.product_name}</p>
          </div>
        </div>
        <div className="arrow"></div>
      </div>
    </button>
  );
};

export default EveryProduct;

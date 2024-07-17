import { formatCount } from "../../helpers/amounts";

////style
import "./style.scss";

export const RenderResult = ({ item, index }) => {
  const count = +item?.count_usushka || +item?.count;

  return (
    <div className="everyProd">
      <p>{index + 1}. </p>
      <div>
        <p>{item.product_name}</p>
        <div className="everyProd__inner">
          <span className="koll">
            {item?.sale_price} х {count} ={" "}
            {formatCount(+item?.sale_price * count)} сом
          </span>
        </div>
      </div>
    </div>
  );
};

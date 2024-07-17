////// hooks
import { useNavigate } from "react-router-dom";

////// style
import "./style.scss";

const EveryCategory = ({ obj }) => {
  const navigate = useNavigate();

  const clickCateg = () => {
    navigate(`/${obj?.link}`, {
      id: obj?.codeid,
      name: obj?.name,
      pathApi: obj?.pathApi,
    });
  };

  return (
    <button className="parentCateg" onClick={clickCateg}>
      <div className="shadow"></div>
      <img src={obj?.img} className="backgroundImage" />
      <div className="main">
        <p className="textTitle">{obj?.name}</p>
      </div>
    </button>
  );
};

export default EveryCategory;

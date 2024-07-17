import { useNavigate } from "react-router-dom";
import arrow from "../../assets/icons/arrowNav.svg";
import "./style.scss";

const NavMenu = ({ children, navText }) => {
  const navigate = useNavigate();

  if (children) {
    return <div className="navMenuChildren">{children}</div>;
  }

  return (
    <div className="navMenu">
      <button onClick={() => navigate(-1)}>
        <img src={arrow} alt="<" />
      </button>
      <p>{navText}</p>
    </div>
  );
};

export default NavMenu;

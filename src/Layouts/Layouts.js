import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

const Layouts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // console.log(location?.pathname, "location");

  return (
    <div className="layoutBlock">
      <Outlet />
    </div>
  );
};

export default Layouts;

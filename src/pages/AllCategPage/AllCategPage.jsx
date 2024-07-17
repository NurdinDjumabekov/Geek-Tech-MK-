///// hooks
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

/////  components
import EveryCategory from "../../components/AllCategory/EveryCategory";
import NavMenu from "../../common/NavMenu/NavMenu";
import { LogOut } from "../../components/Header/LogOut/LogOut";
import UserInfo from "../../components/Header/UserInfo/UserInfo";

////// helpers
import { dataCategory } from "../../helpers/Data";

///// fns
import { getBalance } from "../../store/reducers/requestSlice";

////// styles
import "./style.scss";

const AllCategPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.saveDataSlice);
  const { balance } = useSelector((state) => state.requestSlice);

  const getData = () => dispatch(getBalance(data?.seller_guid));

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goPage = () => navigate("/pay/history");

  return (
    <>
      <NavMenu>
        <UserInfo /> <LogOut />
      </NavMenu>
      <div className="allCateg">
        {dataCategory?.map((item) => (
          <EveryCategory obj={item} key={item?.codeid} />
        ))}
      </div>
    </>
  );
};

export default AllCategPage;

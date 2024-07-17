////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

////// imgs
import userImg from "../../../assets/icons/user.png";

////// helpers
// import { getLocalDataUser } from "../../../helpers/returnDataUser";

////// components
// import { changeLocalData } from "../../../store/reducers/saveDataSlice";

////style
import "./style.scss";

const UserInfo = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.saveDataSlice);

  useEffect(() => {
    // getLocalDataUser({ changeLocalData, dispatch });
  }, []);

  return (
    <div className="headerParent">
      <img src={userImg} alt="()" />
      <div>
        <p className="userRole">{data?.point_name}</p>
        <p className="userName">{data?.seller_fio}</p>
      </div>
    </div>
  );
};

export default UserInfo;

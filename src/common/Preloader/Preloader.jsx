import { useSelector } from "react-redux";
import "./style.scss";

const Preloader = () => {
  const { preloader } = useSelector((state) => state.requestSlice);

  if (preloader) {
    return (
      <div className="preloader">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
};
export default Preloader;

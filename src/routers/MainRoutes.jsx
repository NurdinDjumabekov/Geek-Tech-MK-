////// hooks
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
////// pages
import LoginPage from "../pages/LoginPage/LoginPage";
import Layouts from "../Layouts/Layouts";
import AllCategPage from "../pages/AllCategPage/AllCategPage";
import PagesSale from "../pages/PagesSale/PagesSale";

////// components
import Preloader from "../common/Preloader/Preloader";
import PagesDoctors from "../pages/PagesDoctors/PagesDoctors";
// import Alerts from "../components/Alerts/Alerts";
// import MoreInfo from "../components/MoreInfo/MoreInfo";

const MainRoutes = () => {
  const { data } = useSelector((state) => state.saveDataSlice);

  return (
    <>
      <Routes>
        {!data?.seller_guid ? (
          <Route path="/" element={<LoginPage />} />
        ) : (
          <Route element={<Layouts />}>
            <Route path="/" element={<AllCategPage />} />
            <Route path="/sale/*" element={<PagesSale />} />
            <Route path="/doctor/*" element={<PagesDoctors />} />
          </Route>
        )}
      </Routes>

      <Preloader />
    </>
  );
};

export default MainRoutes;

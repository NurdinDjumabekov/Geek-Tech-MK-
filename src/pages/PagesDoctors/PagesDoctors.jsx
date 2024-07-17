import React from "react";
import { Route, Routes } from "react-router-dom";
import ChoiceDoctorPage from "../PagesSale/ChoiceDoctorPage/ChoiceDoctorPage";
import ScannerDoctorPage from "./ScannerDoctorPage/ScannerDoctorPage";

const PagesDoctors = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesDoctors />} />
      <Route path="/scanner" element={<ScannerDoctorPage />} />
      <Route path="/main" element={<ChoiceDoctorPage />} />
    </Routes>
  );
};

export default PagesDoctors;

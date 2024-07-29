/////// hooks
import React from "react";
import { Route, Routes } from "react-router-dom";

/////// components
import SoputkaPage from "./SoputkaPage/SoputkaPage";
import AddProdSoputkaPage from "./AddProdSoputkaPage/AddProdSoputkaPage";
import SearchPage from "./SearchScreen/SearchPage";
import EverySaleProdPage from "./EverySaleProdPage/EverySaleProdPage";
import SoputkaProdHistoryPage from "./SoputkaProdHistoryPage/SoputkaProdHistoryPage";
import ScannerProdPage from "./ScannerProdPage/ScannerProdPage";

const PagesSale = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesSale />} />
      <Route path="/main" element={<SoputkaPage />} />
      <Route path="/add_prod" element={<AddProdSoputkaPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/every_prod" element={<EverySaleProdPage />} />
      <Route path="/every_list_history" element={<SoputkaProdHistoryPage />} />
      <Route path="/scanner_prod" element={<ScannerProdPage />} />
    </Routes>
  );
};

export default PagesSale;

/////// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

/////// style
import "./style.scss";

/////// fns
import { addProdQrCode } from "../../../store/reducers/requestSlice";

/////// components
import { Html5Qrcode } from "html5-qrcode";
import NavMenu from "../../../common/NavMenu/NavMenu";

const ScannerProdPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { guid } = location.state; //guid созданной накладной

  const [start, setStart] = useState(true);

  const errorText = "Произошла ошибка, попробуйте перезагрузить сайт";

  useEffect(() => {
    setStart(true);
    const config = { fps: 10, qrbox: { width: 200, height: 200 } };
    const html5QrCode = new Html5Qrcode("qrCodeContainer");

    const qrScanerStop = () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .then(() => console.log("Scanner stopped"))
          .catch((err) => console.log(err, errorText));
      }
    };

    const qrScanerSucces = (decodedText) => {
      setStart(false);
      dispatch(addProdQrCode({ data: decodedText, navigate, guid }));
      navigator.vibrate(200); // Вибрация при успешном сканировании
    };

    if (start) {
      html5QrCode
        .start({ facingMode: "environment" }, config, qrScanerSucces)
        .catch((err) => console.log(err, errorText));
    } else {
      qrScanerStop();
    }

    return () => qrScanerStop();
  }, [start]);

  return (
    <>
      <NavMenu navText={"Сканирование товара"} />
      <div className="scanner">
        <div id="qrCodeContainer"></div>
      </div>
    </>
  );
};

export default ScannerProdPage;

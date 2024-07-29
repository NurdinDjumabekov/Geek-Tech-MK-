/////// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/////// style
import "./style.scss";

/////// fns
import { checkQrCodeDoctor } from "../../../store/reducers/requestSlice";

/////// components
import { Html5Qrcode } from "html5-qrcode";
import NavMenu from "../../../common/NavMenu/NavMenu";

const ScannerDoctorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [start, setStart] = useState(true);
  const [qrCodeScanned, setQrCodeScanned] = useState(false); // Новый флаг

  const { data } = useSelector((state) => state.saveDataSlice);
  const seller_guid = data?.seller_guid;

  const errorText = "Произошла ошибка, попробуйте перезагрузить сайт";

  useEffect(() => {
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
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
      if (!qrCodeScanned) {
        // Проверяем флаг
        setQrCodeScanned(true); // Устанавливаем флаг
        setStart(false);
        dispatch(
          checkQrCodeDoctor({ data: decodedText, navigate, seller_guid })
        );
        navigator.vibrate(200); // Вибрация при успешном сканировании
      }
    };

    if (start) {
      html5QrCode
        .start({ facingMode: "environment" }, config, qrScanerSucces)
        .catch((err) => console.log(err, errorText));
    } else {
      qrScanerStop();
    }

    return () => qrScanerStop();
  }, [start, qrCodeScanned]);

  return (
    <>
      <NavMenu navText={"Сканирование доктора"} />
      <div className="scanner">
        <div id="qrCodeContainer"></div>
      </div>
    </>
  );
};

export default ScannerDoctorPage;

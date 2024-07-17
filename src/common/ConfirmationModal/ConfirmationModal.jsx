//// style
import Modals from "../Modals/Modals";
import "./style.scss";

const ConfirmationModal = ({ visible, message, onYes, onNo, onClose }) => {
  return (
    <Modals openModal={visible} setOpenModal={onClose}>
      <div onClick={onClose}>
        <div className="parentConf">
          <div className="containerActions">
            <h6>{message}</h6>
            <div className="buttonContainer">
              <button onClick={onYes} className="btnsGood">
                Да
              </button>
              <button onClick={onNo} className="btnsNoo">
                Нет
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modals>
  );
};

export default ConfirmationModal;

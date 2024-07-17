import { useEffect, useRef } from "react";
import "./Modals.scss";

const Modals = (props) => {
  const { openModal, setOpenModal } = props;
  const modalRef = useRef(null);
  const bodyRef = useRef(document.body);

  const closeModal = () => setOpenModal(false);

  useEffect(() => {
    const body = bodyRef.current;

    if (openModal) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "visible";
    }

    return () => {
      body.style.overflow = "visible";
    };
  }, [openModal]);

  if (openModal) {
    return (
      <>
        <div className="modal" ref={modalRef}>
          <div className="modal__shadow" onClick={closeModal}></div>
          <div className="modal__inner">
            {props.children}
            {/* Пример использования кнопки закрытия */}
            {/* <button className="krest" onClick={closeModal}>
              <img src={krest} alt="x" />
            </button> */}
          </div>
        </div>
      </>
    );
  }
};

export default Modals;

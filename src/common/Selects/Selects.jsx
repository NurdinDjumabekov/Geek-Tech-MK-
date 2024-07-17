import React, { useRef, useState } from "react";
import imgArrow from "../../assets/icons/arrowBlack.svg";
import "./style.scss";

const Selects = (props) => {
  const { list, placeholder, onChange, activeValue } = props;

  const [active, setActive] = useState(false);
  const accordionRef = useRef(null);

  React.useEffect(() => {
    const handleChange = (e) => {
      if (
        active &&
        accordionRef.current &&
        !accordionRef.current.contains(e.target)
      ) {
        setActive(false);
      }
    };

    document.addEventListener("click", handleChange);

    return () => {
      document.removeEventListener("click", handleChange);
    };
  }, [active]);

  const clickSelect = (value, label) => {
    onChange({ label, value });
    setActive(false);
  };

  const textSelect = list?.find((item) => item?.value === activeValue);

  return (
    <div className="selectBlockMain">
      <div className="selectBlock" id="uniqueSelectID" ref={accordionRef}>
        <div
          className={`selectBlock__inner ${active && "more"}`}
          onClick={() => setActive(!active)}
        >
          <p className={textSelect ? "activeText" : ""}>
            {textSelect ? textSelect?.label : placeholder}
          </p>
          <img
            src={imgArrow}
            alt="<"
            className={active ? "rotate0" : "rotate180"}
          />
        </div>
        {active && (
          <div className="selectBlock__activeBlock">
            {list?.map((i) => (
              <p onClick={() => clickSelect(i?.value, i?.label)} key={i?.value}>
                {i?.label}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Selects;

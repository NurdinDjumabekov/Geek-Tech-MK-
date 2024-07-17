////// hooks
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// fns
import { changeDataLogin, clearLogin } from "../../store/reducers/stateSlice";
import { logInAccount } from "../../store/reducers/requestSlice";

////// imgs
import logoImg from "../../assets/images/riha.png";

///// scss
import "./style.scss";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  const { dataLogin } = useSelector((state) => state.stateSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeDataLogin({ ...dataLogin, [name]: value }));
  };

  const sendLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    if (dataLogin?.login && dataLogin?.password) {
      dispatch(logInAccount({ dataLogin, navigate, data }));
    } else {
      alert("Введите логин и пароль!");
    }
  };

  const handleFocus = (e) => {
    e.target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    dispatch(clearLogin());
  }, [dispatch]);

  return (
    <form onSubmit={sendLogin} className="paretnInput">
      {/* <div className="logoBlock">
        <img src={logoImg} alt="Logo" className="logo" />
      </div> */}
      <div>
        <p className="textInput">Введите логин</p>
        <input
          ref={loginRef}
          value={dataLogin?.login}
          onChange={onChange}
          placeholder={"Ваш логин"}
          onFocus={handleFocus}
          name="login"
          className="input"
          type="text"
          required
        />
      </div>
      <div>
        <p className="textInput">Введите пароль</p>
        <input
          ref={passwordRef}
          value={dataLogin?.password}
          onChange={onChange}
          placeholder={"Ваш пароль"}
          onFocus={handleFocus}
          name="password"
          type="password"
          className="input"
          required
        />
      </div>
      <button type="submit" className="loginBtn">
        Войти
      </button>
    </form>
  );
};

export default LoginPage;

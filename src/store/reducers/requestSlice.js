import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../env";
import {
  categoryGuidFN,
  changeActiveSelectCategory,
  changeStateForCategory,
  clearLogin,
  doctorGuidFN,
} from "./stateSlice";
import { changeLocalData } from "./saveDataSlice";
import { text_none_qr_code, text_none_qr_code_prod } from "../../helpers/Data";

/// logInAccount
export const logInAccount = createAsyncThunk(
  "logInAccount",
  async function (props, { dispatch, rejectWithValue }) {
    const { dataLogin, navigate } = props;

    try {
      const response = await axios({
        method: "POST",
        url: `${API}/farm/login`,
        data: dataLogin,
      });
      if (response.status >= 200 && response.status < 300) {
        const { result, seller_guid, seller_fio } = response?.data;
        const { point_name, count_type } = response?.data;

        if (+result === 1) {
          const obj = { point_name, count_type, seller_guid, seller_fio };
          dispatch(changeLocalData(obj));

          if (seller_guid) {
            navigate("/");
            dispatch(clearLogin());
          }
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getBalance
/// для получения баланса
export const getBalance = createAsyncThunk(
  "getBalance",
  async function (seller_guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/farm/get_debt?seller_guid=${seller_guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.debt;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getHistoryBalance
/// для получения баланса
export const getHistoryBalance = createAsyncThunk(
  "getHistoryBalance",
  async function (seller_guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/farm/get_transactions?seller_guid=${seller_guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// checkQrCodeDoctor
export const checkQrCodeDoctor = createAsyncThunk(
  "checkQrCodeDoctor",
  async function (props, { dispatch, rejectWithValue }) {
    const { data, navigate, seller_guid } = props;
    try {
      const response = await axios({ url: `${API}/farm/scan?qrcode=${data}` });
      if (response.status >= 200 && response.status < 300) {
        const { doctor, result } = response?.data;
        if (doctor?.length === 0 || result === 0) {
          alert(text_none_qr_code);
          await navigate("/");
        } else {
          await navigate("/");
          await navigate("/sale/main");
          const dataObj = { qrcode: data, seller_guid, comment: "" };
          await dispatch(createInvoiceSoputkaTT({ navigate, dataObj }));
          const fioDoctor = response?.data?.doctor?.[0]?.fio;
          if (!window.alertShown) {
            // Проверяем глобальный флаг
            window.alertShown = true; // Устанавливаем глобальный флаг
            alert(`Врач: ${fioDoctor}`);
          }
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// addProdQrCode
/// продаю товар по QR коду
export const addProdQrCode = createAsyncThunk(
  "addProdQrCode",
  async function (props, { dispatch, rejectWithValue }) {
    const { data, navigate, guid } = props;
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/farm/scan_product?qrcode=${data}`,
      });
      if (response.status >= 200 && response.status < 300) {
        const { product } = response?.data;
        const forAddTovar = { guid };

        if (product?.length === 0) {
          alert(text_none_qr_code_prod);
          navigate("/sale/add_prod", { state: { forAddTovar } });
        } else {
          const obj = product?.[0];
          navigate("/sale/every_prod", { state: { obj, guid } });
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/////////////////////////////// sale ////////////////////////////////

/// getListAgents
export const getListAgents = createAsyncThunk(
  /// список товаров сопутки
  "getListAgents",
  async function ({ seller_guid, check }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/farm/get_doctors`,
      });
      if (response.status >= 200 && response.status < 300) {
        const guid = response?.data?.[0]?.guid;
        /// check (true) - беру докторов для отображения в остатках (false - в остальных компонетах)
        check && dispatch(getCategDoctor({ guid }));
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// getHistorySoputka
export const getHistorySoputka = createAsyncThunk(
  /// список историй товаров сопутки
  "getHistorySoputka",
  async function (guidInvoice, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/farm/get_point_invoice?seller_guid=${guidInvoice}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

///// createInvoiceSoputkaTT
////// создание накладной для продажи
export const createInvoiceSoputkaTT = createAsyncThunk(
  "createInvoiceSoputkaTT",
  async function (props, { dispatch, rejectWithValue }) {
    const { dataObj, navigate } = props;
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/farm/create_invoice`,
        data: dataObj,
      });
      if (response.status >= 200 && response.status < 300) {
        navigate("/sale/add_prod", { state: { forAddTovar: response?.data } });
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getCategoryTT
export const getCategoryTT = createAsyncThunk(
  "getCategoryTT",
  /// для получения катеогрий товаров ТТ
  async function (props, { dispatch, rejectWithValue }) {
    const { checkComponent, seller_guid, type, doctor_guid } = props;
    const urlLink = !checkComponent
      ? `${API}/farm/get_category_all` //// для сопутки
      : `${API}/farm/get_category?doctor_guid=${doctor_guid}`; //// для пр0дажи
    try {
      const response = await axios(urlLink);
      if (response.status >= 200 && response.status < 300) {
        if (type === "leftovers") {
          const initilalCateg = response?.data?.[0]?.category_guid;
          dispatch(doctorGuidFN(doctor_guid));
          await dispatch(getMyLeftovers({ doctor_guid, initilalCateg }));
          //// для страницы остатков вызываю первую категорию
        } else if (type === "sale&&soputka") {
          ////// для продажи и с0путки
          const { category_guid } = response?.data?.[0];
          dispatch(changeActiveSelectCategory(category_guid));
          const sedData = { guid: category_guid, seller_guid, checkComponent };
          dispatch(getProductTT(sedData));
          dispatch(changeStateForCategory(category_guid));
          //// get список продуктов сопутки по категориям
          //// сразу подставляю первую категорию
        }
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getProductTT
export const getProductTT = createAsyncThunk(
  "getProductTT",
  /// для получения продуктов
  async function (props, { dispatch, rejectWithValue }) {
    const { guid, seller_guid, checkComponent } = props;
    const urlLink = !checkComponent
      ? `${API}/farm/get_product_all?categ_guid=${guid}` //// для сопутки
      : `${API}/farm/get_product?categ_guid=${guid}&seller_guid=${seller_guid}`; //// для пр0дажи
    ///// нижнее удалить
    try {
      const response = await axios(urlLink);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// searchProdTT
export const searchProdTT = createAsyncThunk(
  "searchProdTT",
  /// для поиска товаров
  async function (searchText, { dispatch, rejectWithValue }) {
    try {
      const response = await axios(
        `${API}/farm/get_product_all?search=${searchText}`
      );
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// createInvoiceTT
export const createInvoiceTT = createAsyncThunk(
  "createInvoiceTT",
  /// создание накладной торговый точкой (открытие кассы)
  async function (seller_guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/farm/create_invoice`,
        data: { seller_guid },
      });
      if (response.status >= 200 && response.status < 300) {
        return { codeid: response?.data?.codeid, guid: response?.data?.guid };
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// addProductSoputkaTT
export const addProductSoputkaTT = createAsyncThunk(
  /// добавление продукта(по одному) в накладную в сопуттку накладной
  "addProductSoputkaTT",
  async function (props, { dispatch, rejectWithValue }) {
    const { data, navigate, getData } = props;

    try {
      const response = await axios({
        method: "POST",
        url: `${API}/farm/create_invoice_product`,
        data,
      });
      if (response.status >= 200 && response.status < 300) {
        if (response?.data?.result == 1) {
          const forAddTovar = { guid: data?.invoice_guid };
          navigate("/sale/add_prod", { state: { forAddTovar } });

          setTimeout(() => {
            getData();
          }, 400);
        }
        return response?.data?.result;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// getListSoputkaProd
export const getListSoputkaProd = createAsyncThunk(
  /// список товаров сопутки
  "getListSoputkaProd",
  async function (guidInvoice, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/farm/get_point_invoice_product?invoice_guid=${guidInvoice}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// deleteSoputkaProd
export const deleteSoputkaProd = createAsyncThunk(
  /// удаление данных из списока сопутки товаров
  "deleteSoputkaProd",
  async function (props, { dispatch, rejectWithValue }) {
    const { product_guid, getData } = props;
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/farm/del_product`,
        data: { product_guid },
      });
      if (response.status >= 200 && response.status < 300) {
        setTimeout(() => {
          getData();
        }, 200);
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//// confirmSoputka
export const confirmSoputka = createAsyncThunk(
  /// подверждение товаров сопутки
  "confirmSoputka",
  async function ({ sendData, navigate }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/farm/point_conf_inv`,
        data: sendData,
      });
      if (response.status >= 200 && response.status < 300) {
        if (response?.data?.result == 1) {
          navigate("/");
          alert("Успешно продано");
        }
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/////////////////////////////// sale ////////////////////////////////

/// getEveryProd
export const getEveryProd = createAsyncThunk(
  /// получаю каждый продукт по qrcode или guid для продажи
  "getEveryProd",
  async function (props, { dispatch, rejectWithValue }) {
    const { guid, seller_guid, qrcode, navigate } = props;
    const { invoice_guid, closeModal } = props;

    const urlGuid = !!guid ? `&product_guid=${guid}` : "";
    const qrcodeGuid = !!qrcode ? `&qrcode=${qrcode}` : "";

    const url = `${API}/farm/get_product_detail?seller_guid=${seller_guid}${urlGuid}${qrcodeGuid}`;

    try {
      const response = await axios(url);
      if (response.status >= 200 && response.status < 300) {
        if (response?.data?.length === 0) {
          alert("Не удалось найти такой продукт");
        } else {
          const data = response?.data?.[0];

          const obj = { guid: data?.guid, product_name: data?.product_name };

          if (!!qrcode) {
            const forAddTovar = { guid: invoice_guid };
            navigate("/sale/add_prod", { state: { forAddTovar } });

            const state = { obj, guid: invoice_guid };
            navigate("/sale/every_prod", { state });
            /// guid - guid товара
            ///// закрываю модалку для ввода ручного qr кода
            closeModal();
          }
        }

        return response?.data?.[0];
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/////////////////////////////// Leftovers ////////////////////////////////

/// getMyLeftovers
export const getMyLeftovers = createAsyncThunk(
  "getMyLeftovers",
  async function (props, { dispatch, rejectWithValue }) {
    const { doctor_guid, initilalCateg } = props;
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/farm/get_report_leftovers?doctor_guid=${doctor_guid}&categ_guid=${initilalCateg}`,
      });
      if (response.status >= 200 && response.status < 300) {
        const newInitilalCateg = initilalCateg || {};
        //// value в селекте undefibed или null быть не может!
        dispatch(categoryGuidFN(newInitilalCateg));
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getCategDoctor
//// беру катег0рию каждого доктора
export const getCategDoctor = createAsyncThunk(
  "getCategDoctor",
  async function ({ guid }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/farm/get_category?doctor_guid=${guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        const obj = { doctor_guid: guid, type: "leftovers" };
        await dispatch(getCategoryTT({ ...obj, checkComponent: true }));
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/////////////////////////////// Leftovers ////////////////////////////////

/////////////////////////////// Pay ////////////////////////////////

/// acceptMoney
export const acceptMoney = createAsyncThunk(
  /// Отплата ТТ
  "acceptMoney",
  async function (props, { dispatch, rejectWithValue }) {
    const { dataObj, closeModal, navigation } = props;
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/farm/point_oplata`,
        data: dataObj,
      });
      if (response.status >= 200 && response.status < 300) {
        closeModal();
        navigation?.navigate("/");
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/////////////////////////////// pay ////////////////////////////////

const initialState = {
  preloader: false,
  chech: "",
  /////// balance
  balance: 0,
  listHistoryBalance: [], //// список историй платежей ТТ

  listMyInvoice: [],
  listAcceptInvoice: [], /// список накладных , принятых ТT (история)
  listAcceptInvoiceProd: [], /// список продуктов накладных , принятых ТT (история)
  everyInvoice: {},
  listSellersPoints: [],
  listCategory: [], //  список категорий ТА
  listProductTT: [], //  список продуктов ТА (cписок прод-тов отсортированные селектами)
  listLeftovers: [], // список остатков
  listSoldProd: [], /// список проданных товаров

  listInvoiceEveryTT: [], /// список накладных каждой ТТ(типо истории)
  listCategExpense: [],
  listExpense: [],
  infoKassa: { guid: "", codeid: "" }, /// guid каждой накладной ТТ

  /////// return
  listHistoryReturn: [], //// ист0рия возврата
  listLeftoversForReturn: [], // список остатков (переделанный мною)
  listRevizors: [], //// список ревизоров
  listProdReturn: [], //// список возвращенных от ТT

  /////// soputka
  listAgents: [],
  listProdSoputka: [],
  listHistorySoputka: [],
};

const requestSlice = createSlice({
  name: "requestSlice",
  initialState,
  extraReducers: (builder) => {
    //// logInAccount
    builder.addCase(logInAccount.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(logInAccount.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      alert("Неверный логин или пароль");
    });
    builder.addCase(logInAccount.pending, (state, action) => {
      state.preloader = true;
    });

    ///// getBalance
    builder.addCase(getBalance.fulfilled, (state, action) => {
      // state.preloader = false;
      state.balance = action.payload;
    });
    builder.addCase(getBalance.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(getBalance.pending, (state, action) => {
      // state.preloader = true;
    });

    ///// getHistoryBalance
    builder.addCase(getHistoryBalance.fulfilled, (state, action) => {
      state.preloader = false;
      state.listHistoryBalance = action.payload;
    });
    builder.addCase(getHistoryBalance.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getHistoryBalance.pending, (state, action) => {
      state.preloader = true;
    });

    //// createInvoiceTT
    builder.addCase(createInvoiceTT.fulfilled, (state, action) => {
      const { codeid, guid } = action.payload;
      state.preloader = false;
      state.infoKassa = { codeid, guid };
    });
    builder.addCase(createInvoiceTT.rejected, (state, action) => {
      state.error = action.payload;
      alert("Упс, что-то пошло не так! Не удалось создать накладную");
      state.preloader = false;
    });
    builder.addCase(createInvoiceTT.pending, (state, action) => {
      state.preloader = true;
    });

    /////// getCategoryTT
    builder.addCase(getCategoryTT.fulfilled, (state, action) => {
      state.preloader = false;
      const allCategory = { label: "Все", value: "0" };
      const categories = action.payload.map(
        ({ category_name, category_guid }, ind) => ({
          label: `${ind + 1}. ${category_name}`,
          value: category_guid,
        })
      );
      state.listCategory = [allCategory, ...categories];
    });
    builder.addCase(getCategoryTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getCategoryTT.pending, (state, action) => {
      state.preloader = true;
    });

    //////// getCategDoctor
    builder.addCase(getCategDoctor.fulfilled, (state, action) => {
      state.preloader = false;
      const allCategory = { label: "Все", value: "0" };
      const categories = action.payload?.map(
        ({ category_name, category_guid }, ind) => ({
          label: `${ind + 1}. ${category_name}`,
          value: category_guid,
        })
      );
      state.listCategory = [allCategory, ...categories];
    });
    builder.addCase(getCategDoctor.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getCategDoctor.pending, (state, action) => {
      state.preloader = true;
    });

    ////// getProductTT
    builder.addCase(getProductTT.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProductTT = action.payload;
    });
    builder.addCase(getProductTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getProductTT.pending, (state, action) => {
      state.preloader = true;
    });

    //////// searchProdTT
    builder.addCase(searchProdTT.fulfilled, (state, action) => {
      // state.preloader = false;
      state.listProductTT = action.payload;
    });
    builder.addCase(searchProdTT.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
    });
    builder.addCase(searchProdTT.pending, (state, action) => {
      // state.preloader = true;
    });

    ////////getEveryProd
    builder.addCase(getEveryProd.fulfilled, (state, action) => {
      state.preloader = false;
      state.everyProdSale = action.payload;
    });
    builder.addCase(getEveryProd.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.everyProdSale = {};
    });
    builder.addCase(getEveryProd.pending, (state, action) => {
      state.preloader = true;
    });

    //////// getMyLeftovers
    builder.addCase(getMyLeftovers.fulfilled, (state, action) => {
      state.preloader = false;
      state.listLeftovers = action.payload?.map((item, ind) => [
        `${ind + 1}. ${item?.product_name}`,
        `${item?.income}`,
        `${item?.count}`,
        `${item?.bonuse || 0}`,
      ]);
      state.listLeftoversForReturn = action.payload?.filter(
        (item) => item?.end_outcome !== 0
      ); ////// проверяю на наличие, если end_outcome === 0 (остаток товара), то не добалять его в массив для в0зврата товара
    });
    builder.addCase(getMyLeftovers.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      alert("Упс, что-то пошло не так! Не удалось загрузить данные!");
    });
    builder.addCase(getMyLeftovers.pending, (state, action) => {
      state.preloader = true;
    });

    //////// acceptMoney
    builder.addCase(acceptMoney.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(acceptMoney.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      alert("Упс, что-то пошло не так! Не удалось оплатить");
    });
    builder.addCase(acceptMoney.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////////createInvoiceSoputkaTT
    builder.addCase(createInvoiceSoputkaTT.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(createInvoiceSoputkaTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      alert("Упс, что-то пошло не так! Не удалось создать накладную");
    });
    builder.addCase(createInvoiceSoputkaTT.pending, (state, action) => {
      state.preloader = true;
    });

    /////////////////getListAgents
    builder.addCase(getListAgents.fulfilled, (state, action) => {
      state.preloader = false;
      state.listAgents = action.payload;
    });
    builder.addCase(getListAgents.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      alert("Упс, что-то пошло не так! Не удалось создать накладную");
    });
    builder.addCase(getListAgents.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////////addProductSoputkaTT
    builder.addCase(addProductSoputkaTT.fulfilled, (state, action) => {
      state.preloader = false;
      if (action.payload == 1) {
        alert("Товар добавлен в список");
      }
    });
    builder.addCase(addProductSoputkaTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      alert("Упс, что-то пошло не так! Не удалось добавить товар");
    });
    builder.addCase(addProductSoputkaTT.pending, (state, action) => {
      state.preloader = true;
    });

    /////// getListSoputkaProd
    builder.addCase(getListSoputkaProd.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProdSoputka = action.payload;
    });
    builder.addCase(getListSoputkaProd.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listProdSoputka = [];
      alert("Упс, что-то пошло не так! Попробуйте перезайти в приложение...");
    });
    builder.addCase(getListSoputkaProd.pending, (state, action) => {
      state.preloader = true;
    });

    /////// deleteSoputkaProd
    builder.addCase(deleteSoputkaProd.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(deleteSoputkaProd.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      alert("Упс, что-то пошло не так! Не удалось удалить ...");
    });
    builder.addCase(deleteSoputkaProd.pending, (state, action) => {
      state.preloader = true;
    });

    ///////getHistorySoputka
    builder.addCase(getHistorySoputka.fulfilled, (state, action) => {
      state.preloader = false;
      state.listHistorySoputka = action.payload;
    });
    builder.addCase(getHistorySoputka.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listHistorySoputka = [];
      alert("Упс, что-то пошло не так! Попробуйте перезайти в приложение...");
    });
    builder.addCase(getHistorySoputka.pending, (state, action) => {
      state.preloader = true;
    });

    ////// confirmSoputka
    builder.addCase(confirmSoputka.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(confirmSoputka.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      alert("Упс, что-то пошло не так! Попробуйте перезайти в приложение...");
    });
    builder.addCase(confirmSoputka.pending, (state, action) => {
      state.preloader = true;
    });

    ////// checkQrCodeDoctor
    builder.addCase(checkQrCodeDoctor.fulfilled, (state, action) => {
      // state.preloader = false;
    });
    builder.addCase(checkQrCodeDoctor.rejected, (state, action) => {
      state.error = action.payload;
      // state.preloader = false;
      alert("Упс, что-то пошло не так! Попробуйте перезайти в приложение...");
    });
    builder.addCase(checkQrCodeDoctor.pending, (state, action) => {
      // state.preloader = true;
    });

    ////// addProdQrCode
    builder.addCase(addProdQrCode.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(addProdQrCode.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      alert("Упс, что-то пошло не так! Перезайдите в приложение...");
    });
    builder.addCase(addProdQrCode.pending, (state, action) => {
      state.preloader = true;
    });
  },

  reducers: {
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
    changeListInvoices: (state, action) => {
      state.listMyInvoice = action.payload;
    },
    changeLeftovers: (state, action) => {
      state.listLeftovers = action.payload;
    },
    clearListProductTT: (state, action) => {
      state.listProductTT = [];
    },
    clearListCategory: (state, action) => {
      state.listCategory = [];
    },
    changeListSellersPoints: (state, action) => {
      state.listSellersPoints = action.payload;
    },
    clearListAgents: (state, action) => {
      state.listAgents = [];
    },
  },
});

export const {
  changePreloader,
  changeListInvoices,
  changeLeftovers,
  clearListProductTT,
  clearListCategory,
  changeListSellersPoints,
  clearListAgents,
} = requestSlice.actions;

export default requestSlice.reducer;

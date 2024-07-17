import { useDispatch, useSelector } from "react-redux";
import {
  changeTemporaryData,
  clearTemporaryData,
} from "../../store/reducers/stateSlice";
import {
  addProductSoputkaTT,
  getListSoputkaProd,
} from "../../store/reducers/requestSlice";

import "./style.scss";

const AddProducts = ({ guid }) => {
  /// delete
  ////guid созданной накладной
  //// для добавления продуктов в список
  const dispatch = useDispatch();

  const { temporaryData } = useSelector((state) => state.stateSlice);

  const onChange = (name, text) => {
    if (/^\d*\.?\d*$/.test(text)) {
      dispatch(changeTemporaryData({ ...temporaryData, [name]: text }));
    }
  };

  const addInInvoice = () => {
    if (
      temporaryData?.product_price === "" ||
      temporaryData?.ves === "" ||
      temporaryData?.product_price == 0 ||
      temporaryData?.ves == 0
    ) {
      Alert.alert("Введите цену и вес (кол-во)!");
    } else {
      const data = {
        invoice_guid: guid,
        count: temporaryData?.ves,
        price: temporaryData?.product_price,
        guid: temporaryData?.guid,
      };
      dispatch(addProductSoputkaTT({ data, getData }));
    }
  };

  const getData = () => {
    dispatch(getListSoputkaProd(guid));
  }; /// для отображения всех проданных товаров

  const onClose = () => dispatch(clearTemporaryData());

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!temporaryData?.guid}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.parent}>
          <View style={styles.child}>
            <Text style={styles.title}>{temporaryData?.product_name}</Text>
            <TouchableOpacity style={styles.krest} onPress={() => onClose()}>
              <View style={[styles.line, styles.deg]} />
              <View style={[styles.line, styles.degMinus]} />
            </TouchableOpacity>
            <View style={styles.addDataBlock}>
              <View style={styles.blockInput}>
                <Text style={styles.titleInner}>Цена (сомони)</Text>
                <TextInput
                  style={styles.input}
                  value={temporaryData?.product_price?.toString()}
                  onChangeText={(text) => onChange("product_price", text)}
                  keyboardType="numeric"
                  placeholder="Цена"
                  maxLength={15}
                />
              </View>
              <View style={styles.blockInput}>
                <Text style={styles.titleInner}>Вес (кол-во, шт)</Text>
                <TextInput
                  style={styles.input}
                  value={temporaryData?.ves?.toString()}
                  onChangeText={(text) => onChange("ves", text)}
                  keyboardType="numeric"
                  maxLength={8}
                />
              </View>
            </View>
            <ViewButton styles={styles.btnAdd} onclick={addInInvoice}>
              Добавить
            </ViewButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default AddProducts;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  everyProd: {
    backgroundColor: "red",
    padding: 10,
    paddingRight: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(162, 178, 238, 0.439)",
    backgroundColor: "rgba(162, 178, 238, 0.102)",
    display: "flex",
    flexDirection: "row",
  },

  everyProdInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  titleHistory: {
    color: "#222",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },

  mainData: {
    maxWidth: "90%",
  },

  koll: {
    color: "rgba(47, 71, 190, 0.887)",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default styles;

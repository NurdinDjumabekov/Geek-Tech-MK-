import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  everyProd: {
    padding: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(212, 223, 238, 0.47)",
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.107)",
  },

  everyProdInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  blockTitle: { width: "67%" },

  blockTitleInner: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },

  titleNum: {
    fontSize: 19,
    fontWeight: "700",
    color: "rgba(47, 71, 190, 0.672)",
    borderColor: "rgba(47, 71, 190, 0.672)",
    borderWidth: 1,
    backgroundColor: "#d4dfee",
    padding: 4,
    paddingLeft: 7,
    paddingRight: 0,
    borderRadius: 5,
  },

  sum: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(12, 169, 70, 0.9)",
    lineHeight: 17,
  },

  date: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(47, 71, 190, 0.687)",
    lineHeight: 22,
  },

  comment: { fontSize: 14, fontWeight: "400", marginTop: 5 },

  status: {
    paddingRight: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
  },

  good: {
    color: "rgba(12, 169, 70, 0.9)",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "left",
  },

  bad: { color: "red", fontSize: 12, fontWeight: "500", textAlign: "left" },
});

export default styles;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  blockBtn: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    gap: 40,
    backgroundColor: "rgba(47, 71, 190, 0.127)",
    height: 70,
    minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  btnNav: {
    borderRadius: 10,
    padding: 3,
    width: 60,
    height: 55,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  blockBtn_inner_QR: {
    backgroundColor: "rgba(97, 112, 188, 0.972)",
    borderRadius: 5,
    padding: 0,
    width: 60,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
  },

  imgIcon: { width: 35, height: 28 },

  textIcon: { color: "#222", textAlign: "center", width: 90 },

  qrCodeImg: { width: "100%", height: "100%" },

  /////////////// modal

  modalInner: {
    padding: 15,
    borderRadius: 10,
    width: "95%",
  },

  modalOuter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  titleSelect: { fontSize: 17, fontWeight: "500", marginBottom: 15 },

  input: {
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    borderRadius: 8,
    padding: 10,
    paddingVertical: 8,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  sendBtn: {
    backgroundColor: "#fff",
    color: "#fff",
    minWidth: "100%",
    paddingTop: 10,
    borderRadius: 10,
    fontWeight: 600,
    backgroundColor: "rgba(12, 169, 70, 0.9)",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    marginTop: 20,
  },
});

export default styles;

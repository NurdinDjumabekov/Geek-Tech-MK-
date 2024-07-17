import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  parentSelects: {
    paddingTop: 10,
    paddingBottom: 3,
  },

  choiceCateg: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    width: "96%",
    alignSelf: "center",
    paddingBottom: 3,
    marginTop: 0,
    paddingLeft: 3,
  },

  blockSelect: {
    width: "96%",
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: 10,
    position: "relative",
  },

  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    color: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#fff",
  },

  arrow: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#222",
    height: 12,
    width: 12,
    borderRadius: 3,
    transform: [{ rotate: "135deg" }],
    position: "absolute",
    top: 14,
    right: 25,
  },
});

export default styles;

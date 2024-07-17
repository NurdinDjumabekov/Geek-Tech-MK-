import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  blockMain: {
    minWidth: "100%",
    // borderRadius: 5,
    borderBottomWidth: 2,
    borderColor: "rgb(217 223 232)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingVertical: 15,
    backgroundColor: "rgba(162, 178, 238, 0.102)",
  },

  blockMainInner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "99%",
  },

  mainContent: { display: "flex", flexDirection: "row" },

  title: { fontSize: 16, fontWeight: "400", color: "#222" },

  arrow: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "rgba(162, 178, 238, 0.439)",
    height: 15,
    width: 15,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
    marginTop: 5,
  },

  width85: { width: "85%" },
});

export default styles;

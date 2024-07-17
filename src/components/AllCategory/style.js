import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  parentDiv: {
    width: "47%",
    minWidth: "47%",
    height: 180,
    borderRadius: 8,
    position: "relative",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    margin: 5,
  },

  shadow: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(15, 15, 16, 0.064)",
    zIndex: 10,
    borderRadius: 8,
  },

  main: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 11,
    borderRadius: 8,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  textTitle: {
    margin: 0,
    padding: 0,
    fontSize: 19,
    fontWeight: "600",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(199, 210, 254, 0.25)",
    color: "#222",
    width: "100%",
    textAlign: "center",
    borderRadius: 8,
  },

  backgroundImage: {
    width: "100%",
    height: 140,
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 8,
  },
});

export default styles;

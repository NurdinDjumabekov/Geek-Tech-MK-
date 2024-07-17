import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    maxWidth: "90%",
  },

  title: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },

  btns: {
    color: "#fff",
    elevation: 2,
    fontSize: 20,
    width: 90,
    paddingBottom: 8,
    paddingTop: 6,
  },

  red: { backgroundColor: "red" },

  green: { backgroundColor: "green" },
});

export default styles;

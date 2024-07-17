const styles = {
  parentBlock: {
    minWidth: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },

  flatList: {
    minWidth: "100%",
    alignItems: "center",
    gap: 10,
    paddingBottom: 10,
  },

  balance: {
    width: "97%",
    alignSelf: "center",
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgba(47, 71, 190, 0.591)",
    paddingVertical: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  balanceText: {
    lineHeight: 18,
    fontWeight: "700",
    color: "#fff",
    fontSize: 17,
  },

  balanceNum: {
    fontWeight: "500",
    color: "#fff",
    fontSize: 17,
    marginTop: 5,
  },

  balanceHistory: {
    fontWeight: "400",
    color: "#fff",
    fontSize: 18,
    lineHeight: 20,
  },

  balanceInner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  arrow: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#fff",
    height: 10,
    width: 10,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
  },
};

export default styles;

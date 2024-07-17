import { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Text } from "react-native";

export const ViewButton = ({ children, styles, onclick }) => {
  const [anim, setAnim] = useState(false);
  const handleClick = () => {
    setAnim(true);
    onclick();
    setTimeout(() => {
      setAnim(false);
    }, 500);
  };
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Text
        style={[
          {
            textAlign: "center",
            paddingBottom: 12,
            paddingTop: 12,
            margin: "auto",
            marginTop: 10,
            borderRadius: 10,
            fontSize: 20,
            backgroundColor: styles?.backgroundColor || "#000",
            fontWeight: 700,
          },
          styles,
          anim && myStyles.btn,
        ]}
      >
        {children}
      </Text>
    </TouchableWithoutFeedback>
  );
};

const myStyles = StyleSheet.create({
  btn: { opacity: 0.5 },
});

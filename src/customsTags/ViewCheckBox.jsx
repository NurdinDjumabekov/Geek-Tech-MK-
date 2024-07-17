import { Image, TouchableOpacity } from "react-native";

export const ViewCheckBox = ({ children, styles, onclick, type }) => {
  // console.log(styles, "styles");

  const ok =
    "https://i.pinimg.com/474x/25/0c/3c/250c3c7927d34efeb823c70d61a0029b.jpg";

  const no =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSQnnDeDeioXopZyA2nauSEO6gBM1ls8Aah4Ff42qjZQDMnKSgMKnKnjdLZvagVpdllL4&usqp=CAU";

  return (
    <TouchableOpacity
      style={[
        {
          width: 50,
          height: 45,
          borderRadius: 10,
          textAlign: "center",
          padding: 1,
          backgroundColor: styles?.backgroundColor || "#fff",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        styles,
      ]}
      onPress={onclick}
    >
      {
        <Image
          style={[
            {
              width: +type === 1 ? "100%" : "80%",
              height: +type === 1 ? "100%" : "80%",
            },
          ]}
          source={{
            uri: +type === 1 ? ok : no,
          }}
        />
      }
    </TouchableOpacity>
  );
};

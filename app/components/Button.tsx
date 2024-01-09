import { StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";

interface Props {
  text: string;
  onPress: () => void;
  styleButton?: object;
}

const Button = ({ text, onPress, styleButton = {} }: Props) => (
  <TouchableOpacity
    activeOpacity={1}
    style={[styles.button, styleButton]}
    onPress={onPress}
  >
    <CustomText style={styles.buttonText}>{text}</CustomText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#334FFA",
    borderRadius: 10,
    padding: 10,
    paddingVertical: 20,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Avenir-Black",
  },
});

export default Button;
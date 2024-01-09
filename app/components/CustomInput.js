import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const CustomInput = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        label={props.label}
        value={props.value}
        onChangeText={props.onChangeText}
        disabled={props.isDisabled}
        error={props.isInvalid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
});

export default CustomInput;

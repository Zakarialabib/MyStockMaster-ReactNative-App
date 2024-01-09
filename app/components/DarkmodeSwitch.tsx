import React, { FC, useEffect } from 'react';
import { StyleProp, ViewStyle, Switch, useColorScheme } from 'react-native';
import { useTheme } from 'react-native-paper';

type DarkmodeSwitchProperties = {
  disabled?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const DarkmodeSwitch: FC<DarkmodeSwitchProperties> = (props) => {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();

  const handleSwitchChange = (newValue: boolean) => {
    // Handle theme change logic here based on the value of newValue
    console.log('Dark mode switched:', newValue);
  };

  return (
    <Switch
      value={colorScheme === 'dark'}
      onValueChange={handleSwitchChange}
      disabled={props.disabled}
    //   color={props.color || colors.primary}
      style={props.style}
    />
  );
};

export default DarkmodeSwitch;

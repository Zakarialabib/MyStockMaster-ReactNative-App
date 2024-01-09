import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { Appbar, useTheme } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  showLeftButton?: boolean;
  showMenuButton?: boolean;
  style?: any;
  onLeftButtonPress?: () => void;
  isLoggedIn?: boolean;
}

const LogoTitle = () => (
  <Image
    style={{ width: 50, height: 50 }}
    source={require('../../assets/logo.png')}
  />
);

const Header: React.FC<HeaderProps> = ({
  showLeftButton = true,
  showMenuButton = true,
  style,
  onLeftButtonPress,
  isLoggedIn = true,
}) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const handleLeftButtonPress = () => {
    if (onLeftButtonPress) {
      onLeftButtonPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: theme.colors.primary }, style]}>
      <View style={styles.leftContainer}>
        {showMenuButton && isLoggedIn && (
          <Appbar.Action icon="menu" color={theme.colors.text} onPress={handleMenuPress} />
        )}
      </View>
      <View style={styles.centerContainer}>
        <LogoTitle />
      </View>
      <View style={styles.rightContainer}>
        {showLeftButton && (
          <Appbar.BackAction color={theme.colors.text} onPress={handleLeftButtonPress} />
        )}
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    elevation: 0, // Remove shadow on Android
    shadowOpacity: 0, // Remove shadow on iOS
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;

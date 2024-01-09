import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer } from 'react-native-paper';
import { logout } from '../utils/AuthUtils';
import { useNavigation } from '@react-navigation/native';
import Index from '..';
import OrderList from '../(authenticated)/orders';
import ProductList from '../(authenticated)/products';
import CustomerList from '../(authenticated)/customers';
import {
  CanAccess,
  useGo,
} from '@refinedev/core'
const DrawerContent = () => {
  const navigation = useNavigation();
  const go = useGo();
  return (
    <Drawer.Section title="ERPMASTER" style={styles.container}>
      <CanAccess resource="dashboard" action="list">


        <Drawer.Item
          label="Home"
          icon="home"
          onPress={() => go({ to: '/dashboard', type: 'push' })}
        />
      </CanAccess>
      <Drawer.Item
        label="Orders"
        icon="format-list-bulleted"
        onPress={() => go({ to: '/orders', type: 'push' })}
      />
      <Drawer.Item label="Products"
        icon="cube"
        onPress={() => go({ to: '/products', type: 'push' })}
      />
      <Drawer.Item label="Customers"
        icon="account"
        onPress={() => go({ to: '/customers', type: 'push' })}
      />
      <Drawer.Item label="Settings"
        icon="cog"
        onPress={() => go({ to: '/settings', type: 'push' })}
      />
      <Drawer.Item
        icon="logout"
        label="Logout"
        onPress={async () => {
          const result = await logout();
          if (result.success) {
            go({ to: '/login', type: 'push' });
          } else {
            // Handle logout failure
            console.error('Logout failed:', result.error);
          }
        }}
      />
    </Drawer.Section>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
});

export default DrawerContent;

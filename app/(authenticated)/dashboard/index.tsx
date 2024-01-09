import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Title, useTheme } from 'react-native-paper';

const API_URL = 'http://erpmaster.test/api/v1';

const Dashboard = () => {
  const theme = useTheme();
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);

  useEffect(() => {
    // Fetch data from the API to get counts
    const fetchData = async () => {
      try {
        const ordersResponse = await fetch(`${API_URL}/orders`);
        const ordersData = await ordersResponse.json();
        setOrdersCount(ordersData.meta.count);

        const productsResponse = await fetch(`${API_URL}/products`);
        const productsData = await productsResponse.json();
        setProductsCount(productsData.meta.count);

        const customersResponse = await fetch(`${API_URL}/customers`);
        const customersData = await customersResponse.json();
        const customersCount = customersData.meta.count;
        setCustomersCount(customersCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run once on component mount

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Link style={styles.block} href="/orders">
        <Pressable>
          <Title style={styles.blockText}>Orders: {ordersCount}</Title>
        </Pressable>
      </Link>

      <Link style={styles.block} href="/products">
        <Pressable>
          <Title style={styles.blockText}>Products: {productsCount}</Title>
        </Pressable>
      </Link>

      <Link style={styles.block} href="/customers">
        <Pressable>
          <Title style={styles.blockText}>Customers: {customersCount}</Title>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  block: {
    backgroundColor: '#f45111',
    margin: 10,
    borderRadius: 10,
    height: 150,
    width: '100%',
    textAlign: 'center',
  },
  blockText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default Dashboard;

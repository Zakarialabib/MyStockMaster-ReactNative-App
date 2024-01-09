// ProductsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Redirect } from 'expo-router';
// import { fetchData } from './api'; // Assuming you have an api file for fetching data

const ProductsScreen: React.FC = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [redirectToProducts, setRedirectToProducts] = useState(false);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        // const productsData = await fetchData('products');
        // setProductsCount(productsData.length);
      } catch (error) {
        // Handle errors here if needed
      }
    };

    fetchDataFromApi();
  }, []);

  const handleProductsClick = () => {
    setRedirectToProducts(true);
  };

  if (redirectToProducts) {
    return <Redirect href="/products" />;
  }

  return (
    <View>
      <Text>Products Screen</Text>
      <TouchableOpacity onPress={handleProductsClick}>
        <Text>Products Count: {productsCount}</Text>
      </TouchableOpacity>
      {/* Add your products content here */}
    </View>
  );
};

export default ProductsScreen;

import React, { useCallback, useEffect, useState } from 'react';
import {
  RefreshControl,
  FlatList,
  View,
  StyleSheet,
} from 'react-native';
import { Text, Title, Card, ActivityIndicator, useTheme } from 'react-native-paper';
import FilterComponent from '../../components/FilterComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShowButton } from '@refinenative/react-native-paper';

const API_URL = 'http://erpmaster.test/api/v1';

interface Product {
  id: number;
  name: string;
  code: string;
  image: string;
}

const ProductList: React.FC = () => {
  const theme = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  const fetchProductData = async (params = {}) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await axios.get(`${API_URL}/products`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          ...params,
          _limit: 10, // Adjust based on your pagination settings
          _offset: (page - 1) * 10, // Adjust based on your pagination settings
        },
      });

      return response.data.data;
    } catch (error) {
      console.error('Error fetching product data:', error);
      return [];
    }
  };

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchProductData(filters);
      setProducts(data);
      await AsyncStorage.setItem('products', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching product data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const applyFilters = (filters: any) => {
    console.log('Received filters:', filters);
    setFilters(filters);
  };

  useEffect(() => {
    const fetchCachedData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem('products');
        if (cachedData) {
          setProducts(JSON.parse(cachedData));
        }
      } catch (error) {
        console.error('Error fetching cached product data:', error);
      }
    };

    fetchCachedData();
    fetchData();
  }, [setFilters, page]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      setPage(1);
      await fetchData();
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchData]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <FilterComponent onApplyFilters={applyFilters} />
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <Card style={styles.surface}>
              <Card.Cover source={{ uri: item.image }} />
              <Card.Content>
                <Title>{item.name}</Title>
                <Text>
                  <Text>Code: </Text>
                  {item.code}
                </Text>
                <Card.Actions style={styles.buttonContainer}>
                  <ShowButton recordItemId={item.id} hideText />
                </Card.Actions>
              </Card.Content>
            </Card>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // flex: 1,
  },
  surface: {
    padding: 12,
    margin: 8,
    flex: 1,
    maxWidth: '48%',
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 9,
  },
  separator: {
    height: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

export default ProductList;
import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Card, Title, Text, ActivityIndicator, useTheme } from 'react-native-paper';
import { List, ShowButton } from '@refinenative/react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterComponent from '../../components/FilterComponent';

const API_URL = 'http://erpmaster.test/api/v1';

const fetchCustomerData = async (params = {}) => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    const response = await axios.get(`${API_URL}/customers`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching customer data:', error);
    return [];
  }
};

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const [filterParams, setFilterParams] = useState({});

  const applyFilters = (filters: any) => {
    setFilterParams(filters);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCustomerData(filterParams);
      setCustomers(data);
      setIsLoading(false);
    };

    fetchData();
  }, [filterParams]);

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
          data={customers}
          renderItem={({ item }) => (
            <Card style={styles.surface}>
              <TouchableOpacity>
                <Title>{item.name}</Title>
                <Card.Content>
                  <Text>Phone: {item.phone}</Text>
                  <Card.Actions>
                    <ShowButton recordItemId={item.id} hideText />
                  </Card.Actions>
                </Card.Content>
              </TouchableOpacity>
            </Card>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  surface: {
    padding: 12,
    borderRadius: 9,
    margin: 8,
    flex: 1,
    maxWidth: '48%', // Adjust the width as needed
    elevation: 4, // Add elevation (shadow)
    backgroundColor: '#fff', // Add background color
  },
  separator: {
    height: 10,
  },
});

export default CustomerList;

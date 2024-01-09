import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Text, ActivityIndicator, useTheme } from 'react-native-paper';
import { List, ShowButton } from '@refinenative/react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://erpmaster.test/api/v1';

const fetchOrderData = async () => {
    try {
        const token = await AsyncStorage.getItem('auth_token');
        const response = await axios.get(`${API_URL}/orders`, {
            headers: {
                'Content-Type': 'application/json' ,
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data; // Assuming the orders array is nested under 'data'
    } catch (error) {
        console.error('Error fetching order data:', error);
        return [];
    }
};

const OrderList = () => {
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchOrderData();
                setOrders(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching order data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <List>
                    <FlatList
                        data={orders}
                        renderItem={({ item }) => (
                            <Card style={styles.surface}>
                                <Title>{item.reference}</Title>
                                <Title>{item.date}</Title>
                                <Card.Content>
                                    <Text>Customer: {item.customer ? item.customer.name : 'N/A'}</Text>
                                    <Text>Total Amount: {item.total_amount}</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <ShowButton recordItemId={item.id} hideText />
                                </Card.Actions>
                            </Card>
                        )}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        numColumns={2}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </List>
            </View >

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
        maxWidth: '48%',
        elevation: 4,
        backgroundColor: '#fff',
    },
    separator: {
        height: 10,
    },
});

export default OrderList;

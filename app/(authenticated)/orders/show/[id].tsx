import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ActivityIndicator, Paragraph, Surface, DataTable } from 'react-native-paper';
import { useShow } from '@refinedev/core';

const OrderShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const order = data?.data.data;
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (

            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <Surface style={styles.surface}>
                        <Text style={styles.title}>Invoice: {order?.reference}</Text>
                        <DataTable style={styles.body}>
                            <DataTable.Row>
                                <DataTable.Cell>Date:</DataTable.Cell>
                                <DataTable.Cell>{order?.date}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Customer:</DataTable.Cell>
                                <DataTable.Cell>{order?.customer ? order.customer.name : 'N/A'}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Total Amount:</DataTable.Cell>
                                <DataTable.Cell>{order?.total_amount}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Discount Amount:</DataTable.Cell>
                                <DataTable.Cell>{order?.discount_amount}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Tax Amount:</DataTable.Cell>
                                <DataTable.Cell>{order?.tax_amount}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Shipping Cost:</DataTable.Cell>
                                <DataTable.Cell>{order?.shipping?.cost}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Payment Status:</DataTable.Cell>
                                <DataTable.Cell>{order?.payment_status === 0 ? 'Pending' : 'Paid'}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Shipping Status:</DataTable.Cell>
                                <DataTable.Cell>{order?.shipping_status === '0' ? 'Not Shipped' : 'Shipped'}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Status:</DataTable.Cell>
                                <DataTable.Cell>{order?.status === '0' ? 'Pending' : 'Processed'}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Payment Date:</DataTable.Cell>
                                <DataTable.Cell>{order?.payment_date || 'N/A'}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Note:</DataTable.Cell>
                                <DataTable.Cell>{order?.note || 'N/A'}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                    </Surface>
                </View>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    surface: {
        flex: 1,
        width: '100%',
        paddingVertical: 20,
    },
    body: {
        flex: 1,
        marginHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        color: "#000",
        fontSize: 24,
        lineHeight: 24,
        letterSpacing: -0.02,
        marginLeft: 20,
        marginBottom: 20,
    },
});

export default OrderShow;
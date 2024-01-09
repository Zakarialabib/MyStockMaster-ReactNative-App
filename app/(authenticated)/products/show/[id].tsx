import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Image } from 'react-native';
import { useShow } from '@refinedev/core';
import { Text, Paragraph, Surface, ActivityIndicator, useTheme } from 'react-native-paper';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductShow = () => {
    const [token, setToken] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('auth_token');
                setToken(storedToken);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchToken();
    }, []);

    const { queryResult } = useShow({
        meta: {
            headers: {
                'Content-Type': 'application/json' ,
                Authorization: `Bearer ${token}`,
            },
        },
    });


    const { data, isLoading } = queryResult;

    const product = data?.data.data;

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <Stack.Screen
                    options={{
                        title: product?.name || 'Product Detail',
                    }}
                />
                <Surface style={styles.surface}>
                    <SafeAreaView style={styles.body}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: product?.image }}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.infoContainer}>
                            <InfoItem label="Name" value={product?.name} />
                            <InfoItem label="Code" value={product?.code} />
                            <InfoItem label="Quantity" value={`${product?.quantity}`} />
                            <InfoItem label="Cost" value={product?.cost} />
                            <InfoItem label="Price" value={product?.price} />
                            <Paragraph>Status: {product?.status}</Paragraph>
                        </View>
                    </SafeAreaView>
                </Surface>
            </View>
        );
    };
};

const InfoItem = ({ label, value }) => (
    <>
        <Text style={styles.label}>{label}</Text>
        <Paragraph>{value}</Paragraph>
    </>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    loadingContainer: {
        marginLeft: 10,
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'row',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    surface: {
        flex: 1,
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingTop: 20,
        borderRadius: 10,
    },
    imageContainer: {
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 4,
        borderRadius: 10,
        backgroundColor: '#fff',
        width: '50%',
        height: '100%',
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
    },
    infoContainer: {
        marginLeft: 10,
        width: '50%',
        justifyContent: 'center',
        textAlign: 'center',
    },
    label: {
        marginTop: 12,
        marginBottom: 3,
    },
});

export default ProductShow;

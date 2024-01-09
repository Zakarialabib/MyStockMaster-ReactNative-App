import React from 'react'
import { useOne, useShow } from '@refinedev/core'
import { View, SafeAreaView, StyleSheet, Platform, } from 'react-native';
import { Text, ActivityIndicator, Surface } from 'react-native-paper';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const CustomerShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        title: record?.name,
                    }}
                />
                <Surface style={styles.surface}>
                    <SafeAreaView style={styles.body}>
                        <View style={styles.infoContainer} >
                            <Text style={{ marginTop: 12, marginBottom: 3 }}>Name</Text>
                            <Text>{record?.name}</Text>
                            <Text style={{ marginTop: 12, marginBottom: 3 }}>Phone: </Text>
                            <Text>{record?.phone}</Text>
                            <Text style={{ marginTop: 12, marginBottom: 3 }}>Address: </Text>
                            <Text>{record?.address}</Text>
                            <Text style={{ marginTop: 12, marginBottom: 3 }}>City: </Text>
                            <Text>{record?.city}</Text>
                        </View>
                    </SafeAreaView>
                </Surface>
            </View >
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
    surface: {
        flex: 1,

    },
    header: {
        backgroundColor: "#CFD6FF",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    title: {
        paddingVertical: 24,
        fontSize: 24,
        lineHeight: 24,
        letterSpacing: -0.02,
        marginLeft: 20,
    },
    body: {
        flex: 1,
        marginHorizontal: 20,
        paddingVertical: 20,
    },
    infoContainer: {
        marginLeft: 10,
        flex: 1,
        paddingVertical: 10,
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
    },

    buttonContainer: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingVertical: 10
    },

});


export default CustomerShow
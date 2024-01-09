import React, { useEffect, useState } from 'react';
import { AuthBindings, Refine } from '@refinedev/core';
import routerProvider from '@refinenative/expo-router';
import { useColorScheme, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";
import { CatchAllNavigate, DrawerLayout } from '@refinenative/expo-router';
import { ReactNavigationThemeProvider } from '@refinenative/react-native-paper'
import DrawerContent from './components/DrawerContent';
import { login, register, logout, onError, check, getUserData } from './utils/AuthUtils';
const API_URL = 'http://erpmaster.test/api/v1';
import Header from './components/Header';
import dataProvider from "@refinedev/simple-rest";

export default function Layout() {

    let colorScheme = useColorScheme();
    let theme = useTheme();

    if (colorScheme === 'dark') {
        // render some dark thing
    } else {
        // render some light thing
    }

    const authProvider: AuthBindings = {
        login,
        register,
        logout,
        check,
        onError,
        // getIdentity: getUserData,
    };

    return (
        <Refine
            routerProvider={routerProvider}
            options={{
                reactQuery: {
                    devtoolConfig: Platform.OS === "web" ? undefined : false,
                },
                disableTelemetry: true
            }}
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "dashboard",
                    list: "/",
                    meta: {
                        label: "dashboard",
                        icon: 'shape'
                    }
                },
                {
                    name: "orders",
                    list: "/orders",
                    show: "/orders/show/:id",
                    meta: {
                        label: "Orders",
                        icon: 'shape'
                    }
                },
                {
                    name: "products",
                    list: "/products",
                    show: "/products/show/:id",
                    meta: {
                        label: "Products",
                        icon: 'warehouse'
                    },
                },
                {
                    name: "customers",
                    list: "/customers",
                    show: "/customers/show/:id",
                    create: "/customers/create",
                    edit: "/customers/edit/:id",
                    meta: {
                        label: "customers",
                        icon: "account-multiple"
                    },
                },
            ]}
            authProvider={authProvider}
        >
            <ReactNavigationThemeProvider theme={theme}>
                <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                <DrawerLayout
                    DrawerContent={() => <DrawerContent />}
                    Header={({ route, options }) => (
                        <Header
                            title={options.title || route.name}
                            showLeftButton={false} // Show left button only when there's a back action
                            showMenuButton={true} // Adjust this based on your requirements
                        />
                    )
                    }
                />
            </ReactNavigationThemeProvider>
        </Refine>
    )
}



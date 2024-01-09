import React from 'react';
import { CatchAllNavigate, DrawerLayout } from '@refinenative/expo-router';
import { Authenticated } from "../components/authenticated";
import { Stack } from 'expo-router';
import Header from '../components/Header';
import DrawerContent from '../components/DrawerContent';
import { useColorScheme, Appearance, Image, Platform, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Layout() {
    let colorScheme = useColorScheme();
    let theme = useTheme();

    if (colorScheme === 'dark') {
        // render some dark thing
    } else {
        // render some light thing
    }

    return (
        <View>
            <Stack.Screen
                options={{
                    header: ({ route, options }) => (
                        <Header
                            title={options.title || route.name}
                            style={options.headerStyle}
                            showLeftButton={true}
                            showMenuButton={true}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: theme.colors.primary,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerShown: true,
                    headerBackTitle: 'Back',
                    headerBackTitleVisible: true,
                    headerBackTitleStyle: {},
                }}
            />
            <DrawerLayout DrawerContent={() => <DrawerContent />} />
        </View>
    );
}

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useTheme, Title } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://erpmaster.test/api/v1';

const getUserData = async (forceRefresh = false) => {
  try {
    const token = await AsyncStorage.getItem('auth_token');

    // Check if there is cached data
    const cachedData = await AsyncStorage.getItem('user_profile');

    if (!forceRefresh && cachedData) {
      return JSON.parse(cachedData);
    }

    const response = await axios.get(`${API_URL}/user-info`, {
      headers: {
        'Content-Type': 'application/json' ,
        Authorization: `Bearer ${token}`,
      },
    });

    // Cache the new data
    await AsyncStorage.setItem('user_profile', JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.error('A problem occurred:', error);
    throw error;
  }
};

const SettingsIndex = () => {
  const theme = useTheme();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData().then((data) => {
      setUserProfile(data);
      setLoading(false);
    });
  }, []);

  const refreshData = () => {
    setLoading(true);
    getUserData(true).then((data) => {
      setUserProfile(data);
      setLoading(false);
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title}>Settings</Text>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color={theme.colors.primary} />
      ) : (
        userProfile && (
          <View style={styles.userInfo}>
            <Title>User Profile</Title>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userProfile.name}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userProfile.email}</Text>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{userProfile.phone}</Text>
            <Text style={styles.label}>City:</Text>
            <Text style={styles.value}>{userProfile.city}</Text>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{userProfile.address}</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 18,
  },
  switch: {
    marginLeft: 8,
  },
  userInfo: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
});

export default SettingsIndex;

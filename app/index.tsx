import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Dashboard from './(authenticated)/dashboard';

const Index = () => {
  const theme = useTheme();

  return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Dashboard />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  block: {
    backgroundColor: '#f45111',
    margin: 10,
    borderRadius: 10,
    height: 150,
    width: '100%',
    textAlign: 'center',
  },
  blockText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default Index;

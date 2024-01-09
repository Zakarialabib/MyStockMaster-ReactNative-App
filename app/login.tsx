import React from 'react'
import { AuthPage } from '@refinenative/react-native-paper'
import { Text, View } from 'react-native';

export default function Login() {
  return (
    <AuthPage type="login"
      title={<Text>Connect In to Your Account</Text>}
      renderContent={(title: React.ReactNode) => {
        return (
          <View>
            {title}
          </View>
        );
      }}
    />
  )
}

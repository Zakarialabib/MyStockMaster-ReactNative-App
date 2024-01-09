// src/screens/HomeScreen.tsx
import React from 'react';
import { View } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const HomeScreen: React.FC = () => {
  return (
    <View>
      <Card>
        <Card.Cover source={{ uri: 'https://example.com/image.jpg' }} />
        <Card.Content>
          <Title>Card Title</Title>
          <Paragraph>Card content goes here.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default HomeScreen;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { AuthRoutes } from './app.routes';
import { AppRoutes } from './auth.routes';
import { useAppContext } from '../hook/context.hook';

export const Routes: React.FC = () => {
  const { context } = useAppContext();

  return (
    <>
      <NavigationContainer>
        {context.isAuth ? <AuthRoutes /> : <AppRoutes />}
      </NavigationContainer>
      {!context.isRefreshTokenValid && (
        <View
          style={{ position: 'absolute', bottom: 0, width: 200, height: 100 }}>
          <Text style={{ fontSize: 32 }}>SnackBar</Text>
        </View>
      )}
    </>
  );
};

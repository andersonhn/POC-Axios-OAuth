import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { RouteTypes } from '../../routes';
import { useService } from '../../hook/service.hook';
import { logMessage } from '../../utils/logger/logger';
import { useAppContext } from '../../hook/context.hook';

export interface LoginProps {
  navigation: StackNavigationProp<any>;
}

export const Login: React.FC<LoginProps> = ({ navigation }) => {
  const service = useService();
  const { context } = useAppContext();

  const loginHandle = async (): Promise<void> => {
    const response = await service.login({
      username: 'anderson@gmail.com',
      password: 'SuperPassword',
    });
    console.info(logMessage('Login', 'Token acquired', response));
  };

  const health = async (): Promise<void> => {
    const response = await service.getHealth();
    console.info(logMessage('Login', 'Server Status', response));
  };

  return (
    <>
      <SafeAreaView>
        <View>
          <Text>User: {context.user?.userEmail}</Text>
          <Text>accessToken: {context.user?.accessToken}</Text>
          <Text>refreshToken: {context.user?.refreshToken}</Text>
          <Text>isAuth: {context.isAuth ? 'true' : 'false'}</Text>
          <Text>
            isRefreshTokenValid:{' '}
            {context.isRefreshTokenValid ? 'true' : 'false'}
          </Text>
        </View>
        <View>
          <Button title={'login'} onPress={loginHandle} />
        </View>
        <View>
          <Button title={'Health'} onPress={health} />
        </View>
      </SafeAreaView>
    </>
  );
};

import React, { useContext } from 'react';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { View, SafeAreaView, Button } from 'react-native';
import { RouteTypes } from '../../routes/routes';
import { useService } from '../../hook/service.hook';
import { logMessage } from '../../utils/logger/logger';

export interface LoginProps {
  navigation: StackNavigationProp<any>;
}

export const Login: React.FC<LoginProps> = ({ navigation }) => {
  const service = useService(navigation);

  const loginHandle = async (): Promise<void> => {
    const response = await service.login({
      username: 'anderson',
      password: '123',
    });
    console.info(logMessage('Login', 'Token acquired', response));
    navigation.navigate(RouteTypes.HOME);
  };

  const health = async (): Promise<void> => {
    const response = await service.getHealth();
    console.info(logMessage('Login', 'Server Status', response));
  };

  return (
    <>
      <SafeAreaView>
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

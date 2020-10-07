import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { RouteTypes } from '../../routes';
import { useService } from '../../hook/service.hook';
import { logMessage } from '../../utils/logger/logger';
import { useAppContext } from '../../hook/context.hook';

export interface HomeProps {
  navigation: StackNavigationProp<any>;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { context, signOut } = useAppContext();
  const service = useService();

  const logout = () => {
    signOut();
  };

  const failRequest = async (): Promise<void> => {
    console.info(logMessage('Home', 'Fail Request with a valid refresh token'));
    await service.failRequest();
  };

  const logoutAfterRefreshFail = async (): Promise<void> => {
    console.info(
      logMessage('Home', 'Fail Request with a invalid refresh token'),
    );
    await service.failGetUser();
  };

  return (
    <SafeAreaView>
      <View>
        <Text>User: {context.user?.userEmail}</Text>
        <Text>accessToken: {context.user?.accessToken}</Text>
        <Text>refreshToken: {context.user?.refreshToken}</Text>
        <Text>isAuth: {context.isAuth ? 'true' : 'false'}</Text>
        <Text>
          isRefreshTokenValid: {context.isRefreshTokenValid ? 'true' : 'false'}
        </Text>
      </View>
      <View>
        <Button title={'Logout'} onPress={logout} />
      </View>
      <View>
        <Button title={'Fail Request'} onPress={failRequest} />
      </View>
      <View>
        <Button
          title={'Logout after refresh fail'}
          onPress={logoutAfterRefreshFail}
        />
      </View>
    </SafeAreaView>
  );
};

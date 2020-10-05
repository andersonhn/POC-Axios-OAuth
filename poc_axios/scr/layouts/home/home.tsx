import React from 'react';
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Button
} from 'react-native';
import {default as LocalStorageService, LocalStorage} from "../../utils/localStorage/localStorage.util";
import {CustomerBffDriver, CustomerBffDriverDefault} from "../../driver/driver";
import {RouteTypes} from "../../routes/routes";

export interface HomeProps {
  navigation: StackNavigationProp<any>;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {

  const service: CustomerBffDriver = new CustomerBffDriverDefault();
  const localStorage: LocalStorage = new LocalStorageService();

  const refreshToken = async (): Promise<void> => {
    const refreshToken = await localStorage.getRefreshToken();
    const response = await service.refreshToken(refreshToken);
    console.info('refresh Token', response)
  };

  const refreshTokenInvalid = async (): Promise<void> => {
    const refreshToken = await localStorage.getRefreshToken();
    await service.refreshTokenInvalid(refreshToken);
    console.info('Request with a fail token')
  };

  const logout = () => {
    localStorage.clearToken();
    navigation.navigate(RouteTypes.LOGIN);
  };

  const healthHome = async (): Promise<void> => {
    const response = await service.getHealth();
    console.info('status health', response)
  };


  return (
    <SafeAreaView>
      <View>
        <Button title={'Refresh Token'} onPress={refreshToken}/>
      </View>
      <View>
        <Button title={'Refresh Invalid Token'} onPress={refreshTokenInvalid}/>
      </View>
      <View>
        <Button title={'Logout'} onPress={logout}/>
      </View>
      <View>
        <Button title={'Health'} onPress={healthHome}/>
      </View>
    </SafeAreaView>
  );
};

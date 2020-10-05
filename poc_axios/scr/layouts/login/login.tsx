import React from 'react';
import {CustomerBffDriver, CustomerBffDriverDefault} from "../../driver/driver";
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Button
} from 'react-native';
import {LocalStorage, default as LocalStorageService} from "../../utils/localStorage/localStorage.util";
import {RouteTypes} from "../../routes/routes";

export interface LoginProps {
  navigation: StackNavigationProp<any>;
}

export const Login: React.FC<LoginProps> = ({ navigation }) => {
  const service: CustomerBffDriver = new CustomerBffDriverDefault();
  const localStorage: LocalStorage = new LocalStorageService();

  const login = async (): Promise<void> => {
    const response = await service.login({username: 'anderson', password: '123'});
    console.info('Tokens:', response);
    localStorage.setToken(response);
    navigation.navigate(RouteTypes.HOME);
  };

  const health = async (): Promise<void> => {
    const response = await service.getHealth();
    console.info('status health', response)
  };

  return (
    <>
      <SafeAreaView>
        <View>
          <Button title={'login'} onPress={login}/>
        </View>
        <View>
          <Button title={'Health'} onPress={health}/>
        </View>
      </SafeAreaView>
    </>
  );
}

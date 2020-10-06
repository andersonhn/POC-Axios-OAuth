import React, {useContext} from 'react';
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {
  View,
  SafeAreaView,
  Button
} from 'react-native';
import {LocalStorage, default as LocalStorageService} from "../../utils/localStorage/localStorage.util";
import {RouteTypes} from "../../routes/routes";
import {AppContext} from "../../context/appContext";
import {useService} from "../../hook/service.hook";

export interface LoginProps {
  navigation: StackNavigationProp<any>;
}

export const Login: React.FC<LoginProps> = ({ navigation }) => {
  const appContext = useContext(AppContext);
  const service = useService(navigation);
  const localStorage: LocalStorage = new LocalStorageService();

  const loginHandle = async (): Promise<void> => {
    const response = await service.login({username: 'anderson', password: '123'});
    appContext.setAuth(true);
    console.info('Tokens:', response);
    localStorage.setToken(response!);
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
          <Button title={'login'} onPress={loginHandle}/>
        </View>
        <View>
          <Button title={'Health'} onPress={health}/>
        </View>
      </SafeAreaView>
    </>
  );
}

import React, {useContext} from 'react';
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Button
} from 'react-native';
import {default as LocalStorageService, LocalStorage} from "../../utils/localStorage/localStorage.util";
import Service from "../../driver/driver";
import {RouteTypes} from "../../routes/routes";

export interface HomeProps {
  navigation: StackNavigationProp<any>;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {

  const localStorage: LocalStorage = new LocalStorageService();

  const logout = () => {
    localStorage.clearToken();
    navigation.navigate(RouteTypes.LOGIN);
  };

  const failRequest = async (): Promise<void> => {
    const response = await Service.failRequest();
    console.info('fail Request', response)
  };

  const logoutAfterRefreshFail = async (): Promise<void> => {
    const response = await Service.failGetUser();
    console.info('fail Request', response)
  };

  return (
    <SafeAreaView>
      <View>
        <Button title={'Logout'} onPress={logout}/>
      </View>
      <View>
        <Button title={'Fail Request'} onPress={failRequest}/>
      </View>
      <View>
        <Button title={'Logout after refresh fail'} onPress={logoutAfterRefreshFail}/>
      </View>
    </SafeAreaView>
  );
};

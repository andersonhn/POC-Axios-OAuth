import React, {useContext} from 'react';
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Button
} from 'react-native';
import {default as LocalStorageService, LocalStorage} from "../../utils/localStorage/localStorage.util";
import {RouteTypes} from "../../routes/routes";
import {useService} from "../../hook/service.hook";
import {AppContext} from "../../context/appContext";

export interface HomeProps {
  navigation: StackNavigationProp<any>;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {

  const appContext = useContext(AppContext);
  const service = useService(navigation);
  const localStorage: LocalStorage = new LocalStorageService();

  const logout = () => {
    localStorage.clearToken();
    appContext.setAuth(false);
    navigation.navigate(RouteTypes.LOGIN);
  };

  const failRequest = async (): Promise<void> => {
    await service.failRequest();
  };

  const logoutAfterRefreshFail = async (): Promise<void> => {
    await service.failGetUser();
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

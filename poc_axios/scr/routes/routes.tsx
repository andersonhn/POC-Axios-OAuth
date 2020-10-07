import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { View, Text } from 'react-native';

import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { Login } from '../layouts/login/login';
import { Home } from '../layouts/home/home';
import { AppContext } from '../context/appContext';

export enum RouteTypes {
  LOGIN = 'Login',
  HOME = 'Home',
}

export type StackRoutesParams = {
  [RouteTypes.HOME]: undefined;
  [RouteTypes.LOGIN]: undefined;
};

export const Stack = createStackNavigator<StackRoutesParams>();

export const Routes: React.FC = () => {
  const { isAuth } = useContext(AppContext);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          mode="modal"
          initialRouteName={!isAuth ? RouteTypes.LOGIN : RouteTypes.HOME}>
          <Stack.Screen component={Login} name={RouteTypes.LOGIN} />
          <Stack.Screen component={Home} name={RouteTypes.HOME} />
        </Stack.Navigator>
      </NavigationContainer>
      {!isAuth && (
        <View
          style={{ position: 'absolute', bottom: 0, width: 200, height: 100 }}>
          <Text style={{ fontSize: 32 }}>SnackBar</Text>
        </View>
      )}
    </>
  );
};

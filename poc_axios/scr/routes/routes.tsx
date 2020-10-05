import React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Login} from "../layouts/login/login";
import {Home} from "../layouts/home/home";

export enum RouteTypes {
  LOGIN = 'Login',
  HOME = 'Home',
}

export type StackRoutesParams = {
  [RouteTypes.HOME]: undefined;
  [RouteTypes.LOGIN]: undefined;
};

const Stack = createStackNavigator<StackRoutesParams>();


export const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        mode="modal"
        initialRouteName={
          RouteTypes.LOGIN
        }>
        <Stack.Screen
          component={Login}
          name={RouteTypes.LOGIN}
        />
        <Stack.Screen
          component={Home}
          name={RouteTypes.HOME}
        />
      </Stack.Navigator>
    </NavigationContainer>
);
};

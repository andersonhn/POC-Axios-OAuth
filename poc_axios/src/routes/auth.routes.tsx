import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { Login } from '../layouts';

export enum AppRouteTypes {
  LOGIN = 'Login',
}

export type AppStackRoutesParams = {
  [AppRouteTypes.LOGIN]: undefined;
};

export const AppStack = createStackNavigator<AppStackRoutesParams>();

export const AppRoutes: React.FC = () => {
  return (
    <AppStack.Navigator mode="modal" initialRouteName={AppRouteTypes.LOGIN}>
      <AppStack.Screen component={Login} name={AppRouteTypes.LOGIN} />
    </AppStack.Navigator>
  );
};

import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { Home } from '../layouts';

export enum AuthRouteTypes {
  HOME = 'Home',
}

export type AuthStackRoutesParams = {
  [AuthRouteTypes.HOME]: undefined;
};

export const AuthStack = createStackNavigator<AuthStackRoutesParams>();

export const AuthRoutes: React.FC = () => {
  return (
    <AuthStack.Navigator mode="modal" initialRouteName={AuthRouteTypes.HOME}>
      <AuthStack.Screen component={Home} name={AuthRouteTypes.HOME} />
    </AuthStack.Navigator>
  );
};

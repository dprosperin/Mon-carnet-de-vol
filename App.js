import 'react-native-gesture-handler';
import React from 'react';
import Home from './screens/Home';
import History from './screens/History';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import i18next from './translations/i18next';
import './prod/sentry';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3656AB',
      accent: '#f1c40f',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Tab.Navigator>
          <Tab.Screen
            name={i18next.t('VisualFlightRulesCalculator.title_short')}
            component={Home}
            options={{
              tabBarLabel: i18next.t('VisualFlightRulesCalculator.title_short'),
              tabBarIcon: ({color}) => (
                <Icon name="assignment" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name={i18next.t('History.title')}
            component={History}
            options={{
              tabBarLabel: i18next.t('History.title'),
              tabBarIcon: ({color}) => (
                <Icon name="history" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

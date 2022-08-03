import 'react-native-gesture-handler';
import React from 'react';
import Home from './screens/Home';
import History from './screens/History';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

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
            name="Calculs VFR"
            component={Home}
            options={{
              tabBarLabel: 'Calculs VFR',
              tabBarIcon: ({color}) => (
                <Icon name="assignment" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Historique"
            component={History}
            options={{
              tabBarLabel: 'Historique',
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

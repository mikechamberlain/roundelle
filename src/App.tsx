import React from 'react';
import { createStackNavigator, NavigationScreenProps } from 'react-navigation';
import { Font } from 'expo';
import { defaultStyles } from './styles';
import { Home } from './Home/Home';

export class App extends React.PureComponent<NavigationScreenProps> {

  async componentDidMount() {
    await Font.loadAsync({
      'johnston': require('./assets/fonts/Johnston100-Regular.otf'),
    });
    this.props.navigation.replace('Home')
  }

  render(): JSX.Element {
    return null;
  }
}

export default createStackNavigator({
  App: App,
  Home: Home,
}, {
    initialRouteName: 'App',
    navigationOptions: {
      headerStyle: {
        backgroundColor: defaultStyles.brandColor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
      },
    },
  }
);

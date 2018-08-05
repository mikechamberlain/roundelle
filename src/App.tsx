import React from 'react';
import { createStackNavigator, NavigationScreenProps } from 'react-navigation';
import { Font, AppLoading } from 'expo';
import { defaultStyles } from './styles';
import { Home } from './Home/Home';

export class App extends React.PureComponent<NavigationScreenProps> {

  state = {
    isReady: false,
  };

  async cacheResourcesAsync() {
    await Font.loadAsync({
      'johnston': require('./assets/fonts/Johnston100-Regular.otf'),
    });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.cacheResourcesAsync}
          onFinish={() => this.props.navigation.replace('Home')}
          onError={console.warn}
        />
      );
    } else {
      return null;
    }
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

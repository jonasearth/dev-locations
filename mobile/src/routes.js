import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions:{
        title: 'Me Chupa David'
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions:{
        title: 'Perfil do Git'
      },
    }
  }, {
    defaultNavigationOptions: {
      headerTintColor : '#fff',
      headerStyle:{
        backgroundColor: '#7d40e7'
      }
    }
  })
);
export default Routes;
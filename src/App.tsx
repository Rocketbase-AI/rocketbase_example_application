import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeView from './HomeView';
import CaptureView from './CaptureView';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeView},
  Capture: {screen: CaptureView}
});

const App = createAppContainer(MainNavigator);

export default App;
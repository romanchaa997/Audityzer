
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// Import crypto polyfill for React Native
import 'react-native-get-random-values';

AppRegistry.registerComponent(appName, () => App);

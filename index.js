/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {YellowBox, Logbox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: ...']);
// LogBox.ignoreLogs();
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);

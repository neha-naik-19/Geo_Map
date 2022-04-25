// import React from 'react';
// import Scan from './src/screens/Scan';
// import Scan_1 from './src/screens/Scan_1';
// import ScanScreen from './src/screens/ScanScreen';
// // import {MessageBar} from 'react-native-messages';
// const App = () => {
//   return <Scan />;
//   // return <Scan_1 />;
//   // return <ScanScreen />;
// };

// export default App;

import * as React from 'react';
import {View, Text, Button, BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Scan from './src/screens/Scan';
import Test from './src/screens/Test';
import GeoLocation from './src/screens/GeoLocation';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Scan"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Scan"
          component={Scan}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="GeoLocation" component={GeoLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

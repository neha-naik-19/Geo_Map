import React from 'react';
import {Text, View} from 'react-native';

const Test = prop => {
  //   console.log('prop : ', prop);
  return (
    <View>
      <Text>{prop.route.params.test}</Text>
    </View>
  );
};

export default Test;

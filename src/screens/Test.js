import React from 'react';
import {View, Text, FlatList} from 'react-native';

const Test = prop => {
  // console.log('prop ::', prop);
  console.log('params ::', prop.route.params.products);

  let test = [
    {id: '1', name: 'test1', cost: 150},
    // {id: '2', name: 'test2', cost: 140},
  ];

  return (
    <View>
      <Text>Test FlatList</Text>
      <FlatList
        data={prop.route.params.products}
        keyExtractor={(item, index) => item.prodId}
        // keyExtractor={(item, index) => index}
        // keyExtractor={item => console.log('key test : ', item.id)}
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Test;

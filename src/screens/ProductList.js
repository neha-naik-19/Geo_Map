import React, {Fragment, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import styles from './scanStyle';
import {Dimensions} from 'react-native';
const deviceWidth = Dimensions.get('screen').width;

const ProductList = data => {
  let products = [];
  let uniqueProducts = [];
  let test = [];

  if (data.data.length > 0) {
    products = data.data.map(i => {
      return {id: i.id, name: i.name, stock: i.stock};
    });

    uniqueProducts = products.filter(
      (products, index, self) =>
        index === self.findIndex(t => t.id === products.id),
    );

    test = [
      {id: '1', name: 'test1', cost: 150},
      {id: '2', name: 'test2', cost: 140},
      {id: '3', name: 'test1', cost: 150},
      {id: '4', name: 'test2', cost: 140},
      {id: '5', name: 'test1', cost: 150},
      {id: '6', name: 'test2', cost: 140},
      {id: '7', name: 'test1', cost: 150},
      {id: '8', name: 'test2', cost: 140},
      {id: '9', name: 'test1', cost: 150},
      {id: '10', name: 'test2', cost: 140},
      {id: '11', name: 'test1', cost: 150},
      {id: '12', name: 'test2', cost: 140},
      {id: '13', name: 'test1', cost: 150},
      {id: '14', name: 'test2', cost: 140},
      {id: '15', name: 'test1', cost: 150},
      {id: '16', name: 'test2', cost: 140},
      {id: '17', name: 'test1', cost: 150},
      {id: '18', name: 'test2', cost: 140},
      {id: '19', name: 'test1', cost: 150},
      {id: '20', name: 'test2', cost: 140},
      {id: '21', name: 'test1', cost: 150},
      {id: '22', name: 'test2', cost: 140},
    ];
  }

  return (
    <View style={stylesProduct.container}>
      <ScrollView>
        {uniqueProducts.map(item => (
          <View style={[stylesProduct.card, stylesProduct.shadowProp]}>
            <Text style={{display: 'none'}}>{item.id}</Text>
            <Text style={stylesProduct.outerText}>{item.name}</Text>
            <View style={stylesProduct.outerView} key={item.id}>
              <View style={stylesProduct.innerView}>
                <Text style={stylesProduct.innerText}>{item.name}</Text>
                <Text style={stylesProduct.innerText}>{item.stock}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* {products.map(i => {
        return <Text>{i.name}</Text>;
      })} */}
    </View>
  );
};

const stylesProduct = StyleSheet.create({
  scrollview: {backgroundColor: 'pink'},
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  outerView: {fontSize: 18, flexDirection: 'row'},
  outerText: {paddingTop: 10, fontWeight: 'bold', color: '#00008B'},
  innerView: {
    // backgroundColor: '#9BC53D',
    // borderWidth: 1,
    // borderColor: 'red',
    width: deviceWidth,
    flexDirection: 'row',
  },
  innerText: {padding: 5},
  card: {
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.26,
    elevation: 18,
    backgroundColor: 'yellow',
    padding: 5,
    marginLeft: 1,
    borderRadius: 10,
  },
});

export default ProductList;

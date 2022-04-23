import React, {Fragment, useState, useEffect} from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import styles from './scanStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';
const deviceWidth = Dimensions.get('screen').width;

const ProductList = prop => {
  let [count, setCount] = useState(0);

  let products = [];
  let uniqueProducts = [];
  let [unqProd, setunqProd] = useState([]);
  let increament = [];
  let decreament = [];
  let increamentItemQty = [];
  // let deleteItem = [];
  let test = [];

  if (prop.data.length > 0) {
    products = prop.data.map(i => {
      return {id: i.id, name: i.name, stock: i.stock, cost: i.cost, qty: 0};
    });

    uniqueProducts = products.filter(
      (products, index, self) =>
        index === self.findIndex(t => t.id === products.id),
    );

    // unqProd = uniqueProducts;

    // console.log('products :: ', uniqueProducts);

    increamentItemQty = (id, cnt) => {
      let index = uniqueProducts.findIndex(c => c.id === id);
      if (index !== -1) {
        //   setCount(prev => [
        //     ...prev.slice(0, 1),
        //     {...prev[index], cnt},
        //     ...prev.slice(index + 1),
        //   ]);
      }
    };

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
      <FlatList
        data={uniqueProducts}
        keyExtractor={item => console.log('key test : ', item.id.toString())}
        renderItem={item => {
          return <Text>item.name</Text>;
        }}
      />

      {/* <ScrollView>
        {uniqueProducts.map(item => (
          <View style={stylesProduct.card}>
            <Text style={{display: 'none'}}>{item.id}</Text>
            <Text style={stylesProduct.outerText}>{item.name}</Text>
            <View style={stylesProduct.outerView} key={item.id}>
              <View style={stylesProduct.innerView}>
                <View
                  style={{
                    flex: 0.5,
                    height: 60,
                    flexDirection: 'row',
                  }}>
                  <View style={stylesProduct.innerSubView1}>
                    <TouchableOpacity
                      onPress={() => increamentItemQty(item.id, item.qty)}>
                      <Icon
                        style={{color: 'green'}}
                        name="add-circle-outline"
                        size={25}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => console.log('decrement item qty!')}>
                      <Icon
                        style={{color: 'red'}}
                        name="remove-circle-outline"
                        size={25}></Icon>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text
                      style={{
                        flex: 0.5,
                        color: 'black',
                        marginRight: 5,
                        fontWeight: 'bold',
                      }}>
                      {item.qty}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    stylesProduct.innerSubView1,
                    stylesProduct.innerSubView2,
                  ]}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    {item.cost + '.00'}
                  </Text>
                </View>
                <View
                  style={[
                    stylesProduct.innerSubView1,
                    stylesProduct.innerSubView3,
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      prop.deleteItem(item.id);
                    }}>
                    <Icon
                      style={{color: 'blue'}}
                      name="trash-outline"
                      size={25}></Icon>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView> */}

      {/* {products.map(i => {
        return <Text>{i.name}</Text>;
      })} */}
    </View>
  );
};

const stylesProduct = StyleSheet.create({
  container: {
    //flex: 1,
    width: 60,
    flexDirection: 'row',
  },
  outerView: {height: 50},
  outerText: {
    fontSize: 12,
    paddingTop: 2,
    paddingBottom: 8,
    paddingLeft: 20,
    fontWeight: 'bold',
    color: '#00008B',
  },
  innerView: {
    // width: deviceWidth / 4,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  innerSubView1: {flex: 1, height: 60},
  innerSubView2: {alignItems: 'center'},
  innerSubView3: {alignItems: 'flex-end'},
  innerText: {padding: 5},
  card: {
    backgroundColor: '#f5f5f5',
    padding: 5,
    marginLeft: 1,
    marginTop: 5,
    borderRadius: 10,
  },
});

export default ProductList;

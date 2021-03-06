import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SelectedLayout,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';

const Products = prop => {
  const [finalProducts, setFinalProducts] = useState([]);

  // console.log('prop ::', prop);
  // console.log('params ::', prop.route.params.products);

  useEffect(() => {
    setFinalProducts(prop.route.params.products);

    prop.navigation.setOptions({
      headerShown: false,
      title: 'Products List',
      headerLeft: () => null,
      // headerLeft: () => {
      //   return (
      //     <TouchableOpacity
      //       onPress={() => {
      //         prop.navigation.push('Scan', {scan: true});
      //       }}>
      //       <Icon
      //         name="arrow-back-outline"
      //         size={25}
      //         style={{color: 'green', marginRight: 20}}></Icon>
      //     </TouchableOpacity>
      //   );
      // },
    });
  }, []);

  const deleteItem = id => {
    let prod = [...finalProducts];
    let index = prod.findIndex(c => c.id === id);
    if (index !== -1) {
      prod.splice(index, 1);
    }
    setFinalProducts(prod);
    prop.route.params.products = finalProducts;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={finalProducts}
        keyExtractor={(item, index) => item.prodId.toString()}
        // keyExtractor={(item, index) => index}
        // keyExtractor={item => console.log('key test : ', item.id)}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <View style={styles.insideViewProduct}>
              <Text style={styles.headerText}>Product</Text>
            </View>
            <View style={styles.insideView}>
              <Text style={styles.headerText}>Qty</Text>
            </View>
            <View style={styles.insideView}>
              <Text style={styles.headerText}></Text>
            </View>
          </View>
        )}
        stickyHeaderIndices={[0]}
        extraData={finalProducts}
        renderItem={({item, index}) => {
          return (
            <View style={styles.item}>
              <View style={styles.insideViewProduct}>
                <Text style={styles.title}>{item.name}</Text>
              </View>
              <View style={styles.insideView}>
                <Text style={styles.title}>{item.qty}</Text>
              </View>
              <View style={styles.insideView}>
                <TouchableOpacity
                  onPress={() => {
                    deleteItem(item.id);
                  }}>
                  <Icon
                    style={{color: 'blue'}}
                    name="trash-outline"
                    size={25}></Icon>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          // justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: '#D3D3D3',
          width: '50%',
          borderRadius: 10,
          padding: 5,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={0.5}
          onPress={() => prop.navigation.navigate('GeoLocation')}>
          <Image
            source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
            }}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <Text style={{fontWeight: 'bold', fontSize: 17}}>
            Current Location
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#808080',
    padding: 8,
    // marginVertical: 8,
    MarginBottom: 0,
    marginHorizontal: 16,
  },
  headerText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FDF5E6',
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    // justifyContent: 'space-around',
  },
  title: {
    fontSize: 15,
    color: 'black',
  },
  insideViewProduct: {
    flex: 4,
  },
  insideView: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Products;

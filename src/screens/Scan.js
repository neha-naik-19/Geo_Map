import React, {Fragment, useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  Linking,
  View,
  Image,
  ImageBackground,
  BackHandler,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle';
import ProductList from './ProductList';
import Test from './Test';
import ProductList_1 from './ProductList_1';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {MessageBar, showMessage} from 'react-native-messages';
import {useNavigation} from '@react-navigation/native';
// import Geolocation from 'react-native-geolocation-service';

const Scan = prop => {
  const [scan, setScan] = useState(false);
  const [scanResult, setScanResult] = useState(false);
  let [result, setResult] = useState([]);
  const [isProd, setIsProd] = useState(false);
  const [scanner, setScanner] = useState('');
  const [count, setCount] = useState(0);
  const [prodId, setProdId] = useState(1);
  const [hideBtn, setHideBtn] = useState(false);
  let [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  let product = [];
  let product1 = [];
  let cnt = 0;
  let data = [...result];
  let objectData = [...products];
  let deleteItem = [];

  const navigation = useNavigation();
  // console.log('navigation  :: ', navigation);
  console.log('route  :: ', prop.route);

  const onSuccess = e => {
    const check = e.data.substring(0, 4);
    // console.log('scanned data' + check);
    // console.log('scanned data ' + e.data);
    // setResult(e);

    fetchData(e.data);

    setScanResult(true);
    setScan(false);
    setLoading(true);

    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    }
  };

  const fetchData = async productId => {
    try {
      // const configurationObject = {
      //   method: 'get',
      //   url: `https://admin.aepplast.com/api/products/view/${productId}.json`,
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'x-api-key': 'A359fgdfgdfgdfgdfgdfcf7',
      //   },
      // };

      // const data = new FormData();
      // data.append('id', 67);

      const configurationObject = {
        method: 'POST',
        url: `https://admin.aepplast.com/api/products/view`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: '9827b720-bbbf-1a95-51d7-b77434011970',
        },
        data: {id: productId},
      };

      const response = await axios(configurationObject);

      // console.log('response :: ', response.data);

      setLoading(false);

      if (data.length == 0) {
        data.push({
          brand: response.data.brand,
          id: response.data.id,
          name: response.data.name,
          price: response.data.regular_price,
          unit: response.data.unit_of_measurement,
          stock: response.data.stock_available,
        });
      } else {
        data.unshift({
          brand: response.data.brand,
          id: response.data.id,
          name: response.data.name,
          price: response.data.regular_price,
          unit: response.data.unit_of_measurement,
          stock: response.data.stock_available,
        });
      }

      if (data.length > 0) {
        product = [...data];
      }
      setResult(product);
      setHideBtn(true);
    } catch (error) {
      // console.log('request error : ', error.request);
      // console.log('response error : ', error.response);
      console.log('Error : ', error.message, error.status);
      setLoading(false);
      Alert.alert('Stock not available.');
    }
  };

  const addToList = () => {
    setHideBtn(false);
    setProdId(prodId + 1);

    // console.log(result);

    if (objectData.length == 0) {
      objectData.push({
        prodId: prodId.toString(),
        id: result[0].id,
        name: result[0].name,
        unit: result[0].unit,
        stock: result[0].stock,
        price: result[0].price,
        qty: 0,
      });
    } else {
      objectData.unshift({
        prodId: prodId.toString(),
        id: result[0].id,
        name: result[0].name,
        unit: result[0].unit,
        stock: result[0].stock,
        price: result[0].price,
        qty: 0,
      });
    }

    // console.log('objectData :: ', objectData);

    product1 = [...objectData];
    setProducts([...product1]);
  };

  const cancelAdd = () => {
    setHideBtn(false);
  };

  const increamentQty = stock => {
    // console.log(count, stock);
    if (count + 1 <= stock) {
      setCount(count + 1);
    } else {
      Alert.alert('Stock limit exceeded.\nPlease check.');
    }
  };

  const decrementQty = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  // deleteItem = id => {
  //   let prod = product;
  //   let index = prod.findIndex(c => c.id === id);
  //   if (index !== -1) {
  //     prod.splice(index, 1);
  //   }
  //   setProducts(prod);
  // };

  const activeQR = () => {
    setScan(true);
    setIsProd(false);
  };

  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  };

  function Message({message, hideMessage}) {
    if (message instanceof Error) {
      return <Text>Stock not available</Text>;
    } else {
      return <Text>ABC-1</Text>;
    }
  }

  return (
    <View style={styles.scrollViewStyle}>
      <Fragment>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => BackHandler.exitApp()}>
            <Icon name="arrow-back-outline" size={30}></Icon>
          </TouchableOpacity>
          <Text style={styles.textTitle}>Scan QR Code</Text>
        </View>
        {!scan && !scanResult && (
          <View style={styles.cardView}>
            <Text numberOfLines={8} style={styles.descText}>
              Please move your camera {'\n'} over the QR Code
            </Text>
            <Image
              source={require('../assets/qr-code.png')}
              style={{margin: 20}}></Image>
            <TouchableOpacity onPress={activeQR} style={styles.buttonScan}>
              <View style={styles.buttonWrapper}>
                <Icon
                  name="camera-outline"
                  style={{color: 'black'}}
                  size={30}></Icon>
                <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>
                  Scan QR Code
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {scanResult && (
          <Fragment>
            <View style={scanResult ? styles.scanCardView : styles.cardView}>
              {loading ? (
                <View style={{flex: 1}}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text style={styles.textfiled}>Please wait..</Text>
                </View>
              ) : (
                <View style={{flex: 1}}>
                  {result.length > 0 && (
                    // important
                    <View style={{flex: 1}}>
                      {/* <View style={styles.scanDeviceWidth}> <Text>{console.log('test : ', result)}</Text> */}
                      <View style={styles.viewText}>
                        <Text style={styles.dataLabel}>Product :</Text>
                        <Text style={styles.dataText}>{result[0].name}</Text>
                      </View>
                      <View style={styles.viewText}>
                        <Text style={styles.dataLabel}>Amount :</Text>
                        <Text
                          style={
                            styles.dataText
                          }>{`Rs. ${result[0].price}`}</Text>
                      </View>
                      <View style={styles.viewQty}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginRight: 25,
                          }}>
                          <Text style={styles.dataLabel}>Quantity :</Text>
                          <Text style={styles.dataText}>{count}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              increamentQty(result[0].stock);
                            }}>
                            <Icon
                              name="add-circle"
                              size={35}
                              style={{color: 'green'}}></Icon>
                          </TouchableOpacity>
                        </View>
                        <View>
                          <TouchableOpacity onPress={decrementQty}>
                            <Icon
                              name="remove-circle"
                              size={35}
                              style={{color: 'darkred'}}></Icon>
                          </TouchableOpacity>
                        </View>
                      </View>
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
                          onPress={() =>
                            prop.navigation.navigate('GeoLocation')
                          }>
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
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={addToList}
                          style={!hideBtn ? styles.hideBtn : styles.buttonScan}>
                          <View style={styles.buttonWrapper}>
                            <Icon
                              name="cart"
                              size={30}
                              style={{color: '#15317E'}}></Icon>
                            <Text>Add</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={cancelAdd}
                          style={!hideBtn ? styles.hideBtn : styles.buttonScan}>
                          <View style={styles.buttonWrapper}>
                            <Icon
                              name="archive-outline"
                              size={30}
                              style={{color: '#15317E'}}></Icon>
                            <Text>Cancel</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <TouchableOpacity
                      onPress={scanAgain}
                      style={hideBtn ? styles.hideBtn : styles.buttonScan}>
                      <View style={styles.buttonWrapper}>
                        <Icon name="camera-outline" size={30}></Icon>
                        <Text
                          style={{...styles.buttonTextStyle, color: '#2196f3'}}>
                          scan again
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.push('Test', {products: objectData});
                      }}
                      style={hideBtn ? styles.hideBtn : styles.buttonScan}>
                      <View style={styles.buttonWrapper}>
                        <Text
                          style={{...styles.buttonTextStyle, color: '#2196f3'}}>
                          Continue
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </Fragment>
        )}
        {scan && (
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            // ref={node => {
            //   setScanner(node);
            // }}
            onRead={onSuccess}
            topContent={
              <Text style={styles.centerText}>
                Please move your camera {'\n'} over the QR Code
              </Text>
            }
          />
        )}
      </Fragment>
    </View>
  );
};

export default Scan;

import React, {Fragment, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  Linking,
  View,
  Image,
  ImageBackground,
  BackHandler,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle';
import ProductList from './ProductList';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {MessageBar, showMessage} from 'react-native-messages';

const Scan = () => {
  const [scan, setScan] = useState(false);
  const [scanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(false);
  const [scanner, setScanner] = useState('');
  const [products, setProducts] = useState([]);
  let product = [];
  let data = [...products];
  let isFetchDataError = 0;

  const onSuccess = e => {
    const check = e.data.substring(0, 4);
    // console.log('scanned data' + check);
    // console.log('scanned data ' + e.data);
    setResult(e);
    setScan(false);
    setScanResult(true);

    fetchData(e.data);

    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    }
  };

  const fetchData = async productId => {
    try {
      const configurationObject = {
        method: 'get',
        url: `https://admin.aepplast.com/api/products/view/${productId}.json`,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'A359fgdfgdfgdfgdfgdfcf7',
        },
      };

      const response = await axios(configurationObject);

      for (const d in Object.entries(response.data)) {
        if (data.length == 0) {
          data.push({
            id: Object.entries(response.data)[d][1]['id'],
            name: Object.entries(response.data)[d][1]['name'],
            unit: Object.entries(response.data)[d][1]['number_of_units'],
            stock: Object.entries(response.data)[d][1]['physical_stock'],
            igst: Object.entries(response.data)[d][1]['igst'],
            cost: Object.entries(response.data)[d][1]['input_cost'],
          });
        } else {
          data.unshift({
            id: Object.entries(response.data)[d][1]['id'],
            name: Object.entries(response.data)[d][1]['name'],
            unit: Object.entries(response.data)[d][1]['number_of_units'],
            stock: Object.entries(response.data)[d][1]['physical_stock'],
            igst: Object.entries(response.data)[d][1]['igst'],
            cost: Object.entries(response.data)[d][1]['input_cost'],
          });
        }
      }

      if (data.length > 0) {
        product = [...data];
      }

      // setIsFetchDataError(0);
      isFetchDataError = 0;
      setProducts(product);
    } catch (error) {
      isFetchDataError = 1;
      console.log('Error : ', error.message, error.status);
      Alert.alert('Stock not available.');
    }
  };

  const activeQR = () => {
    setScan(true);
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
                <Icon name="camera-outline" size={30}></Icon>
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
              <ProductList data={products} />
              <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
                <View style={styles.buttonWrapper}>
                  <Icon name="camera-outline" size={30}></Icon>
                  <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>
                    Click to scan again
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Fragment>
        )}
        {scan && (
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            ref={node => {
              setScanner(node);
            }}
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

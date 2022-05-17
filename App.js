import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  platform,
  image,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Image,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import Geocoder from 'react-native-geocoder';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';

const App = prop => {
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [locationStatus, setLocationStatus] = useState('');
  const [address, setAddress] = useState('');
  let addr = [];
  // Geocoder.fallbackToGoogle('AIzaSyDl4WjiXse1SS-UWOiLcSrHfxdmwBZgURA');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
            // getGeocode();
            // navigateBack();
  
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();

    // const uniqueId = DeviceInfo.getUniqueId();
    // console.log('uniqueId :: ',uniqueId);

    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = async () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        setLocationStatus('You are Here');
        // console.log(position);

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
      },
    );
  };

  // const navigateBack =  () => {
  //   if (currentLatitude !== 0 && currentLongitude !== 0) {
  //     var NY = {
  //       lat: parseFloat(currentLatitude),
  //       lng: parseFloat(currentLongitude),
  //     };

  //     const addr =  Geocoder.geocodePosition(NY);

  //     console.log(addr);

  //     setAddress(addr[0].formattedAddress);
  //   }
  // };

  // const getGeocode= ()  => {
  //   axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ parseFloat(currentLatitude) +','+ parseFloat(currentLongitude) +'&key=AIzaSyDl4WjiXse1SS-UWOiLcSrHfxdmwBZgURA') // be sure your api key is correct and has access to the geocode api
  //  .then(response => {
  //    console.log(response.data);
  //     //  this.setState({
  //     //      place: response.data.results[0].formatted_address // access from response.data.results[0].formatted_address
  //     //  })
  //     setAddress( response.data.results[0].formatted_address);
  //   }).catch((error) => { // catch is called after then
  //     // this.setState({ error: error.message })
  //     console.log('Error : ', error.message);
  //   });
  //  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          zoomLevel={18}
          loadingEnabled
          scrollEnabled
          zoomEnabled
          pitchEnabled
          rotateEnabled
          region={{
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <Marker
            coordinate={{
              latitude: parseFloat(currentLatitude),
              longitude: parseFloat(currentLongitude),
            }}
            draggable
            tracksViewChanges={true}
            onDragEnd={e => {
              console.log('dragEnd', e.nativeEvent.coordinate);
            }}
            pinColor="#CD5C5C"
          />
        </MapView>
        <View style={styles.btnView}>
          <Text style={styles.boldText}>{locationStatus}</Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Latitude: {currentLatitude}
          </Text>
          {/* <Text>{addr === undefined ? "" : addr[0].formattedAddress}</Text> */}
          <Text>Device Unique ID: {DeviceInfo.getUniqueId()}</Text>
        </View>
        <View style={{display: 'none'}}>
          <Image
            source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
            }}
            style={{width: 100, height: 100}}
          />
          <Text style={styles.boldText}>{locationStatus}</Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Latitude: {currentLatitude}
          </Text>
          {/* <Text>{address}</Text> */}
          <View style={{marginTop: 20}}>
            <Button title="Button" onPress={getOneTimeLocation} />
          </View>
        </View>
        <View style={{display: 'none'}}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: 'grey',
            }}>
            React Native Geolocation
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: 'grey',
            }}></Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontSize: 20,
    color: 'red',
    fontWeight: '600',
    marginVertical: 10,
  },
  container: {
    flex: 2,
    // backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 1.3,
  },
  btnView: {
    posiotion: 'absolute',
    elevation: 10,
  },
  touchableButton: {
    alignItems: 'center',
    // backgroundColor: '#E0FFFF',
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#00008B',
  },
});

export default App;

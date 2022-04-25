import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  platform,
  image,
  Button,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

let {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 15.2941957;
const LONGITUDE = 73.9690292;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class GeoLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {latitude: 0, longitude: 0, error: null};
  }
  //   state = {  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      posiotion => {
        this.setState({
          latitude: posiotion.coords.latitude,
          longitude: posiotion.coords.longitude,
          error: null,
        });
      },
      error => this.setState({error: error.message}),
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000},
      {showLocationDialog: true, enableHighAccuracy: true},
    );
  }

  handleRegionChange = () => {
    Geolocation.getCurrentPosition(
      posiotion => {
        this.setState({
          latitude: posiotion.coords.latitude,
          longitude: posiotion.coords.longitude,
          error: null,
        });
      },
      error => this.setState({error: error.message}),
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000},
      {showLocationDialog: true, enableHighAccuracy: true},
    );
  };

  render() {
    // console.log('latitude : ', this.state.latitude);
    // console.log('longitude : ', this.state.longitude);
    // console.log(this.props);
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          onRegionChangeComplete={this.handleRegionChange}>
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            draggable
            tracksViewChanges={true}
            onDragEnd={e => {
              console.log('dragEnd', e.nativeEvent.coordinate);
            }}
            onPress={() => console.log('test marker')}
            pinColor="#CD5C5C"
            // title={'title'}
            // image={require('./japaneseFlag.png')}
          />
        </MapView>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.touchableButton}
            onPress={() => {
              this.props.navigation.navigate('Scan', {
                location: this.state,
              });
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#191970'}}>
              Use current location
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 1.1,
  },
  btnView: {
    posiotion: 'absolute',
    elevation: 10,
  },
  touchableButton: {
    alignItems: 'center',
    backgroundColor: '#E0FFFF',
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#00008B',
  },
});

export default GeoLocation;

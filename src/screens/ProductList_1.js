import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

class ProductList_1 extends Component {
  state = {custom_fields: []};

  componentDidMount() {
    for (let index = 0; index < this.props.product.length; index++) {
      this.setState({
        custom_fields: [
          ...this.state.custom_fields,
          {meta_name: 'value', meta_value: 'value'},
        ],
      });
    }
  }

  addCustomField = () => {
    this.setState({
      custom_fields: [
        ...this.state.custom_fields,
        {meta_name: 'value', meta_value: 'value'},
      ],
    });
  };

  onCustomInputNameHandler = (value, index) => {
    this.state.custom_fields[index].meta_name = value;
    this.setState({custom_fields: this.state.custom_fields});
  };

  onCustomInputKeyHandler = (value, index) => {
    this.state.custom_fields[index].meta_value = value;
    this.setState({custom_fields: this.state.custom_fields});
  };

  deleteDynamicField = index => {
    this.state.custom_fields.splice(index, 1);
    this.setState({custom_fields: this.state.custom_fields});
  };

  render() {
    console.log('name : ', this.props.product);
    console.log('custom_fields : ', this.custom_fields);
    return (
      <ScrollView>
        <View style={stylesProduct.container}>
          {this.state.custom_fields.map((customInput, key) => {
            return (
              <View key={key} style={stylesProduct.inputsContainer}>
                <View style={[stylesProduct.inputContainer]}>
                  <TextInput
                    style={stylesProduct.input}
                    value={customInput.key}
                    placeholder={'Name'}
                    onChangeText={name => {
                      this.onCustomInputNameHandler(name, key);
                    }}
                  />
                  {/* <View style={[stylesProduct.inputContainer]}>
                    <Text style={stylesProduct.input}>
                      {this.props.product[0].name === undefined
                        ? ''
                        : this.props.product[0].name}
                    </Text>
                  </View> */}
                </View>
                <View style={[stylesProduct.inputContainer]}>
                  <TextInput
                    style={stylesProduct.input}
                    value={customInput.key}
                    placeholder={'Value'}
                    onChangeText={value => {
                      this.OnCustomInputKeyHandler(value, key);
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => this.deleteDynamicField(key)}
                  style={{width: 50}}>
                  <Text style={[(stylesProduct.addBtnText, {color: 'red'})]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}

          <TouchableOpacity
            style={stylesProduct.addBtn}
            onPress={() => {
              this.addCustomField();
            }}>
            <Text style={stylesProduct.addBtnText}>Add Fields</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const stylesProduct = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  inputsContainer: {flexDirection: 'row', padding: 15},
  inputContainer: {width: '40%', flex: 1, marginRight: 10},
  input: {
    paddingHorizontal: 15,
    width: '100%',
    height: 50,
    fontSize: 16,
    backgroundColor: '#f3f3f3',
  },
  addBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#db0029',
    justifyContent: 'center',
    color: '#fff',
  },

  addBtnText: {fontSize: 16, color: '#fff', textAlign: 'center'},
});

export default ProductList_1;

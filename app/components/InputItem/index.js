import React, { Component } from 'react';
import {
  Form,
  Item,
  Label,
  Input
} from 'native-base';
import { View } from 'react-native';
import styles from './styles';

export default class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onFocus: false
    };
  }
  handleOnFocus = () => {
    this.setState({
      onFocus: true
    });
  }
  handleOnBlur = () => {
    this.setState({
      onFocus: false
    });
  }
  render() {
    return (
      <View>
        <Form>
          <Item floatingLabel error={this.props.error} >
            <Label style={this.state.onFocus ||
              this.props.value.length > 0 ?
              styles.normalOnFocusLabel :
              styles.normalOnBlurLabel
            }
            >
              {this.props.title}
            </Label>
            <Input
              style={this.props.style}
              disabled={this.props.disabled}
              secureTextEntry={this.props.secureTextEntry}
              onChangeText={this.props.onChangeText}
              value={this.props.value}
              onFocus={() => { this.handleOnFocus(); }}
              onBlur={this.props.onBlur}
            />
          </Item>
        </Form>
      </View>
    );
  }
}

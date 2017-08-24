import React, { Component } from 'react';
import {
  Card,
  CardItem,
  Body,
  Right,
  Text,
  Icon,
  Item,
  Input
} from 'native-base';
import { View, TouchableHighlight, Image } from 'react-native';
import moment from 'moment';
import Button from '../Button';

import styles from './styles';

class GrantPointCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      addPoints: ''
    }
  }

  handleToggle = () => {
    const isOpen = !this.state.isOpen;
    this.setState({ isOpen });
  }

  handleChange = (value) => {
    this.setState({ addPoints: value })
  }

  render() {
    const { isOpen } = this.state;
    const { firstName, lastName, username, points, id } = this.props;
    return (
      <Card style={styles.container}>
        <TouchableHighlight onPress={()=> this.handleToggle() }>
          <CardItem>
            <Image
              style={styles.profilePic}
              source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/bc/f0/4e/bcf04eafebdf707b8d900f02e6d8bd70--photo-tag-touch-me.jpg'}}
            />
            <View>
              <Text style={styles.eventTitle}>{firstName} {lastName}</Text>
              <Text style={{ marginLeft: 5 }}>
                <Text style={[styles.smallText]}>{username}</Text>
              </Text>
            </View>
            <Right>
              <Icon name={isOpen ? "ios-arrow-up-outline" : "ios-arrow-down-outline"}/>
            </Right>
          </CardItem>
        </TouchableHighlight>
        { isOpen && (
          <View>
            <CardItem>
              <View style={{ flex: 1 }} >
                <Text style={{ fontWeight: 'bold', marginBottom: 10, marginLeft: 5 }} >
                  Point : {points}
                </Text>
                <View style={{ flex: 1, flexDirection: 'row' }} >
                  <Item regular style={{ flex: 1, height: 40 }} >
                    <Input placeholder='Add Point' keyboardType='numeric' style={{ fontSize: 14 }} value={this.state.addPoints} onChangeText={this.handleChange} />
                  </Item>
                  <Button style={{ height: 40, borderRadius: 0, borderWidth: 0 }} onPress={() => this.props.onClickTransfer(id, this.state.addPoints)} >
                    <Text>Transfer</Text>
                  </Button>
                </View>
              </View>
            </CardItem>
          </View>
        )}
      </Card>
    );
  }
}

export default GrantPointCard;

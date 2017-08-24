import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Icon,
  Button,
  Text
} from 'native-base';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HeaderPoint from '../../components/Header';
import GrantPointList from '../../components/GrantPointList';
import styles from './styles';

import * as actions from './actions';
import * as selectors from './selectors';

const events = [
  {
    title: 'Grand Opening Devsummit',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam vel dolorum, at, laboriosam repudiandae quod aliquid odit aliquam ab eligendi!',
    stage: 'Main Stage',
    time_start: '2017-08-09 10:00:00',
    time_end: '2017-08-09 13:00:00'
  },
  {
    title: 'Launch and ISOMA',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam vel dolorum, at, laboriosam repudiandae quod aliquid odit aliquam ab eligendi!',
    stage: 'Eduplex lt.1',
    time_start: '2017-08-09 13:00:00',
    time_end: '2017-08-09 14:00:00'
  },
  {
    title: 'Talkshow 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam vel dolorum, at, laboriosam repudiandae quod aliquid odit aliquam ab eligendi!',
    stage: 'Main Stage',
    time_start: '2017-08-09 14:00:00',
    time_end: '2017-08-09 16:00:00'
  },
  {
    title: 'Interactive Game 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam vel dolorum, at, laboriosam repudiandae quod aliquid odit aliquam ab eligendi!',
    stage: 'Eduplex lt.3',
    time_start: '2017-08-09 16:00:00',
    time_end: '2017-08-09 17:00:00'
  },
  {
    title: 'Interactive Game 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam vel dolorum, at, laboriosam repudiandae quod aliquid odit aliquam ab eligendi!',
    stage: 'Eduplex lt.3',
    time_start: '2017-08-09 16:00:00',
    time_end: '2017-08-09 17:00:00'
  }
];

class GrantPoint extends Component {
  componentWillMount() {
    this.props.getAttendees()
  }
  render() {
    return (
      <View style={styles.container}>
        <HeaderPoint
          title="Grant Point"
        />
        <Container style={styles.content}>
          <Header searchBar style={styles.searchHeader} androidStatusBarColor="#f39e21">
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search..." />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <Content>
            <View style={styles.cards}>
              { true ? (<GrantPointList events={events} />) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#3a3a3a' }}>- No Grant Point -</Text>
                </View>
              )}
            </View>
          </Content>
        </Container>
      </View>
    );
  }
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  isGettingAttendees: selectors.getIsGettingAttendees(),
  attendeesData: selectors.getAttendees()
});

export default connect(mapStateToProps, actions)(GrantPoint);

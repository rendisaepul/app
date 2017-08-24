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
  Text,
  Spinner
} from 'native-base';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HeaderPoint from '../../components/Header';
import GrantPointList from '../../components/GrantPointList';
import styles from './styles';

import * as actions from './actions';
import * as selectors from './selectors';

class GrantPoint extends Component {
  componentWillMount() {
    this.props.getAttendees()
  }
  onClickTransfer = (id, points) => {
    this.props.transferPoints(id, points)
  }
  render() {
    if (this.props.isGettingAttendees) {
      return <Spinner color='orange' />
    }
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
              { this.props.attendeesData.length > 0 ? (<GrantPointList onClickTransfer={this.onClickTransfer} events={this.props.attendeesData} />) : (
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

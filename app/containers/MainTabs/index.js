import { StyleSheet, View, Text, StatusBar, TouchableWithoutFeedback } from 'react-native';
import React, { Component } from 'react';
import { Tabs, Tab, TabHeading, Container, Icon } from 'native-base';
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Schedule from '../Schedule';
import Speaker from '../Speaker';
import Ticket from '../TicketList';
import Profile from '../Profile';
import GrantPoint from '../GrantPoint';
import { getRoleId } from '../../helpers';

export default class MainTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      roleId: null
    };
  }


  componentWillMount() {
    getRoleId().then((roleId) => {
      this.setState({ roleId });
    });
  }

  handleCurrentTab = (number) => {
    this.setState({ currentTab: number });
  }

  render() {
    const { roleId } = this.state;
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <Tabs onChangeTab={(i, ref) => this.handleCurrentTab(i.i)} tabBarPosition="bottom" initialPage={0}>
            <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}><IconSimpleLine name="calendar" style={[ this.state.currentTab === 0 ? { color: '#f39e21' } : null, { fontSize: 18 } ]} /></TabHeading>}>
              <Schedule />
            </Tab>
            {roleId === 3 ?
              <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}><IconMaterial name="coin" style={[ this.state.currentTab === 1 ? { color: '#f39e21' } : null, { fontSize: 24, marginTop: 2 } ]} /></TabHeading>}>
                <GrantPoint />
              </Tab> :
              <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}><IconSimpleLine name="people" style={[ this.state.currentTab === 1 ? { color: '#f39e21' } : null, { fontSize: 18 } ]} /></TabHeading>}>
                <Speaker />
              </Tab>
            }

            <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}><IconSimpleLine name="wallet" style={[ this.state.currentTab === 2 ? { color: '#f39e21' } : null, { fontSize: 18 } ]} /></TabHeading>}>
              <Ticket />
            </Tab>
            <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}><IconSimpleLine name="user" style={[ this.state.currentTab === 3 ? { color: '#f39e21' } : null, { fontSize: 18 } ]} /></TabHeading>}>
              <Profile />
            </Tab>
          </Tabs>
        </View>
      </Container>
    );
  }
}

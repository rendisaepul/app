import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

import GrantPointCard from '../GrantPointCard';

class GrantPointList extends Component{
  render() {
    const { events } = this.props
    return(
      <ScrollView>
        { events.length > 0 && events.map((event, index)=> (
          <GrantPointCard
            key={index}
            firstName={event.user.first_name}
            lastName={event.user.last_name}
            username={event.user.username}
            points={event.points}
            onClickTransfer={this.props.onClickTransfer}
            id={event.id}
          />
        ))}
      </ScrollView>
    )
  }
}

export default GrantPointList;

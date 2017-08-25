import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { View, AsyncStorage } from 'react-native';
import { Container, Content, Spinner } from 'native-base';

// Redux imports
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

// Style imports
import styles from './styles';

// Containers import
import RegisterMenu from './containers/RegisterMenu';
import RegisterEmail from './containers/RegisterEmail';
import RegisterPhone from './containers/RegisterPhone';
import Login from './containers/Login';
import Schedule from './containers/Schedule';
import Main from './containers/Main';
import ChangePassword from './containers/ChangePassword';
import OrderList from './containers/OrderList';
import TicketList from './containers/TicketList';
import OrderDetail from './containers/OrderDetail';
import MainTabs from './containers/MainTabs';
import SpeakerDetail from './containers/SpeakerDetail';
import NewOrder from './containers/NewOrder';
import AttendeesList from './containers/AttendeesList';
import Splash from './components/Splash';
import Payment from './containers/Payment';
import PaymentDetail from './containers/PaymentDetail';

const RouterWithRedux = connect()(Router);
const BackButtonImg = require('../assets/images/back.png');

/**
*  Apply middlewares
*/
export const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux
          navigationBarStyle={styles.navBar}
          titleStyle={styles.navBarTitle}
          barButtonTextStyle={styles.barButtonTextStyle}
          barButtonIconStyle={styles.barButtonIconStyle}
          leftButtonIconStyle={styles.leftButtonIconStyle}
        >
          <Scene key="root" backButtonImage={BackButtonImg}>
            <Scene key="splash" component={Splash} hideNavBar initial />
            <Scene key="main" component={Main} hideNavBar type="replace" />
            <Scene key="mainTabs" component={MainTabs} hideNavBar />
            <Scene key="registerMenu" component={RegisterMenu} title="Register" />
            <Scene key="registerEmail" component={RegisterEmail} title="Register Email" />
            <Scene key="registerPhone" component={RegisterPhone} title="Register Phone" />
            <Scene key="login" component={Login} title="Login" />
            <Scene key="speakerDetail" component={SpeakerDetail} title="Speaker Detail" />
            <Scene key="changePassword" component={ChangePassword} title="Change Password" />
            <Scene key="ticketList" component={TicketList} title="List Ticket" />
            <Scene key="orderList" component={OrderList} title="Order List" />
            <Scene key="orderDetail" component={OrderDetail} title="Order Detail" />
            <Scene key="schedule" component={Schedule} title="Schedule" />
            <Scene key="newOrder" component={NewOrder} title="Order Tickets" />
            <Scene key="attendeesList" component={AttendeesList} title="Select Attendee"/>
            <Scene key="payment" component={Payment} title="Choose Payment Method"/>
            <Scene key="paymentDetail" component={PaymentDetail} title="Complete Payment Detail"/>
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

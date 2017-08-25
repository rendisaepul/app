import React, { Component } from 'react';
import { Container, Content, Text, Spinner, Item, Input, Header } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Image,
  View,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import AccountKit, {
  LoginButton
} from 'react-native-facebook-account-kit';

import { createTransition, Fade } from 'react-native-transition';

// import redux componens
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import InputItem from '../../components/InputItem';
import Button from '../../components/Button';
import ModalComponent from '../../components/ModalComponent';
import styles from './styles';

import * as actions from './actions';
import * as selectors from './selectors';

const Transition = createTransition(Fade);
const Logo = require('../../../assets/images/wallpaper.jpg');

class Main extends Component {
  state = {
    modalVisible: false
  }

  componentWillMount() {
    this.configureAccountKit();
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      Actions.mainTabs();
      this.props.updateIsLogIn(false);
    }
    if (prevProps.isSubscribed !== this.props.isSubscribed) {
      Alert.alert('Success', 'You have been subscribed, we will send update to your email');
      this.props.updateIsSubscribed(false);
    }
  }


  onLoginMobile(token) {
    if (!token) {
      this.setState({});
    } else {
      AccountKit.getCurrentAccessToken().then((_token) => {
        this.props.loginMobile(_token.token);
      });
    }
  }


  onLogin = () => {
    this.props.login();
  }

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  configureAccountKit = () => {
    AccountKit.configure({
      countryWhitelist: [ 'ID' ],
      defaultCountry: 'ID',
      initialPhoneCountryPrefix: '+62',
      initialPhoneNumber: '87809000750'
    });
  }

  loginFacebook = () => {
    this.props.loginFacebook();
  }

  handleInputChange = (field, value) => {
    this.props.updateFields(field, value);
  }

  subscribeNewsletter = () => {
    Alert.alert('lala');
  }

  render() {
    const { fields, isFetching } = this.props;
    const { username, password, email } = fields || '';
    if (isFetching) {
      return (
        <Transition>
          <Container>
            <Header androidStatusBarColor="#f39e21" style={{display:'none'}}/>
            <View style={styles.spinner}>
              <Spinner color="white" />
            </View>
          </Container>
        </Transition>
      );
    }
    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor="#f39e21" style={{display:'none'}}/>
        <Content>
          <ModalComponent
            visible={this.state.modalVisible}
            modalTitle="Subscriber"
            inputTitle="Email"
            onChangeText={emailText => this.handleInputChange('email', emailText)}
            value={email}
            onSubmit={() => this.props.subscribeNewsletter()}
            onModalPress={() => this.setModalVisible()}
          />
          <View style={styles.headerSection}>
            <Image source={Logo} style={styles.logo} />
          </View>
          <View style={styles.lineSection}>
            <View style={styles.lineTextThree} />
            <Text style={styles.lineTextFour}> log in with social media </Text>
            <View style={styles.lineTextThree} />
          </View>
          <View style={styles.buttonSocialSection}>
            <Button primary style={styles.buttonSocial} onPress={() => { this.loginFacebook(); }}>
              <Icon name="facebook" color="white" style={styles.icon} />
            </Button>
            <Button danger style={styles.buttonSocial} onPress={() => {this.props.loginGoogle()}}>
              <Icon name="google-plus" color="white" style={styles.icon} />
            </Button>
            <Button info style={styles.buttonSocial} onPress={() => {this.props.loginTwitter()}}>
              <Icon name="twitter" color="white" style={styles.icon} />
            </Button>
          </View>
          <View style={styles.lineSection}>
            <View style={styles.lineTextOne} />
            <Text style={styles.lineTextTwo}> or </Text>
            <View style={styles.lineTextOne} />
          </View>
          <View style={styles.formSection}>
            <Item regular style={styles.item}>
              <Input
                placeholder="Username"
                onChangeText={usernameText => this.handleInputChange('username', usernameText)}
                value={username}
              />
            </Item>
            <Item regular>
              <Input
                placeholder="Password"
                secureTextEntry
                onChangeText={passwordText => this.handleInputChange('password', passwordText)}
                value={password}
              />
            </Item>
          </View>
          <View style={styles.buttonSection}>
            {(username === '' || password === '') ?
              <Button disabled block style={[ styles.button, { elevation: 0 } ]}>
                <Text>Log In</Text>
              </Button>
              :
              <Button primary block style={styles.button} onPress={() => { this.onLogin(); }}>
                <Text>Log In</Text>
              </Button>
            }
            <View style={styles.lineSection}>
              <View style={styles.lineTextOne} />
              <Text style={styles.lineTextTwo}> or </Text>
              <View style={styles.lineTextOne} />
            </View>
            <Button style={styles.button}>
              <LoginButton
                style={styles.buttonLoggin}
                type="phone"
                onLogin={token => this.onLoginMobile(token)}
                onError={e => this.onLoginMobile(e)}
                primary
                block
              >
                <Icon name="phone" color="white" style={styles.icon} />
                <Text style={styles.buttonText}>PHONE</Text>
              </LoginButton>
            </Button>
            <Button transparent style={styles.buttonRegister} onPress={() => { Actions.registerMenu() }}>
              <Text style={styles.registerText}>Don't have an account?</Text>
              <Text style={styles.registerTextBold}> Register</Text>
            </Button>
            <Button
              transparent
              style={styles.buttonRegister}
              onPress={() => { this.setModalVisible(); }}
            >
              <Text style={styles.registerText}>Subscribe to Newsletter</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

Main.propTypes = {

  isLoggedIn: PropTypes.bool.isRequired,
  updateIsLogIn: PropTypes.func.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  updateIsSubscribed: PropTypes.func.isRequired,
  loginMobile: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loginFacebook: PropTypes.func.isRequired,
  updateFields: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  subscribeNewsletter: PropTypes.func.isRequired,
  loginGoogle: PropTypes.func.isRequired,
  loginTwitter: PropTypes.func.isRequired
};

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  fields: selectors.getFields(),
  isSubscribed: selectors.getIsSubscribed(),
  isLoggedIn: selectors.getIsLoggedIn(),
  isFetching: selectors.getIsFetching()
});

export default connect(mapStateToProps, actions)(Main);
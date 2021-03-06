import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  monthPicker: {
    width: 100
  },
  yearPicker: {
    width: 100
  },
  container: {
    backgroundColor: '#fff'
  },
  text: {
    flex: 3
  },
  button: {
    marginTop: 15,
    marginBottom: 15,
    flex: 0.4,
    justifyContent: 'center',
    borderRadius: 30,
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  roundButton: {
    borderRadius: 90,
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    marginRight: 10
  },
  textButton: {
    color: 'white',
    alignSelf: 'center'
  },
  center: {
    flex: 2
  },
  right: {
    flex: 1,
    alignSelf: 'flex-end',
  },
  datePicker: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default styles;

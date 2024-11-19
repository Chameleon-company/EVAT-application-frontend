// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  search: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    top: 10,
  },
  safeArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '90%',
    position: 'relative',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    borderRadius: 25,
    padding: 8,
    height: 50,
    backgroundColor: '#fff',
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
  },
  autocompleteContainer: {
    flex: 1,
    width: '100%',
  },
  listView: {
    backgroundColor: '#fff',
    borderRadius: 25,
  },
});

export default styles;

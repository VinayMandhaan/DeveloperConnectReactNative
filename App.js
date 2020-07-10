/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import SignUp from './src/components/SignUp'
import Login from './src/components/Login'
import Routes from './src/routes/Routes'
import setAuthToken from './src/utils/setAuthToken'
import {Provider} from 'react-redux'
import {loadUser} from './src/actions/auth'
import store from './src/store'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
} from 'react-native';

if(AsyncStorage.token){
  setAuthToken(AsyncStorage.token)
}

const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (
      <Provider store={store}>
        <Routes/>
      </Provider>

  );
};


export default App;

import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions  } from 'react-native';
import { NativeRouter, Route, Switch, useHistory } from "react-router-native";
import { useDispatch } from 'react-redux';

// Custom components:
import LoginPageView from './app/components/LoginPageView';
import AuthorisedUserView from './app/components/AuthorisedUserView';
import PrivateRoute from './app/routes/PrivateRoute';

// Custom functions:
import getData from './app/authentication/getData';


const App = () => {
  console.log('App render');

  // Creating dispatch to all updates to redux store:
  const dispatch = useDispatch();

  // Creating history in order to allow react router re-directs:
  const history = useHistory();

  useEffect(() => {
    getData(dispatch, history);
  }, [])
  
  return (
    <NativeRouter>
      <View style = {styles.page} >
        <Switch>
          <Route exact path='/' component={LoginPageView} />
          <PrivateRoute path='/usermap' exact={true} component={AuthorisedUserView} />
        </Switch>
      </View>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default App;
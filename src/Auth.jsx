import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {listenAuthState} from './reducks/users/operations';
import {getIsSignedIn} from './reducks/users/selectors';

const Auth = ({children}) => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState())
    } 
  }, []);

  let id = window.location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id]);


  if (!isSignedIn) {
    return<></>
  } else {
    return children
  }

}

export default Auth;
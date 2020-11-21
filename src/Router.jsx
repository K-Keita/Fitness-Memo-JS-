import React from 'react';
import {Route, Switch} from 'react-router';
import {RegistrationList, WeekLists, Home, EditMenuList, SignUp, SignIn, Reset} from './templates/index';
import Auth from './Auth';


const Router = () => {
  return(
    <Switch>
      <Route exact path={"/reset"} component={Reset} />
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Auth>
        <Route exact path={"(/)?"} component={Home} />
        <Route path={"/regist(/id)?"} component={RegistrationList} />
        <Route exact path={"/list"} component={WeekLists} />
        <Route path={"/edit(/id)?"} component={EditMenuList} />
      </Auth>
    </Switch>
  )
};

export default Router;
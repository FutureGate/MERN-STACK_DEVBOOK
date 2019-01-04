import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashborad from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import Profiles from './components/profiles/Profiles';

import './App.css';
import { decode } from 'punycode';
import { clearCurrentProfile } from './actions/profileActions';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  // 사용자 설정 및 인증여부 설정
  store.dispatch(setCurrentUser(decoded));

  // 토큰이 만료되었는지 검사
  const currentTime = Date.now() / 1000;
  
  if(decode.exp < currentTime) {
     store.dispatch(logoutUser());
     store.dispatch(clearCurrentProfile());
     
    // 현재 프로필 초기화
    
    window.location.href = "/";
  }

}

class App extends Component {
    //토큰 체크
    
    render() {
      return (
        <Provider store={ store }>
          <Router>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={ Landing } />
                <div className="container">
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/login" component={ Login } />
                  <Route exact path="/profiles" component={ Profiles } />

                  <Switch>
                    <PrivateRoute exact path="/dashboard" component={ Dashborad } />
                  </Switch>

                  <Switch>
                    <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
                  </Switch>

                  <Switch>
                    <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
                  </Switch>

                  <Switch>
                    <PrivateRoute exact path="/add-experience" component={ AddExperience } />
                  </Switch>
                </div>
              <Footer />
            </div>
          </Router>
        </Provider>
      );
  }
}

export default App;

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import PrivateRoute from './components/common/PrivateRoute';

import 'moment-timezone';

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
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';

import './App.css';

import { clearCurrentProfile } from './actions/profileActions';



class App extends Component {
    //토큰 체크
    
    render() {
      if (localStorage.getItem("jwtToken")) {

        setAuthToken(localStorage.getItem("jwtToken"));
      
        const decoded = jwt_decode(localStorage.getItem("jwtToken"));
      
        // 사용자 설정 및 인증여부 설정
        store.dispatch(setCurrentUser(decoded));
      
        // 토큰이 만료되었는지 검사
        const currentTime = Date.now() / 1000;

        if(decoded.exp < currentTime) {
           store.dispatch(logoutUser());
           store.dispatch(clearCurrentProfile());
           
          // 현재 프로필 초기화
          window.location.href = "/";
        }
      }

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
                  <Route exact path="/profile/:handle" component={ Profile } />
                  <Route exact path="/profile/id/:id" component={ Profile } />

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

                  <Switch>
                    <PrivateRoute exact path="/posts" component={ Posts } />
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

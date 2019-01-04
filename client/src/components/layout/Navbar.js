import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
        this.props.clearCurrentProfile();
    }

    // eslint-disable-next-line
    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <div>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">대시보드</Link>
                    </li>

                    <li className="nav-item">
                        <a href="/"
                        onClick={this.onLogoutClick.bind(this)}
                        className="nav-link">
                            <img
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: '25px', marginRight: '5px' }}
                            title="아바타를 사용하기 위해서는 Gravatar계정을 연결해야 합니다."/> {' '}

                            로그아웃
                        </a>
                    </li>
                    </ul>
            </div>
        );

        const guestLinks = (
            <div>
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="register">회원가입</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="login">로그인</Link>
                    </li>
                </ul>
            </div>
        );

        return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">DevBook</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="profiles">개발자 목록</Link>
                        </li>
                    </ul>
                
                    { isAuthenticated? authLinks : guestLinks }
                </div>
                </div>
            </nav>
        </div>
    )
  }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
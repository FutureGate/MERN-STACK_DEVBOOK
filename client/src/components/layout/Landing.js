import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
    
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
    return (
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-4 mb-4">개발자를 위한 소셜 네트워크 서비스
                            </h1>
                            <p className="lead">지금 시작하여 다른 개발자와 소통하세요</p>
                            <hr />
                            <Link to="register" className="btn btn-lg btn-info mr-2">시작하기</Link>
                            <Link to="login" className="btn btn-lg btn-light">로그인</Link>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Landing);
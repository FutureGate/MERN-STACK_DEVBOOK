import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner';

import { getProfiles } from '../../actions/profileActions';

class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        const { profiles, loading } = this.props.profile;

        let profileItems;

        if(profiles === null || loading) {
            profileItems = <Spinner />;
        } else {
            if(profiles.length > 0) {
                profileItems = <h1>profiles here</h1>;
            } else { 
                profileItems = <h4>등록된 프로필이 없습니다.</h4>
            }
        }
    
        return (
            <div className="profiles">
                
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">개발자 목록</h1>
                            <p className="lead text-center">
                                프로필을 등록한 개발자들과 소통하세요!
                            </p>
                        </div>
                    </div>
                </div>
                {profileItems}
            </div>
        )
  }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

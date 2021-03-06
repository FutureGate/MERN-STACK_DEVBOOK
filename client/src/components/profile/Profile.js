import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';

import Spinner from '../common/Spinner';

import { getProfileByHandle, getProfileByID } from '../../actions/profileActions';

class Profile extends Component {

    componentDidMount() {
        if(this.props.match.path.includes("id")) {
            this.props.getProfileByID(this.props.match.params.id);
        } else {
            if(this.props.match.params.handle) {
                this.props.getProfileByHandle(this.props.match.params.handle);
            }
        }
    }

    render() {
        const { profile, loading } = this.props.profile;

        let profileContent;

        

        if(profile == null || loading) {
            profileContent = <Spinner />;
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-primary mb-3 float-left">
                                개발자 목록
                            </Link>
                        </div>
                        <div className="col-md-6" />
                    </div>
                    <ProfileHeader profile={ profile } />
                    
                    <ProfileAbout profile={ profile } />

                    <hr className="mb-5" />

                    <ProfileCreds experience={ profile.experience } education={ profile.education } />
                    
                    <hr className="mb-5" />
                    
                    <ProfileGithub profile={ profile } />

                </div>
                
            );
        }

        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
        )
  }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle, getProfileByID })(Profile);

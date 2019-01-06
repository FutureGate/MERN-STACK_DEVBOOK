import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {

    render() {
        const { profile } = this.props;

        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <img className="rounded-circle" src={ profile.user.avatar } alt="" />
                    </div>

                    <div className="col-lg-6 col-md-4 col-6">
                        <h3>{ profile.user.name }</h3>
                        <p>
                            { profile.status }
                            <br/>
                            {isEmpty(profile.company) ? null : (<span>{ profile.company }에서 근무 중</span>)}
                        </p>
                        <p>
                            {isEmpty(profile.location) ? null : (<span>{ profile.location }</span>)}
                        </p>

                        <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                            프로필 보기
                        </Link>
                    </div>
                    
                    <div className="col-md-4 d-none d-md-block">
                        <h4 className="ml-5 lead">사용 언어</h4>
                        <ul className="listgroup">
                            { profile.skills.slice(0, 4).map((skill, index) => (
                                <li key={index} className="list-group-item">
                                    <i className="fa fa-check pr-2" />
                                    { skill }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
    )
  }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;

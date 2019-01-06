import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {

  render() {
    const { profile } = this.props;

    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check pr-3" /> {skill}
      </div>
    ));

    return (
      <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                <h3 className="text-center text-dark">{profile.user.name}님의 소개</h3>
                <p className="lead">
                  {isEmpty(profile.bio) ? <span>{profile.user.name}님의 소개가 없습니다.</span>  : <span>{profile.bio}</span> }
                </p>
                <hr />
                <h3 className="text-center text-dark">사용 언어</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {skills}
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
  }
}

export default ProfileAbout;
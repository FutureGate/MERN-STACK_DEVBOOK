import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

import {Link} from 'react-router-dom';

class ProfileHeader extends Component {
    onSocialLinkClick(link) {
      if(!link.includes("http://")) {
        link = "http://" + link;
      }
      window.open(link, "_blank");
    }

    render() {
      const { profile } = this.props;

      return (
        <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-secondary text-white mb-3">
                <div className="row">
                  <div className="col-4 col-md-3 m-auto">
                    <img className="rounded-circle" src={profile.user.avatar} alt="" />
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="display-4 text-center">{profile.user.name}</h1>
                  <p className="lead text-center">{profile.user.status}</p>
                  <p className="lead text-center">{isEmpty(profile.company) ? null : <span>{profile.company}에서 근무 중</span>}</p>
                  <p className="lead text-center">{isEmpty(profile.location) ? null : <span>{profile.location}</span>}</p>
                  
                  <p>
                    {isEmpty(profile.website) ? null : (
                        <a className="text-white p-2" onClick={this.onSocialLinkClick.bind(this, profile.website)} >
                        <i className="fas fa-globe fa-2x"></i>
                      </a>
                    )}
                    
                    {isEmpty(profile.social && profile.social.twitter) ? null : (
                        <a className="text-white p-2" onClick={this.onSocialLinkClick.bind(this, profile.social.twitter)} target="_blank">
                        <i className="fab fa-twitter fa-2x"></i>
                      </a>
                    )}

                    {isEmpty(profile.social && profile.social.facebook) ? null : (
                        <a className="text-white p-2" onClick={this.onSocialLinkClick.bind(this, profile.social.facebook)} target="_blank">
                        <i className="fab fa-facebook fa-2x"></i>
                      </a>
                    )}

                    {isEmpty(profile.social && profile.social.linkedin) ? null : (
                        <a className="text-white p-2" onClick={this.onSocialLinkClick.bind(this, profile.social.linkedin)} target="_blank">
                        <i className="fab fa-linkedin fa-2x"></i>
                      </a>
                    )}

                    {isEmpty(profile.social && profile.social.youtube) ? null : (
                        <a className="text-white p-2" onClick={this.onSocialLinkClick.bind(this, profile.social.youtube)} target="_blank">
                        <i className="fab fa-youtube fa-2x"></i>
                      </a>
                    )}

                    {isEmpty(profile.social && profile.social.instagram) ? null : (
                        <a className="text-white p-2" onClick={this.onSocialLinkClick.bind(this, profile.social.instagram)} target="_blank">
                        <i className="fab fa-instagram fa-2x"></i>
                      </a>
                    )}

                  </p>
                </div>
              </div>
            </div>
        </div>
      )
  }
}

export default ProfileHeader;
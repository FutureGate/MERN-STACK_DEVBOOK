import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

import Spinner from '../common/Spinner';

import ProfileActions from './ProfileActions';

class Dashboard extends Component {
  constructor() {
    super();
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  
  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if(profile === null || loading) {
      dashboardContent = <h4><Spinner /></h4>
    } else {
      // 로그인된 사용자가 프로필 정보를 가지고 있는지 체크
      if(Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
              <h5 className="display-5 text-muted">안녕하세요. {user.name}님!</h5>
              <hr className="mb-5"></hr>

              <ProfileActions
              profile={this.props.profile}
              />
          </div>
        )
      } else {
        dashboardContent = (
          <div>
            <h5 className="display-5 text-muted">안녕하세요. {user.name}님!</h5>
              <hr className="mb-5"></hr>
            <p className="lead text-muted">설정된 프로필이 없습니다. 프로필을 설정하고 다른 개발자에게 자신을 소개하세요.</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">프로필 만들기</Link>
          </div>
        );
      }
    }

    return (
      // eslint-disable-next-line
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">대시보드</h1>

              {dashboardContent}

              <div style={{ marginBottom: '60px'}} />

              <div className="text-left">
                <button className="btn btn-danger" type="button" data-toggle="modal" data-target="#commentModal">
                계정 삭제
                <i className="fas fa-trash ml-2"></i>
                </button>

                <div className="modal fade" id="commentModal" tabIndex="1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="commentModalLabel">계정 삭제</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div> 

                            <div className="modal-body">
                                <h6 className="display-5">삭제 하시겠습니까? 되돌릴 수 없습니다.</h6>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-dismiss="modal">취소</button>
                                <button className="btn btn-danger" onClick={this.onDeleteClick} data-dismiss="modal" type="submit">삭제</button>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);

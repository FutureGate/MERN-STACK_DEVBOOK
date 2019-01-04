import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSocialButtonClick = this.onSocialButtonClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }

        this.props.createProfile(profileData, this.props.history);
    }

    onSocialButtonClick() {
        this.setState(prevState => ({
            displaySocialInputs: !prevState.displaySocialInputs
        }));
    }

    

    render() {
        const { errors, displaySocialInputs } = this.state;

        let SocialInputs;

        if(displaySocialInputs) {
            SocialInputs = (
                <div>
                    <InputGroup
                        placeholder="트위터"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <InputGroup
                        placeholder="페이스북"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                     
                    <InputGroup
                        placeholder="링크드인"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    
                    <InputGroup
                        placeholder="유튜브"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    
                    <InputGroup
                        placeholder="인스타그램"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                    
                </div>
            )
        }

        const options = [
            { label: '* 직업 선택', value: 0 },
            { label: '웹 프론트엔드 개발자', value: '웹 프론트엔드 개발자' },
            { label: '웹 백엔드 개발자', value: '웹 백엔드 개발자' },
            { label: '게임 클라이언트 개발자', value: '게임 클라이언트 개발자' },
            { label: '게임 서버 개발자', value: '게임 서버 개발자' },
            { label: '어플리케이션 개발자', value: '어플리케이션 개발자' },
            { label: '네트워크 엔지니어', value: '네트워크 엔지니어' },
            { label: 'SI 개발자', value: 'SI 개발자' },
            { label: '프로젝트 매니저', value: '프로젝트 매니저' },
            { label: '프리랜서', value: '프리랜서' },
            { label: '인턴', value: '인턴' },
            { label: '학생', value: '학생' },
            { label: '무직', value: '무직' },
        ]

        return (
        <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
                <a href="/dashboard" className="btn btn-primary">
                    이전
                </a>
                <h1 className="display-4 text-center">프로필 생성</h1>
                <p className="lead text-center">데브북 프로필을 생성합니다.</p>
                <small className="d-block mb-2">* 은 필수 입력항목 입니다.</small>
                
                <hr className="mb-5"></hr>

                <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                    placeholder="프로필 이름"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    error={errors.handle}
                    info="* 프로필 생성 후 /profile/프로필이름 으로 프로필에 접근 할 수 있습니다."
                />
                
                <hr className="mt-5 mb-5"></hr>

                <SelectListGroup
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    options={options}
                    error={errors.status}
                    info="* 현재 직업을 선택해주세요."
                />

                <TextFieldGroup
                    placeholder="회사"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                    info="근무하시는 회사를 입력해주세요."
                />

                <TextFieldGroup
                    placeholder="웹 사이트"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    error={errors.website}
                    info="프로필에 표시할 웹사이트 혹은 회사 홈페이지를 입력해주세요."
                />

                <TextFieldGroup
                    placeholder="위치"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info="현재 거주하고 있는 장소 혹은 회사의 위치를 입력해주세요."
                />

                <hr className="mt-5 mb-5"></hr>

                <TextFieldGroup
                    placeholder="사용 언어"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                    error={errors.skills}
                    info="* 사용하는 언어를 입력해주세요. 예시> HTML,CSS,C++"
                />

                <TextAreaFieldGroup
                    placeholder="소개"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                    error={errors.bio}
                    info="간단한 자기소개를 입력해주세요. (100자 까지 입력가능합니다)"
                />

                <hr className="mt-5 mb-5"></hr>

                <TextFieldGroup
                    placeholder="깃허브 사용자 이름"
                    name="githubusername"
                    value={this.state.githubusername}
                    onChange={this.onChange}
                    error={errors.githubusername}
                    info="깃허브에서 활동하는 이름을 입력해주세요."
                />
                
                <div className="mb-3">
                  <button
                  type="button"
                  className="btn btn-light"
                  onClick={this.onSocialButtonClick}
                  >
                  SNS 추가
                  </button>

                  <span className="ml-3 text-muted">옵션 사항입니다.</span>
                </div>
    
                {SocialInputs}

                <input type="submit" value="프로필 생성" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(CreateProfile);